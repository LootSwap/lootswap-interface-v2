import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_GAS_PRICE, DEFAULT_TOKEN_DECIMAL, ZERO_ADDRESS } from 'config'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  const referral = ZERO_ADDRESS
  const estGas = await masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), referral)
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('stake().estGas failed', error)
    })

  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), referral)
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  const referral = ZERO_ADDRESS
  const estGas = await masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), referral)
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('unstake().estGas failed', error)
    })

  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), referral)
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  const estGas = await masterChefContract.methods
    .claimReward(pid)
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('harvest().estGas failed', error)
    })

  return masterChefContract.methods
    .claimReward(pid)
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unlock = async (contract, account) => {
  const estGas = await contract.methods
    .unlock()
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('unlock().estGas failed', error)
    })

  return contract.methods
    .unlock()
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// Loot Markets
export const approveLootMarket = async (lpContract, lootMarketContract, account) => {
  const txn = await lpContract.methods
    .approve(lootMarketContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
  return txn
}

export const lootMarketHarvestStaking = async (lootMarketContract, account) => {
  const estGas = await lootMarketContract.methods
    .withdraw(0)
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('lootMarketHarvestStaking().estGas failed', error)
    })

  return lootMarketContract.methods
    .withdraw(0)
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const lootMarketUnstake = async (lootMarketContract, amount, account) => {
  const estGas = await lootMarketContract.methods
    .withdraw(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('lootMarketUnstake().estGas failed', error)
    })

  return lootMarketContract.methods
    .withdraw(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const lootMarketEmergencyUnstake = async (lootMarketContract, account) => {
  return lootMarketContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const lootMarketStakingStake = async (lootMarketContract, amount, account) => {
  const estGas = await lootMarketContract.methods
    .deposit(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('lootMarketStakingStake().estGas failed', error)
    })

  return lootMarketContract.methods
    .deposit(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

// Guild

export const approveGuild = async (lpContract, masterGuildContract, account) => {
  return lpContract.methods
    .approve(masterGuildContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stakeGuild = async (masterGuildContract, pid, amount, account) => {
  const referral = ZERO_ADDRESS
  const estGas = await masterGuildContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), referral)
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('stakeGuild().estGas failed', error)
    })

  return masterGuildContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), referral)
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstakeGuild = async (masterGuildContract, pid, amount, account) => {
  const referral = ZERO_ADDRESS
  const estGas = await masterGuildContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), referral)
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('unstakeGuild().estGas failed', error)
    })
  return masterGuildContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), referral)
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unlockGuild = async (guildContract, account) => {
  const estGas = await guildContract.methods
    .unlock()
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('unlockGuild().estGas failed', error)
    })

  return guildContract.methods
    .unlock()
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvestAllGuild = async (masterGuildContract, pids, account) => {
  const estGas = await masterGuildContract.methods
    .claimRewards(pids)
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('harvestAllGuild().estGas failed', error)
    })

  return masterGuildContract.methods
    .claimRewards(pids)
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvestGuild = async (masterGuildContract, pid, account) => {
  const estGas = await masterGuildContract.methods
    .claimReward(pid)
    .estimateGas({ from: account, gasPrice: DEFAULT_GAS_PRICE }, (error, estimateGas) => {
      return !error ? estimateGas : DEFAULT_GAS_LIMIT
    })
    .catch((error) => {
      console.error('harvestGuild().estGas failed', error)
    })

  return masterGuildContract.methods
    .claimReward(pid)
    .send({ from: account, gas: estGas })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
