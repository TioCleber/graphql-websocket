import { ApolloServer, ApolloServerPlugin } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import { IApolloServerConfig } from '../typings/graphqlServer'
import { resolvers } from '../resolvers'
import { buildSchema } from 'type-graphql'
import path from 'path'

export class GraphQLServer {
  schemaConfig() {
    const schema = buildSchema({
      resolvers,
      emitSchemaFile: path.resolve(__dirname, './../graphql', 'schema.gql'),
    })

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
