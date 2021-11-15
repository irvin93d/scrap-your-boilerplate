import { Company } from './model/Company'
import { Department } from './model/Department'
import { Employee } from './model/Employee'

const ralf: Employee = {
  type: 'employee',
  person: {
    type: 'person',
    name: 'Ralf',
    address: 'Amsterdam',
  },
  salary: {
    type: 'salary',
    value: 8000,
  },
}
const joost: Employee = {
  type: 'employee',
  person: {
    type: 'person',
    name: 'Joost',
    address: 'Amsterdam',
  },
  salary: {
    type: 'salary',
    value: 1000,
  },
}
const marlow: Employee = {
  type: 'employee',
  person: {
    type: 'person',
    name: 'Marlow',
    address: 'Cambridge',
  },
  salary: {
    type: 'salary',
    value: 2000,
  },
}
const blair: Employee = {
  type: 'employee',
  person: {
    type: 'person',
    name: 'Blair',
    address: 'London',
  },
  salary: {
    type: 'salary',
    value: 100000,
  },
}
const bill: Employee = {
  type: 'employee',
  person: {
    type: 'person',
    name: 'Bill Gates',
    address: 'Medina',
  },
  salary: {
    type: 'salary',
    value: 1000000,
  },
}

const boilerscrap: Department = {
  type: 'department',
  name: 'Boilerplate Scraping',
  manager: bill,
  subunits: [],
}

const research: Department = {
  type: 'department',
  name: 'Research',
  manager: ralf,
  subunits: [
    {
      type: 'subunit',
      unit: joost,
    },
    {
      type: 'subunit',
      unit: marlow,
    },
    {
      type: 'subunit',
      unit: boilerscrap,
    },
  ],
}
const strategy: Department = {
  type: 'department',
  name: 'Strategy',
  manager: blair,
  subunits: [],
}

const data: Company = {
  type: 'company',
  departments: [research, strategy],
}

export default data
