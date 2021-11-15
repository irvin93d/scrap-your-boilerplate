import { everywhere } from '../lib'
import { Company } from '../model/Company'
import { isSalary } from '../model/Salary.validator'

export const increase =
  (k: number) =>
  (company: Company): Company =>
    everywhere({
      data: company,
      matcher: isSalary,
      transformer: (salary) => ({
        ...salary,
        value: Math.floor(salary.value * (k + 1)),
      }),
    })
