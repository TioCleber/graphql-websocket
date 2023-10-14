import { Context } from '../../typings/context'

export const userInRoom = (_: unknown, __: unknown, ctx: Context) => {
  return ctx.pubsub.asyncIterator(['USER_IN_ROOM'])
}
