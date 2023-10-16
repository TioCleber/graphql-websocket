import { randomUUID } from 'crypto'
import { Message } from '../../models/Message'
import { Context } from '../../typings/context'
import { messages } from '../../app'

interface MessageInput {
  message: string
  userName: string
}

export const userMessage = (_: unknown, args: MessageInput, ctx: Context) => {
  const message: Message = {
    id: randomUUID(),
    message: args.message,
    userName: args.userName,
  }

  messages.push(message)

  ctx.pubsub.publish('MESSAGE', {
    userMessageSubscription: {
      ...message,
    },
  })

  return message
}
