import { getUsers } from './query/getUsers'
import { createUser } from './mutation/createUser'
import { userInRoom } from './subscription/userInRoom'
import { chat } from './mutation/chat'
import { commentary } from './subscription/commentary'

export const resolvers = {
  Query: {
    getUsers,
  },
  Mutation: {
    createUser,
    chat,
  },
  Subscription: {
    user: {
      subscribe: userInRoom,
    },
    commentary: {
      subscribe: commentary,
    },
  },
}
