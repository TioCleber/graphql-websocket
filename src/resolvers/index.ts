import { userMessage } from './mutation/userMessage'
import { userMessageSubscription } from './subscription/userMessageSubscription'
import { getMessages } from './query/getMessages'

export const resolvers = {
  Query: {
    getMessages,
  },
  Mutation: {
    userMessage,
  },
  Subscription: {
    userMessageSubscription: {
      subscribe: userMessageSubscription,
    },
  },
}
