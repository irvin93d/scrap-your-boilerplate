import { bill } from './bill'
import { selectSubdepartments } from './selectSubdepartments'

export const billSubunits = (data: unknown): number =>
  selectSubdepartments(data)
    .map(bill)
    .reduce((a, b) => a + b, 0)
