import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Message {
  @Field((_type) => ID)
  id: string

  @Field((_type) => String)
  userName: string

  @Field((_type) => String)
  message: string
}
