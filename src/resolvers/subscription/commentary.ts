import { Context } from '../../typings/context'

export const commentary = (_: unknown, __: unknown, ctx: Context) => {
  return ctx.pubsub.asyncIterator(['COMMENTARY'])
}
