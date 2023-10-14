import { ApolloServer } from '@apollo/server'
import { Context } from './context'

export interface IExpressMiddlewares {
  server: ApolloServer
  path: string
  context: Context
}
