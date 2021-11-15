import { Manager } from './Manager'
import { Name } from './Name'
import { SubUnit } from './SubUnit'

// ajv-generate: Department
export interface Department {
  type: 'department'
  name: Name
  manager: Manager
  subunits: SubUnit[]
}
