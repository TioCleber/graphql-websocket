import { GraphQLSchema } from 'graphql'
import { Server } from 'http'
import { Disposable } from 'graphql-ws/lib/common'

export interface IApolloServerConfig {
  schema: GraphQLSchema
  serverCleanup: Disposable
  httpServer: Server
}
