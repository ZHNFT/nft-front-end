
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { userService } from "services";

export const MyBidView: FC = ({ }) => {
    const baseurl = process.env.BASE_URL;
    const [data, setData] = useState([]);

    useEffect(() => {
        userService.getMyNFTBids().then(x => {
            setData(x.data)});
    }, []);
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12 pt-3 pb-3 mw-70">
                    <h2 className="text-center">MY BIDS</h2>
                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div className="container">
        <div className="table-listing nft-proj-listings">
      <table className="table table-striped table-hover">
          <thead>
              <tr>
                  <td>NFT</td>
                  <td className="text-start">Title</td>
                  <td>Transaction</td>
                  <td>Amount</td>
                  <td>date & Time</td>
              </tr>
          </thead>
          <tbody>
          {data && data?.length ? (
                data.map((biditem: { title: string; thumbnail: string; trxId: any; trxExplorerUrl: string; bidAmount: number; bidDate1: string; nftIdentifier: string;}, index) => {
                    // console.warn('val', val.bannerImageURL);
                    return (
                        <tr>
                            <td><Link href={"/nftdetails?nftIdentifier=" + biditem.nftIdentifier}><a><img width={100} className="img-fluid" src={`${baseurl}${biditem.thumbnail}`} alt="" /></a></Link></td>
                            <td><span className='fs-16 text-start d-block'>{biditem?.title}</span></td>
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
        </div>
    </section>
    </>
  );
};
