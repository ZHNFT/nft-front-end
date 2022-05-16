import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useRouter } from 'next/router'
import { EndpointTypes } from '../models/types'

export default function useQueryContext() {
  const router = useRouter()
  const { cluster } = router.query
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = cluster ? (cluster as EndpointTypes) : `${network}`
  const hasClusterOption = endpoint !== `${network}`
  const fmtUrlWithCluster = (url) => {
    if (hasClusterOption) {
      const mark = url.includes('?') ? '&' : '?'
      return decodeURIComponent(`${url}${mark}cluster=${endpoint}`)
    }
    return url
  }

  return {
    fmtUrlWithCluster,
  }
}
