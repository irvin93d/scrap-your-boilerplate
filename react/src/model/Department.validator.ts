/* tslint:disable */
// generated by typescript-json-validator
import Ajv from 'ajv'
import { inspect } from 'util'

import { Department } from './Department'
export const ajv = new Ajv({
  allErrors: true,
  coerceTypes: false,
  format: 'fast',
  nullable: true,
  unicode: true,
  uniqueItems: true,
  useDefaults: true,
})

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))

export const DepartmentSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  defaultProperties: [],
  definitions: {
    Department: {
      defaultProperties: [],
      properties: {
        manager: {
          $ref: '#/definitions/Employee',
        },
        name: {
          type: 'string',
        },
        subunits: {
          items: {
            $ref: '#/definitions/SubUnit',
          },
          type: 'array',
        },
        type: {
          enum: ['department'],
          type: 'string',
        },
      },
      required: ['manager', 'name', 'subunits', 'type'],
      type: 'object',
    },
    Employee: {
      defaultProperties: [],
      properties: {
        person: {
          $ref: '#/definitions/Person',
        },
        salary: {
          $ref: '#/definitions/Salary',
        },
        type: {
          enum: ['employee'],
          type: 'string',
        },
      },
      required: ['person', 'salary', 'type'],
      type: 'object',
    },
    Person: {
      defaultProperties: [],
      properties: {
        address: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        type: {
          enum: ['person'],
          type: 'string',
        },
      },
      required: ['address', 'name', 'type'],
      type: 'object',
    },
    Salary: {
      defaultProperties: [],
      properties: {
        type: {
          enum: ['salary'],
          type: 'string',
        },
        value: {
          type: 'number',
        },
      },
      required: ['type', 'value'],
      type: 'object',
    },
    SubUnit: {
      defaultProperties: [],
      properties: {
        type: {
          enum: ['subunit'],
          type: 'string',
        },
        unit: {
          anyOf: [
            {
              $ref: '#/definitions/Employee',
            },
            {
              $ref: '#/definitions/Department',
            },
          ],
        },
      },
      required: ['type', 'unit'],
      type: 'object',
    },
  },
  properties: {
    manager: {
      $ref: '#/definitions/Employee',
    },
    name: {
      type: 'string',
    },
    subunits: {
      items: {
        $ref: '#/definitions/SubUnit',
      },
      type: 'array',
    },
    type: {
      enum: ['department'],
      type: 'string',
    },
  },
  required: ['manager', 'name', 'subunits', 'type'],
  type: 'object',
}
export type ValidateFunction<T> = ((data: unknown) => data is T) &
  Pick<Ajv.ValidateFunction, 'errors'>
export const isDepartment = ajv.compile(DepartmentSchema) as ValidateFunction<Department>
export function validateDepartment(value: unknown): Department {
  if (isDepartment(value)) {
    return value
  } else {
    throw new Error(
      ajv.errorsText(
        isDepartment.errors!.filter((e: any) => e.keyword !== 'if'),
        { dataVar: 'Department' },
      ) +
        '\n\n' +
        inspect(value),
    )
  }
}
