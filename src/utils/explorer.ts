import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PublicKey, Transaction } from '@solana/web3.js'
import base58 from 'bs58'

export function getExplorerUrl(
    endpoint: string,
    viewTypeOrItemAddress: 'inspector' | PublicKey | string,
    itemType = 'address' // | 'tx' | 'block'
  ) {
    const network = WalletAdapterNetwork.Mainnet;
    const getClusterUrlParam = () => {
      let cluster = ''
      if (endpoint === 'localnet') {
        cluster = `custom&customUrl=${encodeURIComponent(
          'http://127.0.0.1:8899'
        )}`
      } else if (endpoint === 'https://api.devnet.solana.com') {
        cluster = 'devnet'
      } else if (endpoint === `${network}` || endpoint === `mainnet`) {
        cluster = `${network}`
      }
  
      return cluster ? `?cluster=${cluster}` : ''
    }
  
    return `https://explorer.solana.com/${itemType}/${viewTypeOrItemAddress}${getClusterUrlParam()}`
  }