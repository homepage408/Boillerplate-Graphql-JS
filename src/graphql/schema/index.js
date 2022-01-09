const { loadSchemaSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')

const typeDefs = loadSchemaSync(".",{
    loaders:[new GraphQLFileLoader()]
})


export default typeDefs