import moment from "moment";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { userService } from "services";
import { number } from "yup/lib/locale";
import Countdown from 'react-countdown';
import BidonNFT from '../../components/BidonNFT'

// interface User {
//     roleType: Number
// }

export const NFTView: FC = ({ }) => {
    const baseUrl = process.env.BASE_URL;

    const [data, setData] = useState([]);
    const [display, setDisplay] = useState(false);
    const [nftidt, setNftIdt] = useState('')
    const [aucidt, setAucIdt] = useState('')
    const user = userService.getUser()

    useEffect(() => {
        userService.getAllNFT().then(x => setData(x));
    }, []);

    const onBidClick = (nftid, aucid) => {
        setDisplay(true)
        setNftIdt(nftid)
        setAucIdt(aucid)
    }

    const updateDisplay = (): void => {
        setDisplay(!display)
    }

    // console.log("user===========",user);

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-3 pb-5 mw-70">
                            <h2 className="text-center">nfts lIST</h2>
                            <p className="text-center">Scan through the elite collection of artwork and bid on your choice of art. It's secure and seamless!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="toparts">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="searchformwbtn">
                                <div className="form d-flex">
                                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn" type="submit"><img className="img-fluid" src="/search.png" alt="" /></button>
                                </div>
                                {user?.roleTypeId === 1 ?
                                    <Link href="/mintnewnft"><a className="btn btn-dark">Mint New NFT</a></Link> : null}
                            </div>
                            <div className="table-listing nft-proj-listings">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            {/* <td >#</td> */}
                                            <td className="text-start">NFT Title</td>
                                            <td>Explorer</td>
                                            <td>Status</td>
                                            <td>Min Bid Price</td>
                                            <td>Initial Bid Price</td>
                                            <td>Auction Start</td>
                                            <td>Auction End</td>
                                            <td>Whishlist</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data?.length ? (
                                            data.map((nftitem, index) => {
                                                // console.warn('val', val.bannerImageURL);
                                                return (
                                                    <tr key={nftitem.nftIdentifier}>
                                                        {/* <td scope="row" data-label="# NFT">
                                            {nftitem.id}
                                        </td> */}
                                                        <td data-label="NFT Title">
                                                            <div className="info">
                                                                <Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a><img className="img-fluid" src={`${baseUrl}${nftitem.thumbnail}`} alt="" /></a></Link>
                                                                <div className="sep">
                                                                    <h6><Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a>{nftitem.title}</a></Link></h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td data-label="Explorer">
                                                            <a href={nftitem.nftUrl} target="_blank" className="explorerst">{nftitem.nftAddress}</a>
                                                        </td>
                                                        <td data-label="Status">
                                                            {nftitem.statusId == 1 &&
                                                                <span className="badge bg-info">
                                                                    {nftitem.status}
                                                                </span>
                                                            }
                                                            {nftitem.statusId == 2 &&
                                                                <span className="badge bg-warning">
                                                                    {nftitem.status}
                                                                </span>
                                                            }
                                                            {nftitem.statusId == 3 &&
                                                                <span className="badge bg-success">
                                                                    {nftitem.status}
                                                                </span>
                                                            }
                                                            {nftitem.statusId == 4 &&
                                                                <span className="badge bg-dark">
                                                                    {nftitem.status}
                                                                </span>
                                                            }
                                                            {nftitem.statusId == 5 &&
                                                                <span className="badge bg-primary">
                                                                    {nftitem.status}
                                                                </span>
                                                            }
                                                        </td>
                                                        <td data-label="Min Bid Price">
                                                            <div className="sep">
                                                                <img className="img-fluid" src="/solana_color.png" alt="" />
                                                                {nftitem.minimumBid !== null ? nftitem.minimumBid : <>--</>}
                                                            </div>
                                                        </td>
                                                        <td data-label="Initial Bid Price">
                                                            <div className="sep">
                                                                <img className="img-fluid" src="/solana_color.png" alt="" />
                                                                {/* {nftitem.initialBid} */}
                                                                {nftitem.initialBid !== null ? nftitem.initialBid : <>--</>}
                                                            </div>
                                                        </td>
                                                        <td data-label="Auction Start date">
                                                            {nftitem.auctionStartDate ? nftitem.auctionStartDate2 : 'TBA'}
                                                        </td>
                                                        <td data-label="Auction End date">
                                                            {nftitem.auctionEndDate ? nftitem.auctionEndDate2 : 'TBA'}
                                                            {/* <Countdown date={nftitem.auctionEndDate2} /> */}
                                                        </td>
                                                        <td data-label="Whishlist">
                                                            {nftitem.wishedCount}
                                                        </td>
                                                        <td data-label="Actions">
                                                            {user?.roleTypeId == 1 && nftitem.statusId == 1 ? (<Link href={`/token?identity=${nftitem.nftIdentifier}`}><a className="btn btn-dark btn-sm">Announce Auction</a></Link>) : (<></>)}
                                                            {user?.roleTypeId == 1 && nftitem.statusId == 4 ? (<Link href={`/announceauction?identity=${nftitem.nftIdentifier}&auctionIdentifier=${nftitem.auctionIdentifier}`}><a className="btn btn-dark btn-sm">Announce Winner</a></Link>) : (<></>)}
                                                            {user?.roleTypeId == 2 && nftitem.statusId == 3 ? (<a className="btn btn-dark btn-sm cursor-pointer" onClick={() => onBidClick(`${nftitem.nftIdentifier}`, `${nftitem.auctionIdentifier}`)}>Bid Now</a>) : (<></>)}
                                                            {user?.roleTypeId == 2 && nftitem.statusId == 4 ? (<span className="badge bg-primary">Winner TBA</span>) : (<></>)}
                                                            {user?.roleTypeId == 2 && nftitem.statusId == 5 ? (<Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a className="btn btn-dark btn-sm">View Winner</a></Link>) : (<></>)}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={8}>
                                                    <div>No NFTs to show right now!</div>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {display && <BidonNFT onHide={updateDisplay} nftIdentifier={nftidt} auctionIdentifier={aucidt} />}
        </>
    );
};
