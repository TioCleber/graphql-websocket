import { PubSub } from 'graphql-subscriptions'
import { Context } from '../typings/context'

export class ContextServer {
  contextConfig() {
    const pubsub = new PubSub()

    const context: Context = {}

    return context
  }
}
