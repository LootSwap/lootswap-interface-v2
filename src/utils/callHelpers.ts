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
