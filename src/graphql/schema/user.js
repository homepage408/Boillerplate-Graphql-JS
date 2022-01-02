import { gql } from 'apollo-server'

const typeDefs = gql`

    type Name {
        name: String
        password: String
    }

    type getNameOK {
        data : [Name]
    }

    type Error {
        status: Int
        message: String
    }

    union getNameRes = getNameOK | Error

    type Query {
        getAllUser: getNameRes
    }


`

module.exports = typeDefs