import { lighten } from 'polished'
import styled from 'styled-components/macro'

export const Button = styled.button`
  transition: background-color 100ms ease;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  border: none;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.emphasize};
  }
  :active {
    background-color: ${({ theme }) => lighten(0.1, theme.colors.primary)};
  }
`

export const MoneyButton = styled.button`
  @keyframes money-animation {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    25% {
      opacity: 0.75;
    }
    50% {
      opacity: 1;
      transform: translateY(-50px);
    }
    75% {
      opacity: 0.75;
    }
    100% {
      opacity: 0;
      transform: translateY(-100px);
    }
  }
  transition: background-color 100ms ease;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  border: none;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.emphasize};
  }
  :active {
    background-color: ${({ theme }) => lighten(0.1, theme.colors.primary)};
  }
  ::before {
    content: '🤑';
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    opacity: 0;
  }
  :not(:active) {
    ::before {
      animation: money-animation 500ms 1 linear;
    }
  }
  position: relative;
`
