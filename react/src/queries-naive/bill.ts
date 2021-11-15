import { Company } from '../model/Company'
import { Department } from '../model/Department'
import { Employee } from '../model/Employee'
import { Salary } from '../model/Salary'

export const bill = ({ departments }: Company): number =>
  departments.map(billDepartment).reduce((a, b) => a + b, 0)

const billDepartment = ({ manager, subunits }: Department): number =>
  billEmployee(manager) +
  subunits
    .map(({ unit }) => {
      switch (unit.type) {
        case 'employee':
          return billEmployee(unit)
        case 'department':
          return billDepartment(unit)
        default:
          switchFallback(unit)
          return 0
      }
    })
    .reduce((a, b) => a + b, 0)

const billEmployee = ({ salary }: Employee): number => billSalary(salary)

const billSalary = ({ value }: Salary): number => value

const switchFallback = (fallback: never) => fallback
