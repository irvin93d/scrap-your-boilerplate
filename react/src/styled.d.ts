import {} from 'styled-components/macro'

declare module 'styled-components/macro' {
  export interface DefaultTheme {
    //borderRadius: string;

    colors: {
      emphasize: string
      primary: string
      gray1: string
      gray2: string
      text: string
      background: string
    }
    fonts: {
      primary: string
    }
    gaps: {
      none: number
      nano: number
      small: number
      medium: number
      large: number
      huge: number
    }
  }
}
