import { Contract } from 'ethers'
import { useMemo } from 'react'
import { Call, ListenerOptions } from 'state/multicall/actions'
import { CallState, isValidMethodArgs, OptionalMethodInputs, toCallState } from 'utils/methodInputTypes'
import useCallsData from './useCallsData'
import { useBlockNumber } from './useTokenAmount'

export default function useSingleCallResult(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs,
  options?: ListenerOptions,
): CallState {
  const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName])

  const calls = useMemo<Call[]>(() => {
    return contract && fragment && isValidMethodArgs(inputs)
      ? [
          {
            address: contract.address,
            callData: contract.interface.encodeFunctionData(fragment, inputs),
          },
        ]
      : []
  }, [contract, fragment, inputs])

  const result = useCallsData(calls, options)[0]
  const latestBlockNumber = useBlockNumber()

  return useMemo(() => {
    return toCallState(result, contract?.interface, fragment, latestBlockNumber)
  }, [result, contract, fragment, latestBlockNumber])
}
