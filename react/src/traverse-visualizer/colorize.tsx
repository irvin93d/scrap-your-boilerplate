import styled from 'styled-components/macro'

export const Colorize = styled.span<{ color: string; delay: number }>`
  transition: all 1000ms ease ${({ delay }) => delay}ms;
  color: ${({ color }) => color};
  font-weight: ${({ color }) => (color !== 'inherit' ? '800' : 'normal')};
`

export const ColorizeBackground = styled.span<{ color: string; delay: number }>`
  transition: all 1000ms ease ${({ delay }) => delay}ms;
  background-color: ${({ color }) => color};
  border-radius: 2px;
  color: ${({ color }) => (color === 'inherit' ? 'inherit' : 'white')};
  font-weight: ${({ color }) => (color !== 'inherit' ? '800' : 'normal')};
`
