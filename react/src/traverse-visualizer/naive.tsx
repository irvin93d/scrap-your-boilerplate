import { useEffect, useState } from 'react'

import { Colorize } from './colorize'

export const NaiveTraverse = () => {
  const separation = 1000

  const delay = (i: number) => i * separation

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const colors = mounted
    ? {
        skip: '#dc3545',
        search: '#ffc107',
        found: '#28a745',
      }
    : {
        skip: 'inherit',
        search: 'inherit',
        found: 'inherit',
      }

  return (
    <pre style={{ color: 'grey' }}>
      <code>
        <Colorize color={colors.found} delay={delay(1)}>
          {'{'}
        </Colorize>
        {`
  "type": "company",
  `}
        <Colorize color={colors.found} delay={delay(2)}>
          "departments": [
        </Colorize>
        {`
    `}
        <Colorize color={colors.found} delay={delay(3)}>
          {'{'}
        </Colorize>
        {`
      "type": "department",
      "name": "Research",
      `}
        <Colorize color={colors.found} delay={delay(4)}>
          {'"manager": {'}
        </Colorize>
        {`
        "type": "employee",
        "person": {
          "type": "person",
          "name": "Ralf",
          "address": "Amsterdam"
        },
        `}
        <Colorize color={colors.found} delay={delay(5)}>
          {'"salary": {'}
        </Colorize>
        {`
          "type": "salary",
          `}
        <Colorize color={colors.found} delay={delay(6)}>
          {'"value": 8000'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.found} delay={delay(5)}>
          {'}'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.found} delay={delay(4)}>
          {'},'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.found} delay={delay(7)}>
          {'"subunits": ['}
        </Colorize>
        {`
        `}
        <Colorize color={colors.found} delay={delay(8)}>
          {'{'}
        </Colorize>
        {`
          "type": "subunit",
          `}
        <Colorize color={colors.found} delay={delay(9)}>
          {'"unit": {'}
        </Colorize>
        {`
            "type": "employee",
            "person": {
              "type": "person",
              "name": "Joost",
              "address": "Amsterdam"
            },
            `}
        <Colorize color={colors.found} delay={delay(10)}>
          {'"salary": {'}
        </Colorize>
        {`
              "type": "salary",
              `}
        <Colorize color={colors.found} delay={delay(11)}>
          {'"value": 1000'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.found} delay={delay(10)}>
          {'}'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.found} delay={delay(9)}>
          {'}'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.found} delay={delay(8)}>
          {'},'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.found} delay={delay(12)}>
          {'{'}
        </Colorize>
        {`
          "type": "subunit",
          `}
        <Colorize color={colors.found} delay={delay(13)}>
          {'"unit": {'}
        </Colorize>
        {`
            "type": "employee",
            "person": {
              "type": "person",
              "name": "Marlow",
              "address": "Cambridge"
            },
            `}
        <Colorize color={colors.found} delay={delay(14)}>
          {'"salary": {'}
        </Colorize>
        {`
              "type": "salary",
              `}
        <Colorize color={colors.found} delay={delay(15)}>
          {'"value": 2000'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.found} delay={delay(14)}>
          {'}'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.found} delay={delay(13)}>
          {'}'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.found} delay={delay(12)}>
          {'},'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.found} delay={delay(15)}>
          {'{'}
        </Colorize>
        {`
          "type": "subunit",
          `}
        <Colorize color={colors.found} delay={delay(16)}>
          {'"unit": {'}
        </Colorize>
        {`
            "type": "department",
            "name": "Boilerplate Scraping",
            `}
        <Colorize color={colors.found} delay={delay(17)}>
          {'"manager": {'}
        </Colorize>
        {`
              "type": "employee",
              "person": {
                "type": "person",
                "name": "Bill Gates",
                "address": "Medina"
              },
              `}
        <Colorize color={colors.found} delay={delay(18)}>
          {'"salary": {'}
        </Colorize>
        {`
                "type": "salary",
                `}
        <Colorize color={colors.found} delay={delay(19)}>
          {'"value": 1000000'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.found} delay={delay(18)}>
          {'}'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.found} delay={delay(17)}>
          {'},'}
        </Colorize>
        {`
            "subunits": []
          `}
        <Colorize color={colors.found} delay={delay(16)}>
          {'}'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.found} delay={delay(15)}>
          {'}'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.found} delay={delay(7)}>
          ]
        </Colorize>
        {`
    `}
        <Colorize color={colors.found} delay={delay(3)}>
          {'},'}
        </Colorize>
        {`
    `}
        <Colorize color={colors.found} delay={delay(20)}>
          {'{'}
        </Colorize>
        {`
      "type": "department",
      "name": "Strategy",
      `}
        <Colorize color={colors.found} delay={delay(21)}>
          {'"manager": {'}
        </Colorize>
        {`
        "type": "employee",
        "person": {
          "type": "person",
          "name": "Blair",
          "address": "London"
        },
        `}
        <Colorize color={colors.found} delay={delay(22)}>
          {'"salary": {'}
        </Colorize>
        {`
          "type": "salary",
          `}
        <Colorize color={colors.found} delay={delay(23)}>
          {'"value": 100000'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.found} delay={delay(22)}>
          {'}'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.found} delay={delay(21)}>
          {'},'}
        </Colorize>
        {`
      "subunits": []
    `}
        <Colorize color={colors.found} delay={delay(20)}>
          {'}'}
        </Colorize>
        {`
  `}
        <Colorize color={colors.found} delay={delay(2)}>
          ]
        </Colorize>
        {`
`}
        <Colorize color={colors.found} delay={delay(1)}>
          {'}'}
        </Colorize>
      </code>
    </pre>
  )
}
