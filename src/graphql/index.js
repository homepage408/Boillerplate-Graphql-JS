import schema from './schema'
import  resolvers  from './resolver'
import { models } from './models'
delete resolvers.default;

export {
  schema,
  resolvers,
  models
}