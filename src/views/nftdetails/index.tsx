import BidListOnNFT from "components/BidListOnNFT";
import BidonNFT from "components/BidonNFT";
import { AnyMap } from "immer/dist/internal";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { userService } from "services";
import useUserStore from "stores/useUserStore";
import { notify } from "utils/notifications";

interface NftDetail {
    txId: string;
    nftAddress: string;
    mediaIfsHash: string;
    mediaDirectory: string;
    mediaIpfsURL: string;
    mediaExtention: string;
    nftAccountAddress: string;
    statusId?: any;
    errorCode?: any;
    message?: any;
    nftDetail?: any;
    wishedCount?: any;
    auctionDetail?: any
    nftIdentifier: string;
    title?: any;
    description?: any;
    isFavourite: boolean;
    startDate: string;
    endDate: string;
    status: string;
    shortDescription: string;
    termsCondition: string;
    winnerDetail: WinnerDetail;
    currentBid: any
}

export interface AuctionDetail {
    auctionIdentifier: string;
    auctionStartDate: Date;
    initialBid: number;
    minimumBid: number;
    auctionEndDate: Date;
}

export interface RootObject {
    nftIdentifier: string;
    title: string;
    nftDetail: NftDetail;
    auctionDetail: AuctionDetail;
    description?: any;
}
export interface WinnerDetail {
    bidAmount: number
    explorerUrl: string
    winnerAddress: string
}

export const NFTDetailsView: FC = ({ }) => {
    const baseUrl = process.env.BASE_URL;
    const router = useRouter();
    const queryurl = router.asPath.split('=')[1];
    const [data, setData] = useState<NftDetail>();
    const [wish, setWish] = useState(false);
    const [display, setDisplay] = useState(false);
    const [nftidt, setNftIdt] = useState('')
    const [aucidt, setAucIdt] = useState('')
    const [wishcount, setWishCount] = useState(0);
    // const [queryurl, setQueryUrl] = useState<any>('')

    // const [endtime, setEndTime] = useState(false);
    // const [days, setDays] = useState(0);
    // const [hours, setHours] = useState(0);
    // const [minutes, setMinutes] = useState(0);
    // const [seconds, setSeconds] = useState(0);

    const user = userService.getUser()
    const users = useUserStore((state) => state.currentUser);
    // const setuserinfo = useUserStore((state) => state.userSetAuth);
    // console.log(queryurl);

    function onWishClick() {
        userService.addWish(queryurl).then(x => {
            setWish(x.data)
            if (x.data) {
                setWishCount(wishcount + 1)
                notify({ type: "success", message: "Added to your watch list" });
            } else if (wishcount > 0) {
                setWishCount(wishcount - 1)
                notify({ type: "error", message: "Removed from watch list" });
            }
        });
        // setData(...data, )

    }

    useEffect(() => {
        // console.log("id", routed)
        userService.getNFTDetail(queryurl).then(x => {
            // console.log(x)
            setData(x.data)
            setWish(x.data?.isFavourite);
            setWishCount(x.data?.wishedCount)
            var endoftime = "";
            if (x?.data?.statusId == 2) {
                endoftime = x?.data?.startdate
            } else if (x?.data?.statusId == 3) {
                endoftime = x?.data?.enddate
            }

            //     const target = new Date(endoftime)

            //   const interval = setInterval(() => {
            //     const now = new Date()
            //     const difference = target.getTime() - now.getTime()

            //     const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            //   setDays(d);

            //   const h = Math.floor(
            //     (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            //   );
            //   setHours(h);

            //   const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            //   setMinutes(m);

            //   const s = Math.floor((difference % (1000 * 60)) / 1000);
            //   setSeconds(s);
            //   if(d <= 0 && h <= 0 && m <= 0 && s <= 0) {
            //     setEndTime(true)
            //   }



            //   }, 1000)

            //   return () => clearInterval(interval);
        });
        if (data) {
            // console.log(data.isFavourite)
            setWish(data.isFavourite);
        }



        // console.log("router", router.asPath.split('=')[1])
    }, []);



    const updateDisplay = (): void => {
        setDisplay(!display)
        window.location.reload();
    }

    const onBidClick = (nftid, aucid) => {
        setDisplay(true)
        setNftIdt(nftid)
        setAucIdt(aucid)
    }

    // console.log("data detail ================", data);

    return (
        <>
            <section className="nft-detail mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 mt-3 mb-3">
                            <div className="img">
                                <img src={`${process.env.BASE_URL}${data?.nftDetail?.mediaDirectory}`} className="img-fluid" alt="" />
                            </div>
                        </div>
                        <div className="col-md-7 mt-3 mb-3">
                            <h5>{data?.title}</h5>
                            <ul className="info">
                                <li>
                                    {user && user?.accessToken ?
                                        <a className="cursor-pointer" onClick={onWishClick}>
                                            {wish ? <img src="/heart.png" alt="" /> : <img src="/heart-o.png" alt="" />}
                                        </a>
                                        : <img src="/heart-o.png" alt="" />} {wishcount} favorites
                                </li>
                            </ul>
                            <ul className="actions">
                                {/* {data.auctionDetail.statusCode == 1 ? () : ()} */}
                                <li>
                                    {data?.statusId === 1 &&
                                        <span className="badge bg-info ">{data?.status}</span>
                                    }
                                    {data?.statusId === 2 &&
                                        <span className="badge bg-warning">{data?.status}</span>
                                    }
                                    {user?.roleTypeId != 1 && data?.statusId == 3 ? (<a className="btn btn-dark btn-sm cursor-pointer" onClick={() => onBidClick(`${data?.nftIdentifier}`, `${data?.auctionDetail?.auctionIdentifier}`)}>Bid Now</a>) : (<></>)}
                                    {data?.statusId === 3 && user?.roleTypeId == 1 ?
                                        <span className="badge bg-success">{data?.status}</span> : null
                                    }
                                    {user?.roleTypeId == 1 && data?.statusId == 4 ? (<Link href={`/announceauction?identity=${data?.nftIdentifier}&auctionIdentifier=${data?.auctionDetail?.auctionIdentifier}`}><a className="btn btn-dark btn-sm">Announce Winner</a></Link>) : (<></>)}
                                    {data?.statusId === 4 && user?.roleTypeId != 1 ?
                                        <span className="badge bg-dark">
                                            {data?.status}
                                        </span> : null
                                    }
                                    {data?.statusId === 5 &&
                                        <span className="badge bg-primary">
                                            {data?.status}
                                        </span>
                                    }
                                </li>
                                <li>
                                    <div className="sol">
                                        <img src="/solana_color.png" alt="" />
                                        &nbsp;
                                        {data?.currentBid && data?.currentBid > 0 ?
                                            <>{data?.currentBid} </> :
                                            <>{data?.auctionDetail?.initialBid ? data?.auctionDetail?.initialBid : <>TBA </>} </>}
                                        SOL
                                    </div>
                                </li>
                            </ul>
                            {data?.statusId === 5 &&
                                <div className="alert alert-info">
                                    <b>Winner:</b> <a href={data?.winnerDetail?.explorerUrl} target="_blank">{data?.winnerDetail?.winnerAddress}</a> <br />
                                    <b>Bid Amount</b> <span>{data?.winnerDetail?.bidAmount}</span>
                                </div>
                            }
                            {data?.statusId >= 4 &&
                                <p className="small mb-4">
                                    <b>Auction Started:</b> {data?.startDate} | <b>Auction Ended:</b> {data?.endDate}
                                </p>
                            }
                            {data?.statusId <= 3 && data?.statusId > 1 ?
                                <p className="small mb-4">
                                    <b>Auction Start:</b> {data?.startDate} | <b>Auction End:</b> {data?.endDate}
                                </p> : null
                            }
                            {/* {data?.statusId <= 3 && data?.statusId > 1 ?
                                <>
                                    {endtime ? (
                                            <>
                                            TBA
                                            </>
                                        ) : (
                                            <>
                                            {days}d {hours}h {minutes}m {seconds}s
                                            </>
                                        )}
                                </> : null
                            } */}
                            {data?.statusId === 1 &&
                                <p className="small mb-4">
                                    <b>Auction Start:</b> TBA | <b>Auction End:</b> TBA
                                </p>
                            }
                            {data?.statusId === 1 ?
                                <p className="small mb-4">
                                    <b>Initial Bid:</b> <img src="/solana_color.png" alt="" /> TBA SOL |  <b>Incremented Value:</b> <img src="/solana_color.png" alt="" /> TBA SOL
                                </p> :
                                <p className="small mb-4">
                                    <b>Initial Bid:</b> <img src="/solana_color.png" alt="" /> {data?.auctionDetail?.initialBid} SOL |  <b>Incremented Value:</b> <img src="/solana_color.png" alt="" /> {data?.auctionDetail?.minimumBid} SOL
                                </p>
                            }
                            <p className="small mb-4">
                                <b>Certificate of authentication:</b>  <a style={{ color: 'blue' }} href="#" target={'_blank'}>Click here</a>
                            </p>

                            <h5>Description</h5>
                            <p>{data?.shortDescription}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container ">
                    <div className="btn-group nav nav-tabs nav-pills nav-justified  mb-md-2 mb-sm-3 mb-3" id="myTab" role="tablist">
                        <a className="btn btn-dark btn-outline-dark nav-link active" data-bs-toggle="list" href="#Store" role="tab">About</a>
                        <a className="btn btn-dark btn-outline-dark nav-link" data-bs-toggle="list" href="#NFT" role="tab">Terms & Conditions</a>
                    </div>
                    <div className="tab-content pt-5 pb-5">
                        <div className="tab-pane active" id="Store" role="tabpanel">
                            <h5>About {data?.title}</h5>
                            <pre className="pre">
                                {data?.description}
                            </pre>
                        </div>
                        <div className="tab-pane" id="NFT" role="tabpanel">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5>Terms & Conditions {data?.title}</h5>
                                    <p>
                                        {data?.termsCondition}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    {data?.nftIdentifier && data?.auctionDetail?.auctionIdentifier ?
                        <BidListOnNFT nftIdentifier={data?.nftIdentifier} auctionIdentifier={data?.auctionDetail?.auctionIdentifier} status={data?.statusId} />
                        : null
                    }
                </div>
            </section>

            {display && <BidonNFT onHide={updateDisplay} nftIdentifier={nftidt} auctionIdentifier={aucidt} />}



            {/* <section className="morecollection">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-12 ">
                            <h2 className="text-center mb-5">More From This Collection</h2>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="art-box bidbox">
                                <div className="img">
                                    <a href="#"><img src="/Rectangle 315-2.png" alt="" className="img-fluid" /></a>
                                </div>
                                <div className="info">
                                    <div className="left">
                                        <p><a href="#"><b>By PunkArt</b></a></p>
                                        <h5 className=""><a href="#">Digital Art #5345</a></h5>
                                    </div>
                                    <div className="right">
                                        <p><a href="#"><b>My Bid</b></a></p>
                                        <h5><img src="/solana_color.png" alt="" /> 43 SOL</h5>
                                    </div>
                                </div>
                                <div className="info bidnow">
                                    <div className="left">
                                        <p><b><a href="#">Bid Now</a></b></p>
                                    </div>
                                    <div className="right">
                                        <p><a href="#"><img src="/heart.png" alt="" /></a> <b>03</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="art-box bidbox">
                                <div className="img">
                                    <a href="#"><img src="/turtle.png" alt="" className="img-fluid" /></a>
                                </div>
                                <div className="info">
                                    <div className="left">
                                        <p><a href="#"><b>By PunkArt</b></a></p>
                                        <h5 className=""><a href="#">Digital Art #5345</a></h5>
                                    </div>
                                    <div className="right">
                                        <p><a href="#"><b>My Bid</b></a></p>
                                        <h5><img src="/solana_color.png" alt="" /> 43 SOL</h5>
                                    </div>
                                </div>
                                <div className="info bidnow">
                                    <div className="left">
                                        <p><b><a href="#">Bid Now</a></b></p>
                                    </div>
                                    <div className="right">
                                        <p><a href="#"><img src="/heart.png" alt="" /></a> <b>03</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="art-box bidbox">
                                <div className="img">
                                    <a href="#"><img src="/wolf.png" alt="" className="img-fluid" /></a>
                                </div>
                                <div className="info">
                                    <div className="left">
                                        <p><a href="#"><b>By PunkArt</b></a></p>
                                        <h5 className=""><a href="#">Digital Art #5345</a></h5>
                                    </div>
                                    <div className="right">
                                        <p><a href="#"><b>My Bid</b></a></p>
                                        <h5><img src="/solana_color.png" alt="" /> 43 SOL</h5>
                                    </div>
                                </div>
                                <div className="info bidnow">
                                    <div className="left">
                                        <p><b><a href="#">Bid Now</a></b></p>
                                    </div>
                                    <div className="right">
                                        <p><a href="#"><img src="/heart.png" alt="" /></a> <b>03</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                            <Link href="/nft"><a className="btn btn-dark btn-tlight">View All Collection</a></Link>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
};
