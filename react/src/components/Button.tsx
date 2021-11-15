import styled from 'styled-components/macro'

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  border: none;
  color: white;
  padding: 8px 16px;
  :active {
    background-color: ${({ theme }) => theme.colors.emphasize};
  }
`
