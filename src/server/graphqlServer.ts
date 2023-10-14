import { ApolloServer, ApolloServerPlugin } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { randomUUID } from 'crypto'
import { typeDefs } from './../config/typeDefs'

import { Context } from '../typings/context'
import { IApolloServerConfig } from '../typings/graphqlServer'
import { User } from '../typings/user'
import { createUser } from '../resolvers/mutation/createUser'
import { getUsers } from '../resolvers/query/getUsers'
import { userInRoom } from '../resolvers/subscription/userInRoom'

export const users: User[] = []

export class GraphQLServer {
  schemaConfig() {
    const resolvers = this.resolversConfig()

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    return schema
  }

  private resolversConfig() {
    const resolvers = {
      Query: {
        getUsers,
      },
      Mutation: {
        createUser,
      },
      Subscription: {
        user: {
          subscribe: userInRoom,
        },
      },
    }

    return resolvers
  }

  apolloServerConfig({
    schema,
    serverCleanup,
    httpServer,
  }: IApolloServerConfig) {
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

    return server
  }
}
