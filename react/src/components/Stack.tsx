import styled, { CSSProperties } from 'styled-components/macro'

export interface StackProps
  extends Pick<CSSProperties, 'flexWrap' | 'alignItems' | 'justifyContent'> {
  gap?: 'none' | 'small' | 'medium' | 'large'
  sizeEvenly?: boolean
}

export const HStack = styled.div<StackProps>`
  align-items: ${({ alignItems }) => alignItems ?? 'stretch'};
  align-content: center;
  display: flex;
  flex-direction: row;
  gap: ${({ theme: { gaps }, gap }) => gaps[gap ?? 'small']}px;
  justify-content: ${({ justifyContent }) => justifyContent ?? 'space-between'};
  flex-wrap: ${({ flexWrap }) => flexWrap ?? 'no-wrap'};

  & > * {
    ${({ sizeEvenly }) => (sizeEvenly ? 'flex: 1;' : '')};
  }
`

export const VStack = styled.div<StackProps>`
  align-content: center;
  align-items: ${({ alignItems }) => alignItems ?? 'stretch'};
  display: flex;
  flex-direction: column;
  gap: ${({ theme: { gaps }, gap }) => gaps[gap ?? 'small']}px;
  justify-content: ${({ justifyContent }) => justifyContent ?? 'center'};
  flex-wrap: ${({ flexWrap }) => flexWrap ?? 'no-wrap'};

  & > * {
    ${({ sizeEvenly }) => (sizeEvenly ? 'flex: 1;' : '')};
  }
`
