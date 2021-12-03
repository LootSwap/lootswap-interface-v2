import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { unlockGuild } from 'utils/callHelpers'
import { useGuildToken } from './useContract'

// Guild
const useGuildUnlock = (guildSlug: string) => {
  const { account } = useWeb3React()
  const tokenContract = useGuildToken(guildSlug)

  const handleUnlock = useCallback(async () => {
    const txHash = await unlockGuild(tokenContract, account)
    console.info(txHash)
    return txHash
  }, [account, tokenContract])

  return { onReward: handleUnlock }
}

export default useGuildUnlock
