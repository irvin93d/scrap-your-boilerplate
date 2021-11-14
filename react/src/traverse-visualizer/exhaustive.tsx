import { useEffect, useState } from 'react'

import { Colorize } from './colorize'

export const ExhaustiveTraverse = () => {
  const separation = 1000

  const delay = (i: number) => {
    return i * separation
  }

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
        <Colorize color={colors.search} delay={delay(1)}>
          {'{'}
        </Colorize>
        {`
  `}
        <Colorize color={colors.skip} delay={delay(2)}>
          {'"type": "company",'}
        </Colorize>
        {`
  `}
        <Colorize color={colors.search} delay={delay(3)}>
          {'"departments": ['}
        </Colorize>
        {`
    `}
        <Colorize color={colors.search} delay={delay(4)}>
          {'{'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.skip} delay={delay(5)}>
          {'"type": "department",'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.skip} delay={delay(6)}>
          {'"name": "Research",'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.search} delay={delay(7)}>
          {'"manager": {'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.skip} delay={delay(8)}>
          {'"type": "employee",'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(9)}>
          {'"person": {'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.skip} delay={delay(10)}>
          {'"type": "person",'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.skip} delay={delay(11)}>
          {'"name": "Ralf",'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.skip} delay={delay(12)}>
          {'"address": "Amsterdam"'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(9)}>
          {'},'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.found} delay={delay(13)}>
          {`"salary": {
          "type": "salary",
          "value": 8000
        }`}
        </Colorize>
        {`
      `}
        <Colorize color={colors.search} delay={delay(7)}>
          {'},'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.search} delay={delay(14)}>
          {'"subunits": ['}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(14)}>
          {'{'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.skip} delay={delay(15)}>
          {'"type": "subunit",'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.search} delay={delay(16)}>
          {'"unit": {'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.skip} delay={delay(17)}>
          {'"type": "employee",'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.search} delay={delay(18)}>
          {'"person": {'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.skip} delay={delay(19)}>
          {'"type": "person",'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.skip} delay={delay(20)}>
          {'"name": "Joost",'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.skip} delay={delay(21)}>
          {'"address": "Amsterdam"'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.search} delay={delay(18)}>
          {'},'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.found} delay={delay(22)}>
          {`"salary": {
              "type": "salary",
              "value": 1000
            }`}
        </Colorize>
        {`
          `}
        <Colorize color={colors.search} delay={delay(16)}>
          {'}'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(14)}>
          {'},'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(23)}>
          {'{'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.skip} delay={delay(24)}>
          {'"type": "subunit",'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.search} delay={delay(25)}>
          {'"unit": {'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.skip} delay={delay(26)}>
          {'"type": "employee",'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.search} delay={delay(27)}>
          {'"person": {'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.skip} delay={delay(28)}>
          {'"type": "person",'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.skip} delay={delay(29)}>
          {'"name": "Marlow",'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.skip} delay={delay(30)}>
          {'"address": "Cambridge"'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.search} delay={delay(27)}>
          {'},'}
        </Colorize>
        <Colorize color={colors.found} delay={delay(31)}>
          {`
            "salary": {
              "type": "salary",
              "value": 2000
            }
          `}
        </Colorize>
        <Colorize color={colors.search} delay={delay(25)}>
          {'}'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(23)}>
          {'},'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(32)}>
          {'{'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.skip} delay={delay(33)}>
          {'"type": "subunit",'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.search} delay={delay(34)}>
          {'"unit": {'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.skip} delay={delay(35)}>
          {'"type": "department",'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.skip} delay={delay(36)}>
          {'"name": "Boilerplate Scraping",'}
        </Colorize>
        {`
            `}
        <Colorize color={colors.search} delay={delay(37)}>
          {'"manager": {'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.skip} delay={delay(38)}>
          {'"type": "employee",'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.search} delay={delay(39)}>
          {'"person": {'}
        </Colorize>
        {`
                `}
        <Colorize color={colors.skip} delay={delay(40)}>
          {'"type": "person",'}
        </Colorize>
        {`
                `}
        <Colorize color={colors.skip} delay={delay(41)}>
          {'"name": "Bill Gates",'}
        </Colorize>
        {`
                `}
        <Colorize color={colors.skip} delay={delay(42)}>
          {'"address": "Medina"'}
        </Colorize>
        {`
              `}
        <Colorize color={colors.search} delay={delay(39)}>
          {'},'}
        </Colorize>
        <Colorize color={colors.found} delay={delay(43)}>
          {`
              "salary": {
                "type": "salary",
                "value": 1000000
              }
            `}
        </Colorize>
        <Colorize color={colors.search} delay={delay(37)}>
          {'},'}
        </Colorize>
        <Colorize color={colors.search} delay={delay(44)}>
          {`
            "subunits": []
          `}
        </Colorize>
        <Colorize color={colors.search} delay={delay(34)}>
          {'}'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(32)}>
          {'}'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.search} delay={delay(14)}>
          {']'}
        </Colorize>
        {`
    `}
        <Colorize color={colors.search} delay={delay(4)}>
          {'},'}
        </Colorize>
        {`
    `}
        <Colorize color={colors.search} delay={delay(45)}>
          {'{'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.skip} delay={delay(45)}>
          {'"type": "department",'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.skip} delay={delay(46)}>
          {'"name": "Strategy",'}
        </Colorize>
        {`
      `}
        <Colorize color={colors.search} delay={delay(47)}>
          {'"manager": {'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.skip} delay={delay(48)}>
          {'"type": "employee",'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(49)}>
          {'"person": {'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.skip} delay={delay(50)}>
          {'"type": "person",'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.skip} delay={delay(51)}>
          {'"name": "Blair",'}
        </Colorize>
        {`
          `}
        <Colorize color={colors.skip} delay={delay(52)}>
          {'"address": "London"'}
        </Colorize>
        {`
        `}
        <Colorize color={colors.search} delay={delay(49)}>
          {'},'}
        </Colorize>
        <Colorize color={colors.found} delay={delay(53)}>
          {`
        "salary": {
          "type": "salary",
          "value": 100000
        }
      `}
        </Colorize>
        <Colorize color={colors.search} delay={delay(47)}>
          {'},'}
        </Colorize>
        <Colorize color={colors.search} delay={delay(54)}>
          {`
      "subunits": []
    `}
        </Colorize>
        <Colorize color={colors.search} delay={delay(45)}>
          {'}'}
        </Colorize>
        {`
  `}
        <Colorize color={colors.search} delay={delay(3)}>
          {']'}
        </Colorize>
        {`
`}
        <Colorize color={colors.search} delay={delay(1)}>
          {'}'}
        </Colorize>
      </code>
    </pre>
  )
}
