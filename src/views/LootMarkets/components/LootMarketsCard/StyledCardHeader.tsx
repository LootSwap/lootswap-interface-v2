import React, { useEffect, useState } from 'react'
import { CardHeader, Heading, Text, Flex, Image } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : theme.colors.gradients[background]};
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
`

const StyledCardHeader: React.FC<{
  earningTokenSymbol: string
  stakingTokenSymbol: string
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningTokenSymbol, stakingTokenSymbol, isFinished = false, isStaking = false }) => {
  const { t } = useTranslation()
  // const poolImageSrc = `${earningTokenSymbol}-${stakingTokenSymbol}.svg`.toLocaleLowerCase()
  const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    return t('Stake %symbol%', { symbol: stakingTokenSymbol })
  }

  const [poolImageSrc, setPoolImageSrc] = useState(
    `${earningTokenSymbol}-${stakingTokenSymbol}.svg`.toLocaleLowerCase(),
  )
  useEffect(() => {
    // Run! Like go get some data from an API.
    const xhr = new XMLHttpRequest()
    // listen for `onload` event
    xhr.onload = () => {
      if (xhr.status === 200) {
        // console.log('Image exists.');
      } else {
        console.log('Image does not exist., replaceing', poolImageSrc)
        const newIconFile = `${earningTokenSymbol}-${stakingTokenSymbol}.png`.toLocaleLowerCase()
        setPoolImageSrc(newIconFile)
      }
    }
    // create a `HEAD` request
    xhr.open('HEAD', `/images/lootmarkets/${poolImageSrc}`)

    // send request
    xhr.send()
  }, [poolImageSrc, earningTokenSymbol, stakingTokenSymbol])

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'body'} scale="lg">
            {`${getHeadingPrefix()} ${earningTokenSymbol}`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
        </Flex>
        <Image src={`/images/lootmarkets/${poolImageSrc}`} alt={earningTokenSymbol} width={64} height={64} />
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
