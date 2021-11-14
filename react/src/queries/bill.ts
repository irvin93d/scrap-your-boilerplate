import { everything } from '../lib'
import { isSalary } from '../model/Salary.validator'

export const bill = (data: unknown): number =>
  everything({
    data,
    matcher: isSalary,
    query: ({ value }) => value,
    reducer: (a, b) => a + b,
    zeroValue: 0,
  })
