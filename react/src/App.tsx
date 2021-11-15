import { useState } from 'react'
import styled, { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components/macro'

import { Button } from './components/Button'
import { FadeIn } from './components/FadeIn'
import { HStack, VStack } from './components/Stack'
import data from './data'
import { bill } from './queries/bill'
import { billSubunits } from './queries/billSubunits'
import { selectDepartments } from './queries/selectDepartments'
import { selectEmployees } from './queries/selectEmployees'
import { selectEmployeesWithDepartment } from './queries/selectEmployeesWithDepartment'
import { selectSubdepartments } from './queries/selectSubdepartments'
import { increase } from './transformers/increase'
import { TraverseVisualizer } from './traverse-visualizer'

const fonts: DefaultTheme['fonts'] = { primary: 'Courier New, Courier, monospace' }

const gaps: DefaultTheme['gaps'] = { none: 0, nano: 4, small: 8, medium: 16, large: 32, huge: 64 }

const lightColors: DefaultTheme['colors'] = {
  primary: '#118bff',
  gray1: '#A6ABBD',
  gray2: '#414656',
  text: '#414656',
  emphasize: '#0275d8',
  background: '#FFFFFF',
}
const lightTheme: DefaultTheme = { colors: lightColors, fonts, gaps }

const App = () => {
  const [company, setCompany] = useState(data)

  const increaseAll = () => {
    setCompany((company) => increase(0.1)(company))
  }
  const deccreaseAll = () => {
    setCompany((company) => increase(-0.1)(company))
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Styles>
        <FadeIn>
          <VStack gap="small">
            <h2>Departments</h2>
            <HStack alignItems="flex-start">
              <table>
                <tr>
                  <th>Department</th>
                  <th>Sub-deps</th>
                  {/*<th className="numeric">Employees (incl/excl sub-deps)</th>*/}
                  <th className="numeric">Bill</th>
                  <th className="numeric">Bill sub-deps</th>
                </tr>
                <tbody>
                  {selectDepartments(company).map((department) => (
                    <tr key={department.name}>
                      <td>{department.name}</td>
                      <td>
                        {selectSubdepartments(department)
                          .map(({ name }) => name)
                          .join(', ') || '-'}
                      </td>
                      {/*
                      <td className="numeric">
                        {selectEmployees(department).length}
                        {' / '}
                        {
                          selectEmployeesWithDepartment(department).filter(
                            (employee) => employee.department === department,
                          ).length
                              }
                          </td>
                        */}

                      <td className="numeric">{bill(department)}</td>

                      <td className="numeric">{billSubunits(department)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </HStack>
            <h2>Employees</h2>
            <HStack alignItems="flex-start">
              <table>
                <tr>
                  <th>Employee</th>
                  <th>Address</th>
                  <th>Department</th>
                  <th className="numeric">Salary</th>
                </tr>
                <tbody>
                  {selectEmployeesWithDepartment(company).map(
                    ({ employee: { salary, person }, department }) => (
                      <tr key={`${department.name}-${person.name}`}>
                        <td>{person.name}</td>
                        <td>{person.address}</td>
                        <td>{department.name}</td>
                        <td className="numeric">{paddedNumber(salary.value)}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </HStack>
            <HStack justifyContent="flex-start">
              <Button onClick={increaseAll}>Increase salaries!</Button>
              <Button onClick={increaseAll}>Decrease salaries :(</Button>
            </HStack>
            <h2>Visualization</h2>
            <TraverseVisualizer />
          </VStack>
        </FadeIn>
      </Styles>
    </ThemeProvider>
  )
}

const paddedNumber = (v: number) =>
  v
    .toString()
    .split('')
    .reverse()
    .map((v, i) => (i && !((i + 1) % 3) ? ` ${v}` : v))
    .reverse()
    .join('')

const GlobalStyles = createGlobalStyle`
  html {
    display: flex;
    height: 100%;
    min-width: 100%;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    flex: 1;
    font-family: ${({ theme }) => theme.fonts.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    transition: background-color 500ms ease, color 500ms ease;
  }

  #root {
    display: flex;
    flex: 1;
  }

  h1 {
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
  }
  h2 {
    text-align: center;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    line-height: 1.5;
    text-align: justify;
    max-width: 576px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      color: ${({ theme }) => theme.colors.emphasize};
      text-decoration: underline;
    }
  }
  li {
    text-align: left;
    max-width: 576px;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  img {
    padding: 0.25rem;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    max-width: 576px;
    height: auto;
  }
`

const Styles = styled.div`
  position: relative;
  flex: 1;
  padding: ${({ theme: { gaps } }) => gaps.medium}px;
  table {
    flex: 1;
    border-collapse: collapse;
  }
  tr {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
  td,
  th {
    text-align: left;
    padding: 12px 0;
    &:not(:first-child) {
      padding-left: 24px;
    }
  }
  .numeric {
    text-align: right;
  }
`

export default App
