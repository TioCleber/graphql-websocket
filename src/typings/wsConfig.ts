import { GraphQLSchema } from 'graphql'
import { Context } from './context'
import { WebSocketServer } from 'ws'

export interface UseServerConfig {
  schema: GraphQLSchema
  context: Context
  wsServerConfig: WebSocketServer
}
