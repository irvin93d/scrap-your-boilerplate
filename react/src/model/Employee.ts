import { Person } from './Person'
import { Salary } from './Salary'

// ajv-generate: Employee
export interface Employee {
  type: 'employee'
  person: Person
  salary: Salary
}
