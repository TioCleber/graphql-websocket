import { Message } from '../../models/Message'
import { messages } from '../../app'

export const getMessages = (): Message[] => {
  return messages
}
