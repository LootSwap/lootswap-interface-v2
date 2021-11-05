import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@pancakeswap/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  farmImage,
  tokenSymbol,
}) => {
  const [iconFile, setIconFile] = useState(`${farmImage}.svg`)

  useEffect(() => {
    // Run! Like go get some data from an API.
    const xhr = new XMLHttpRequest()
    // listen for `onload` event
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.response.type !== 'text/html') {
        // console.log('Image exists.');
      } else {
        // console.log('Image does not exist., replaceing', iconFile);
        const newIconFile = `${farmImage}.png`
        setIconFile(newIconFile)
      }
    }
    // create a `HEAD` request
    xhr.open('HEAD', `/images/questlog/${iconFile}`, true)
    xhr.responseType = 'blob'

    // send request
    xhr.send()
  }, [iconFile, farmImage])

  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/questlog/${iconFile}`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          {multiplier && <MultiplierTag variant="secondary">{`lvl ${multiplier}`}</MultiplierTag>}
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
