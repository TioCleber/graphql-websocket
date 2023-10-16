import { Context } from '../../typings/context'

export const userMessageSubscription = (
  _: unknown,
  __: unknown,
  ctx: Context
) => {
  return ctx.pubsub.asyncIterator(['MESSAGE'])
}
