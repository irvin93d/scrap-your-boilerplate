import { Department } from './Department'

// ajv-generate: Company
export interface Company {
  type: 'company'
  departments: Department[]
}
