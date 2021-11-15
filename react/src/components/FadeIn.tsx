import {
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components/macro'

export interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  show?: boolean
}
export const FadeIn = ({ show: _show, style, ...props }: FadeInProps) => {
  const [show, setShow] = useState(false)
  useEffect(() => setShow(_show !== false), [_show])
  return <FadeInStyle show={show} {...props} />
}

export interface FadeInImageProps extends ImgHTMLAttributes<HTMLImageElement> {}
export const FadeInImg = ({ onLoad: _onLoad, ...props }: FadeInImageProps) => {
  const [show, setShow] = useState(false)

  const onLoad: ReactEventHandler<HTMLImageElement> = useCallback((event) => {
    _onLoad && _onLoad(event)
    setShow(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <FadeInStyle as="img" show={show} onLoad={onLoad} {...props} />
}

const FadeInStyle = styled.div<{ show: boolean }>`
  transition: opacity 250ms ease 250ms;
  opacity: ${({ show }) => (show ? 1 : 0)};
`
