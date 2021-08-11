import React from 'react'
import { Card, CardBody, CardHeader, Heading } from '@pancakeswap/uikit'
import { Fraction, Token, TokenAmount } from '@lootswap/sdk'
import CountUp from 'react-countup'
import { useWeb3React } from '@web3-react/core'
import { DUNGEON, DUNGEON_INTERFACE, DUNGEON_SETTINGS } from 'config/constants/dungeon'
import { useTokenAmount } from 'hooks/useTokenAmount'
import useGovernanceToken from 'hooks/useGovernanceToken'
import useDungeonRatio from 'hooks/useDungeonRatio'

const AutoLootCard: React.FC = () => {
  const web3React = useWeb3React()
  const { account, chainId } = web3React

  const govToken = useGovernanceToken()
  const govTokenDungeonTokenRatio = useDungeonRatio()
  const dungeon: Token = chainId ? DUNGEON[chainId] : undefined
  const dungeonSettings = chainId ? DUNGEON_SETTINGS[chainId] : undefined
  const dungeonBalance: TokenAmount | undefined = useTokenAmount(
    account ?? undefined,
    dungeon,
    'balanceOf',
    DUNGEON_INTERFACE,
  )

  console.log('🌓🌓🌓🌓🌓🌓🌓🌓🌓🌓🌓🌓🌓🌓🌓🌓🌓')
  console.log({
    web3React,
    account,
    chainId,
    govToken,
    govTokenDungeonTokenRatio,
    dungeon,
    dungeonSettings,
    dungeonBalance,
  })

  return (
    <Card>
      <CardHeader>
        <Heading>{dungeonSettings?.name} - DEX fee sharing</Heading>
        <p>Stake your {govToken?.symbol} tokens and earn 1/3rd of the generated trading fees.</p>
      </CardHeader>
      <CardBody>
        <p>
          Your a{govToken?.symbol} Balance (1 a{govToken?.symbol} = {govTokenDungeonTokenRatio?.toSignificant(4)}{' '}
          {govToken?.symbol})
        </p>
        <p>
          <CountUp
            key={dungeonBalance?.toFixed(4)}
            decimals={4}
            start={0}
            end={parseFloat(dungeonBalance?.toFixed(4))}
            separator=","
            duration={1}
          />
        </p>
      </CardBody>
    </Card>
  )
}

export default AutoLootCard
