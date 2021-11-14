import { everything } from '../lib'
import { Department } from '../model/Department'
import { isDepartment } from '../model/Department.validator'
import { Employee } from '../model/Employee'
import { selectEmployees } from './selectEmployees'

interface EmployeeWithDepartment {
  employee: Employee
  department: Department
}
export const selectEmployeesWithDepartment = (data: unknown): EmployeeWithDepartment[] =>
  everything({
    data,
    matcher: isDepartment,
    query: (department) => {
      const subunits = selectEmployeesWithDepartment(department.subunits)
      const employees = selectEmployees(department)
        .map((employee) => ({ employee, department }))
        .filter(({ employee }) => !subunits.find((other) => other.employee === employee))
      return [...employees, ...subunits]
    },

    reducer: (a, b) => [...a, ...b],
    zeroValue: [] as EmployeeWithDepartment[],
  })
