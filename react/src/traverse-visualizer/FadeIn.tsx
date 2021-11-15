import { FC, useEffect, useState } from 'react'
import styled from 'styled-components/macro'

export const FadeIn: FC = (props) => {
  const [show, setShow] = useState(false)
  useEffect(() => setShow(true), [])
  return <FadeInStyle show={show} {...props} />
}

const FadeInStyle = styled.div<{ show: boolean }>`
  transition: opacity 250ms ease;
  opacity: ${({ show }) => (show ? 1 : 0)};
`
