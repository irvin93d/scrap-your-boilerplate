import { Department } from './Department'
import { Employee } from './Employee'

// ajv-generate: SubUnit
export interface SubUnit {
  type: 'subunit'
  unit: Employee | Department
}
