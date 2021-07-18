import { useTranslation } from 'contexts/Localization'
import React, { useState, useRef } from 'react'
import styled from 'styled-components'

interface GuildTitleViewProps {
  guildSymbol: string
  textColor: string
  overlayColor: string
}

interface IAnimatedTextContentClone {
  maskX: number
  maskY: number
  color: string
}

const AnimatedTextContainer = styled.section`
  position: relative;
  cursor: default;
  user-select: none;
`

const AnimatedTextContent = styled.h1`
  color: ${(props) => (props.color ? props.color : '#000')};
  font-size: 100px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 5px;
  text-shadow: 5px 3px 8px rgba(0, 0, 0, 0.2);
  margin: 0;
`

const AnimatedTextContentClone: React.FunctionComponent<IAnimatedTextContentClone> = styled.h1<{
  maskX: number
  maskY: number
  color: string
}>`
  font-size: 100px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 5px;
  text-shadow: 5px 3px 8px rgba(0, 0, 0, 0.2);
  margin: 0;
  position: absolute;
  left: 0;
  top: 0;
  color: ${(props) => (props.color ? props.color : '#fff')};
  transition: all 0.4s ease-out;
  clip-path: polygon(
    0 0,
    calc(${(props) => props.maskX} * 1% + (${(props) => props.maskY} - 50) * 0.4%) 0,
    calc(${(props) => props.maskX} * 1% + (${(props) => props.maskY} - 50) * 0.4%) 100%,
    0 100%
  );
`

const AnimatedText: React.FunctionComponent<GuildTitleViewProps> = ({ textColor, overlayColor, guildSymbol }) => {
  const { t } = useTranslation()
  const containerElem = useRef(null)
  const initialMousePos = { x: 0, y: 0 }
  const [mousePos, setMousePos] = useState(initialMousePos)

  const handleMouseMove = (event) => {
    const elem = containerElem.current
    const newX = (event.clientX / elem.clientWidth) * 100
    const newY = (event.clientY / elem.clientHeight) * 100
    const newMousePos = {
      x: newX,
      y: newY,
    }
    setMousePos(newMousePos)
  }
  const handleMouseOut = () => setMousePos(initialMousePos)

  return (
    <AnimatedTextContainer onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} ref={containerElem}>
      <AnimatedTextContent color={textColor}>{`${guildSymbol} ${t('Guild')}`}</AnimatedTextContent>
      <AnimatedTextContentClone aria-hidden maskX={mousePos.x} maskY={mousePos.y} color={overlayColor}>
        {`${guildSymbol} ${t('Guild')}`}
      </AnimatedTextContentClone>
    </AnimatedTextContainer>
  )
}

export default AnimatedText
