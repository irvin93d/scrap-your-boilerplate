import { everything } from '../lib'
import { Employee } from '../model/Employee'
import { isEmployee } from '../model/Employee.validator'

export const selectEmployees = (data: unknown): Employee[] =>
  everything({
    data,
    matcher: isEmployee,
    query: (value) => [value],
    reducer: (a, b) => [...a, ...b],
    zeroValue: [] as Employee[],
  })
