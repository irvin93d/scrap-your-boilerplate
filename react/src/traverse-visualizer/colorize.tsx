import styled from 'styled-components/macro'

export const Colorize = styled.span<{ color: string; delay: number }>`
  transition: all 1000ms ease ${({ delay }) => delay}ms;
  color: ${({ color }) => color};
  font-weight: ${({ color }) => (color !== 'inherit' ? '800' : 'normal')};
`
