
import WishComponent from "components/WishComponent";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { userService } from "services";

// interface WatchList {
//     initialBid: number
//     mediaDirectory: string
//     minimumBid: number
//     title: string
//     wishedCount: number
// }

export const MyWatchListView: FC = ({ }) => {
    const baseurl = process.env.BASE_URL;
    const [data, setData] = useState([]);

    useEffect(() => {
        userService.getWatchList().then(x => {
            // console.log(x)
            if(x?.statusCode === 200) {
                setData(x.data)
            }
        });
    }, []);

    // console.log(data)

  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12 pt-3 pb-3 mw-70">
                    <h2 className="text-center mb-5">My Watchlist</h2>
                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div className="container ">
            <div className="btn-group nav nav-tabs nav-pills nav-justified  mb-md-2 mb-sm-3 mb-3" id="myTab" role="tablist">
                {/* <a className="btn btn-dark btn-outline-dark nav-link" data-bs-toggle="list" href="#Store" role="tab">Store</a> */}
                <a className="btn btn-dark btn-outline-dark nav-link active" data-bs-toggle="list" href="#NFT" role="tab">NFT</a>
            </div>
            <div className="tab-content pt-5 pb-5">
                <div className="tab-pane" id="Store" role="tabpanel">
                    <div className="row ">
                    </div>
                </div>
                <div className="tab-pane active" id="NFT" role="tabpanel">
                    <div className="row">
                        {data && data?.length ? 
                        data.map((nftitem, index) => {
                            return (
                                <div className="col-lg-4 col-md-4 col-sm-6" key={index}>
                                <div className="art-box bidbox">
                                    <div className="img">
                                        <Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a><img className="img-fluid" src={`${baseurl}${nftitem.thumbnail}`} alt="" /></a></Link>
                                    </div>
                                    <div className="info">
                                        <div className="left">
                                            <h5 className=""><Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a>{nftitem.title}</a></Link></h5>
                                            
                                            <p>
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
                                            </p>
                                        </div>
                                        <div className="right">
                                            <h5>
                                                <img src="/solana_color.png" alt="" /> 
                                                {nftitem?.initialBid ?
                                                <>
                                                {nftitem?.currentBid > 0 ? <>{nftitem?.currentBid} </> : <>{nftitem?.initialBid} </>}
                                                
                                                </> :
                                                <>TBA </>}
                                                SOL
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="info bidnow">
                                        <div className="left">
                                            <p>
                                                <b>
                                                    
                                                </b>
                                            </p>
                                        </div>
                                        <div className="right">
                                            <p>
                                                <WishComponent nftIdentifier={nftitem?.nftIdentifier} isFavorite={nftitem?.isFavourite} wishedCount={nftitem.wishedCount} />
                                                {/* {user?.roleTypeId == 2 ? 
                                                    <a className="cursor-pointer" onClick={onWishClick}>
                                                        {wish ? <img src="/heart.png" alt="" /> : <img src="/heart-o.png" alt="" />}
                                                    </a> :
                                                    <img src="/heart-o.png" alt="" />
                                                }
                                                <b>{nftitem.wishedCount}</b> */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        }
                        ) : (
                            <div>Your Watch List is empty</div>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};
