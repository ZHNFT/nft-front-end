import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { userService } from 'services';
import moment from 'moment';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// interface bidlist {
//     trxId: string
//     trxExplorerUrl: string
//     bidAmount: string
//     bidDate: string
// }

const BidListOnNFT = ({nftIdentifier, auctionIdentifier, status}) => {
    const network = WalletAdapterNetwork.Mainnet;
    const { publicKey, disconnect, wallet } = useWallet();
    const [data, setData] = useState([]);

    useEffect(() => {
        userService.getNFTBids(nftIdentifier, auctionIdentifier).then(x => setData(x.data));
    }, []);


  return (
    <div className="table-listing nft-proj-listings">
      <table className="table table-striped table-hover">
          <thead>
              <tr>
                  <td className="text-start">Public key</td>
                  <td>Transaction</td>
                  <td>Amount</td>
                  <td>Date & Time</td>
              </tr>
          </thead>
          <tbody>
          {data && data?.length ? (
                data.map((biditem: { publicKey: string; trxId: any; trxExplorerUrl: string; bidAmount: number; bidDate1: string;}, index) => {
                    // console.warn('val', val.bannerImageURL);
                    return (
                        <tr className={status === 5 && index === 0 ? `selected` : `normal`} key={index}>
                            <td>
                                <a href={`https://explorer.solana.com/address/${biditem.publicKey}?cluster=${network}`} target="_blank" className='fs-16 text-start d-block'>
                                    {biditem.publicKey} 
                                    {biditem?.publicKey == publicKey?.toBase58() ? <span className='badge bg-success float-end'>Your Bid</span> : null}
                                    
                                </a>
                            </td>
                            <td><a href={biditem.trxExplorerUrl} target="_blank" className="transaction truncate" >{biditem.trxId}</a></td>
                            <td><img className="img-fluid" src="/solana_color.png" alt="" /> {biditem.bidAmount}</td>
                            <td>{biditem.bidDate1}</td>
                        </tr>
                        )
                })
            ) : (
                <tr>
                    <td colSpan={6}>
                        <div>No Bids to show right now!</div>
                    </td>
                </tr>
            )}
              
          </tbody>
      </table>
  </div>
  )
}

BidListOnNFT.propTypes = {
    nftIdentifier: PropTypes.string,
    auctionIdentifier: PropTypes.string,
    status: PropTypes.any
}

export default BidListOnNFT


