import { useEffect, useState } from 'react'

/* eslint-disable camelcase */
export interface DeBankTvlResponse {
  tvl: number
}

export const useGetStats = () => {
  const [data, setData] = useState<DeBankTvlResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('https://openapi.debank.com/v1/protocol?id=bsc_pancakeswap')
        // const responseData: DeBankTvlResponse = await response.json()
        // TODO needs to be replace with our graphs
        const responseData = {
          tvl: 0,
        }
        setData(responseData)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}
