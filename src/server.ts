import { ApolloServer, ApolloServerPlugin, BaseContext } from '@apollo/server'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'

import { createServer } from 'http'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginDrainHttpServerOptions,
} from '@apollo/server/plugin/drainHttpServer'
import { WebSocketServer } from 'ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { useServer } from 'graphql-ws/lib/use/ws'
import { PubSub } from 'graphql-subscriptions'

import { typeDefs } from './config/typeDefs'
import { randomUUID } from 'crypto'

interface Context extends BaseContext {
  pubsub: PubSub
  teste: string
}

type User = {
  id: string
  name: string
}

const main = async () => {
  const users: User[] = []

  const app = express()
  const httpServer = createServer(app)
  const pubsub = new PubSub()

  const resolvers = {
    Query: {
      users: (__: unknown, _: any, ctx: Context) => {
        return users
      },
    },
    Mutation: {
      createUser: (_: unknown, args: User, ctx: Context) => {
        const id = randomUUID()

        users.push({
          id,
          name: args.name,
        })

        ctx.pubsub.publish('USER_IN_ROOM', { user: { id, name: args.name } })

        return { id, name: args.name }
      },
    },
    Subscription: {
      user: {
        subscribe: (_: unknown, __: unknown, ctx: Context) =>
          ctx.pubsub.asyncIterator(['USER_IN_ROOM']),
      },
    },
  }

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  const serverCleanup = useServer(
    {
      schema,
      context: async () => {
        return { pubsub }
      },
    },
    wsServer
  )

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serveWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      } as ApolloServerPlugin,
    ],
  })

  await server.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => {
        return { pubsub }
      },
    })
  )

  httpServer.listen(3333, () =>
    console.log('Server running at http://localhost:3333/graphql')
  )
}

main()
