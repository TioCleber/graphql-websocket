import { users } from '../../server/graphqlServer'
import { Context } from '../../typings/context'

export const getUsers = (__: unknown, _: any, ctx: Context) => {
  return users
}
