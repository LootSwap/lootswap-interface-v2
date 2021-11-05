import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useGuildSettings from '../../hooks/useGuildSettings'
import Select, { OptionProps } from '../../../../components/Select/Select'

const fadeInDown = keyframes`
 0% {
    opacity: 0;
    transform: translateY(-20px);
 }
 100% {
    opacity: 1;
    transform: translateY(0);
 }
`

const SelectStyle = styled.div`
  margin-top: 25px;
  animation: ${fadeInDown} 2s;
`

interface ISocialMediaProps {
  guildSlug: string
}

const SocialMedia: React.FunctionComponent<ISocialMediaProps> = ({ guildSlug }) => {
  const guildSettings = useGuildSettings(guildSlug)
  // eslint-disable-next-line
  const [sortOption, setSortOption] = useState('')
  const options = [{ label: 'Learn more..', value: '' }]
  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
    if (option.value !== '') {
      window.open(option.value)
    }
  }

  if (guildSettings.social?.length > 0) {
    guildSettings.social.filter((g) => g.link !== '').map((g) => options.push({ label: g.label, value: g.link }))
  }
  return guildSettings.social?.length > 0 ? (
    <SelectStyle>
      <Select options={options} onChange={handleSortOptionChange} defaultList />
    </SelectStyle>
  ) : null
}

export default SocialMedia
