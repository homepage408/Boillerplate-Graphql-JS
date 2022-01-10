require('events').EventEmitter.prototype._maxListeners = 100

import app from '../config/express'
import { resolvers, schema as typeDefs, models } from '../graphql'
import { ApolloError, ApolloServer, AuthenticationError } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { v4 as uuidv4 } from 'uuid'
import { ExpressPeerServer } from 'peer'
import express from 'express'
import path from 'path'
import jwt from 'jsonwebtoken'
import http from 'http'

app.use(express.static("public"));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// app.get('/', function (req, res) {
//     res.status(200)
//     res.send({ status: 200, message: 'WELCOME' })
// })

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room', function (req, res) {
    // NEW CODE
    res.render('room', { roomId: req.params.room });
})


const authenticatedUser = (token) => {
    try {
        const userSession = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return [userSession, null]
    } catch (error) {
        return [null, { message: 'Your session expired, please sign in again' }]
    }
}


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: false }
})


async function startServer() {
    const apolloServer = new ApolloServer({
        schema,
        context: async ({ req, connection }) => {
            if (connection) return connection.context
            const token = req.headers.authorization
            const context = { models, token, userSession: null, user: null }

            if (token) {
                const [userSession, authError] = authenticatedUser(token);
                if (authError) throw new AuthenticationError(authError.message)

                const user = await models.Users.findOne({ where: { id: userSession.id } })
                if (!user) throw new ApolloError("User not found !!!")

                context.user = user
                context.userSession = userSession
            }

            return context
        },
        formatError(err) {
            if (["INTERNAL_SERVER_ERROR", "UNAUTHENTICATED"].includes(err.extensions.code)) {
                console.error(err.message);
            }

            return err;
        }
    });


    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

startServer()

const httpServer = http.createServer(app)


const peerServer = ExpressPeerServer(httpServer, {
    debug: true
})

app.use("/peerjs", peerServer)
const io = require('socket.io')(httpServer)

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit("user-connected", userId)
    })
})


httpServer.listen({ port: process.env.PORT }, async () => {
    console.log('\n\n🚀  Server ready at http://localhost:' + process.env.PORT)
    console.log('🚀  GraphQL ready at http://localhost:' + process.env.PORT + '/graphql')
})
