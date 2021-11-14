import { everything } from '../lib'
import { Department } from '../model/Department'
import { isSubUnit } from '../model/SubUnit.validator'
import { selectDepartments } from './selectDepartments'

export const selectSubdepartments = (data: unknown): Department[] =>
  everything({
    data,
    matcher: isSubUnit,
    query: (subunits) => selectDepartments(subunits),
    reducer: (a, b) => [...a, ...b],
    zeroValue: [] as Department[],
  })
