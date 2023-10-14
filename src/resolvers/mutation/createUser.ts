import { randomUUID } from 'crypto'
import { Context } from '../../typings/context'
import { User } from '../../typings/user'
import { users } from '../../server/graphqlServer'

export const createUser = (_: unknown, args: User, ctx: Context) => {
  const id = randomUUID()

  const user = {
    id,
    name: args.name,
  }

  users.push(user)

  ctx.pubsub.publish('USER_IN_ROOM', { user })

  return user
}
