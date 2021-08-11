import { Interface } from '@ethersproject/abi'
import { JSBI, Token, TokenAmount } from '@lootswap/sdk'

import erc20ABI from 'config/abi/erc20.json'
import { isAddress } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { Call, ListenerOptions } from 'state/multicall/actions'
import { CallState, isValidMethodArgs, OptionalMethodInputs, toCallState } from 'utils/methodInputTypes'
import useActiveWeb3React from './useActiveWeb3React'
import useCallsData from './useCallsData'

const ERC20_INTERFACE = new Interface(erc20ABI)

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

function useMultipleContractSingleData(
  addresses: (string | undefined)[],
  contractInterface: Interface,
  methodName: string,
  callInputs?: OptionalMethodInputs,
  options?: ListenerOptions,
): CallState[] {
  const fragment = useMemo(() => contractInterface.getFunction(methodName), [contractInterface, methodName])
  const callData: string | undefined = useMemo(
    () =>
      fragment && isValidMethodArgs(callInputs)
        ? contractInterface.encodeFunctionData(fragment, callInputs)
        : undefined,
    [callInputs, contractInterface, fragment],
  )

  const calls = useMemo(
    () =>
      fragment && addresses && addresses.length > 0 && callData
        ? addresses.map<Call | undefined>((address) => {
            return address && callData
              ? {
                  address,
                  callData,
                }
              : undefined
          })
        : [],
    [addresses, callData, fragment],
  )

  const results = useCallsData(calls, options)

  const latestBlockNumber = useBlockNumber()

  return useMemo(() => {
    return results.map((result) => toCallState(result, contractInterface, fragment, latestBlockNumber))
  }, [fragment, results, contractInterface, latestBlockNumber])
}

export const useTokenAmountsWithLoadingIndicator = (
  address?: string,
  tokens?: (Token | undefined)[],
  method = 'balanceOf',
  tokenInterface = ERC20_INTERFACE,
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] => {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens],
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens])
  const balances = useMultipleContractSingleData(validatedTokenAddresses, tokenInterface, method, [address])

  const anyLoading: boolean = useMemo(() => balances.some((callState) => callState.loading), [balances])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? JSBI.BigInt(value.toString()) : undefined
              if (amount) {
                // eslint-disable-next-line no-param-reassign
                memo[token.address] = new TokenAmount(token, amount)
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances],
    ),
    anyLoading,
  ]
}

export const useTokenAmounts = (
  address?: string,
  tokens?: (Token | undefined)[],
  method = 'balanceOf',
  tokenInterface = ERC20_INTERFACE,
): { [tokenAddress: string]: TokenAmount | undefined } =>
  useTokenAmountsWithLoadingIndicator(address, tokens, method, tokenInterface)[0]

export const useTokenAmount = (
  account?: string,
  token?: Token,
  method = 'balanceOf',
  tokenInterface = ERC20_INTERFACE,
): TokenAmount | undefined => {
  const tokenAmounts = useTokenAmounts(account, [token], method, tokenInterface)
  if (!token) return undefined
  return tokenAmounts[token.address]
}
