import { Address } from './Address'
import { Name } from './Name'

// ajv-generate: Person
export interface Person {
  type: 'person'
  name: Name
  address: Address
}
