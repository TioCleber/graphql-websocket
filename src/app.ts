import express, { Express } from 'express'
import { createServer, Server } from 'http'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import bodyParser from 'body-parser'

import { ContextServer } from './context/contextServer'
import { GraphQLServer } from './server/graphqlServer'
import { WsSever } from './server/wsServer'

import { IExpressMiddlewares } from './typings/app'
import { User } from './typings/user'

export const users: User[] = []

class App {
  private app: Express
  private httpServer: Server
  private path = '/graphql'
  private port = 3333

  constructor() {
    this.app = express()
    this.httpServer = createServer(this.app)

    this.start(this.httpServer, this.path)
  }

  start(httpServer: Server, path: string) {
    const contextServer = new ContextServer()
    const graphqlServer = new GraphQLServer()
    const wsServer = new WsSever()

    const schema = graphqlServer.schemaConfig()
    const context = contextServer.contextConfig()

    const wsServerConfig = wsServer.wsServerConfig(httpServer, path)
    const serverCleanup = wsServer.useServerConfig({
      context,
      schema,
      wsServerConfig,
    })

    const server = graphqlServer.apolloServerConfig({
      httpServer,
      schema,
      serverCleanup,
    })

    this.expressMiddlewaresConfig({
      context,
      path,
      server,
    })
  }

  async expressMiddlewaresConfig({
    server,
    context,
    path,
  }: IExpressMiddlewares) {
    await server.start()

    this.app.use(
      path,
      cors<cors.CorsRequest>(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async () => {
          return context
        },
      })
    )
  }

  listen() {
    this.httpServer.listen(this.port, () =>
      console.log(`Server running at http://localhost:${this.port}${this.path}`)
    )
  }
}

export default new App()
