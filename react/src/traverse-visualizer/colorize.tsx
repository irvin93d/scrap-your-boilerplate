import styled from 'styled-components/macro'

export const Colorize = styled.span<{ color: string; delay: number }>`
  color: ${({ color }) => color};
  transition: color 250ms ease ${({ delay }) => delay}ms,
    font-weight 250ms ease ${({ delay }) => delay}ms;
  font-weight: ${({ color }) => (color !== 'inherit' ? 'bold' : 'normal')};
`
