import { ApolloServer, ApolloServerPlugin } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './../config/typeDefs'

import { IApolloServerConfig } from '../typings/graphqlServer'
import { resolvers } from '../resolvers'

export class GraphQLServer {
  schemaConfig() {
    const schema = makeExecutableSchema({ typeDefs, resolvers })

    return schema
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
