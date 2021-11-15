import { everything } from '../lib'
import { Department } from '../model/Department'
import { isDepartment } from '../model/Department.validator'

export const selectDepartments = (data: unknown): Department[] =>
  everything({
    data,
    matcher: isDepartment,
    query: (department) => [department, ...selectDepartments(department.subunits)],
    reducer: (a, b) => [...a, ...b],
    zeroValue: [] as Department[],
  })
