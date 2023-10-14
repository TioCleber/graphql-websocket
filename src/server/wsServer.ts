import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'

import { Server } from 'http'
import { UseServerConfig } from '../typings/wsConfig'

export class WsSever {
  wsServerConfig(server: Server, path: string) {
    const wsServer = new WebSocketServer({ server, path })

    return wsServer
  }

  useServerConfig({ context, schema, wsServerConfig }: UseServerConfig) {
    const serverCleanup = useServer(
      {
        schema,
        context: async () => {
          return context
        },
      },
      wsServerConfig
    )

    return serverCleanup
  }
}
