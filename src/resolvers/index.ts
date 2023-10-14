import { getUsers } from './query/getUsers'
import { createUser } from './mutation/createUser'
import { userInRoom } from './subscription/userInRoom'

export const resolvers = {
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
