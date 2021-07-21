import React from 'react'
import styled, { keyframes } from 'styled-components'

interface ICharacterStyle {
  width: number
  height: number
}

interface IWalkingSprite {
  image?: string
  width?: number
  height?: number
}
const moveSpriteSheet = keyframes`
	from {
        transform: translate(0px, -710px);
    }
    to {
        transform: translate(-384px, -710px);
    }
`

const moveSpritePosition = keyframes`
    from {
        transform: translateX(0);
        opacity:1
    }
    to {
        transform: translateX(1000px);
        opacity:0
    }
`

const CharacterStyle: React.FunctionComponent<ICharacterStyle> = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px !important;
  height: ${(props) => props.height}px !important;
  animation: ${moveSpritePosition} 7s linear both;
  overflow: hidden;
`

const ImgStyle = styled.img`
  max-width: unset !important;
  height: unset !important;
  transform: translate(0px, -199px);
  animation: ${moveSpriteSheet} 0.7s steps(6) infinite;
`

const WalkingSprite: React.FunctionComponent<IWalkingSprite> = ({ image = '', width = 0, height = 0 }) => {
  return (
    image !== '' && (
      <CharacterStyle width={width} height={height}>
        <ImgStyle alt="character" src={image} />
      </CharacterStyle>
    )
  )
}

export default WalkingSprite
