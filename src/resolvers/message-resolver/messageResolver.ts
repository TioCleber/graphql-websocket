import {
  Arg,
  Field,
  InputType,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql'
import { Message } from '../../models/Message'
import { messages } from '../../app'
import { randomUUID } from 'crypto'

@InputType()
export class MessageInput {
  @Field((type) => String)
  userName: string

  @Field((type) => String)
  message: string
}

@Resolver(() => Message)
class MessageResolver {
  @Query((_returns) => [Message])
  getMessages() {
    return messages
  }

  @Mutation((_returns) => Message)
  async userMessage(
    @Arg('message') args: MessageInput,
    @PubSub() pubsub: PubSubEngine
  ) {
    const message = {
      id: randomUUID(),
      userName: args.userName,
      message: args.message,
    }

    messages.push(message)

    await pubsub.publish('MESSAGE', { message })

    return message
  }

  @Subscription({
    topics: 'MESSAGE',
  })
  usersMessages(@Root() message: { message: Message }): Message {
    return { ...message.message }
  }
}

export default MessageResolver
