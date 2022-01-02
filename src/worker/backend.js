require('events').EventEmitter.prototype._maxListeners = 100

import app from '../config/express'
import { resolvers, schema as typeDefs, models } from '../graphql'
import { ApolloError, ApolloServer, AuthenticationError } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import http from 'http'

app.get('/', function (req, res) {
    res.status(200)
    res.send({ status: 200, message: 'WELCOME' })
})

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: false }
})


async function startServer() {
    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            require('apollo-tracing').plugin()
          ]
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

startServer()

const httpServer = http.createServer(app)

httpServer.listen({ port: process.env.PORT }, async () => {
  console.log('\n\n🚀  Server ready at http://localhost:' + process.env.PORT)
  console.log('🚀  GraphQL ready at http://localhost:' + process.env.PORT + '/graphql')
})
