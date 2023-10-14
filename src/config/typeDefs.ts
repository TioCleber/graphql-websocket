import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const typeDefs = readFileSync(
  join(__dirname, './../graphql/schema.graphql'),
  'utf8'
)
