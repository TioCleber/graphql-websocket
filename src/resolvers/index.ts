import MessageResolver from './message-resolver/messageResolver'

import { NonEmptyArray } from 'type-graphql'

export const resolvers: NonEmptyArray<Function> = [MessageResolver]
