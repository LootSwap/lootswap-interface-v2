import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
import { getWeb3NoAccount } from 'utils/web3'
import MultiCallAbi from 'config/abi/multicall.json'
import { getMulticallAddress } from 'utils/addressHelpers'

interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface MulticallOptions {
  web3?: Web3
  blockNumber?: number
  requireSuccess?: boolean
}

const multicall = async (abi: any[], calls: Call[], options: MulticallOptions = {}) => {
  try {
    const web3 = options.web3 || getWeb3NoAccount()
    const multi = new web3.eth.Contract(MultiCallAbi as unknown as AbiItem, getMulticallAddress())
    const itf = new Interface(abi)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const { returnData } = await multi.methods.aggregate(calldata).call(undefined, options.blockNumber)
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

    return res
  } catch (error) {
    throw new Error(error)
  }
}

export default multicall
