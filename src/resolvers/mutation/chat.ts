import { randomUUID } from 'crypto'
import { Context } from '../../typings/context'

export type Chat = {
  message: string
  userName: string
}

export const chat = (_: unknown, args: any, ctx: Context) => {
  const commentary = {
    id: randomUUID(),
    message: args.message,
    userName: args.userName,
  }

  ctx.pubsub.publish('COMMENTARY', { commentary })

  return commentary
}
