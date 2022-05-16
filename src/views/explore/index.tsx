import moment from "moment";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { userService } from "services";
import { number } from "yup/lib/locale";
import Countdown from 'react-countdown';
import BidonNFT from '../../components/BidonNFT'
import { notify } from "utils/notifications";
import WishComponent from "components/WishComponent";
import { useRouter } from "next/router";

// interface User {
//     roleType: Number
// }

export const ExploreView: FC = ({ }) => {
    const baseUrl = process.env.BASE_URL;
    const router = useRouter();
    const queryurl = router.query?.searchText;

    const [data, setData] = useState([]);
    const [display, setDisplay] = useState(false);
    const [nftidt, setNftIdt] = useState('')
    const [aucidt, setAucIdt] = useState('')
    const [search, setSearch] = useState('');
    const [filteredNfts, setFilteredNfts] = useState([]);
    // const [wish, setWish] = useState(false);
    // const [wishcount, setWishCount] = useState(0);
    const user = userService.getUser()



    useEffect(() => {
        // console.log("queryurl", queryurl)
        userService.getAllNFT().then(x => {
            setData(x)
            if (queryurl) {
                getFilteredNfts(queryurl);
            }
        });
        // if(queryurl) {
        //     userService.getSearchNFT(queryurl).then(x => setData(x));

        // } else {
        // }
    }, [queryurl]);

    // function onWishClick() {
    //     userService.addWish(nftidt).then(x => {
    //         setWish(x?.data)
    //         if (x?.data) {
    //             setWishCount(wishcount + 1)
    //             notify({type: "success", message: "Added to your watch list"});
    //         } else if (wishcount > 0) {
    //             setWishCount(wishcount - 1)
    //             notify({type: "error", message: "Removed from watch list"});
    //         }
    //     });
    //     // setData(...data, )

    // }

    const onBidClick = (nftid, aucid) => {
        setDisplay(true)
        setNftIdt(nftid)
        setAucIdt(aucid)
    }

    const updateDisplay = (): void => {
        setDisplay(!display)
    }

    const getFilteredNfts = (text) => {
        // console.log("text",text) 
        let myArr = [...data];
        if (text) {
            // console.log("myArr", myArr);
            let filteredNfts = myArr.filter(res => {
                let nftTitle = res.title.toLowerCase();
                // console.log("nftTitle", nftTitle);
                return (
                    nftTitle.includes(text.toLowerCase())
                );
            });
            // console.log("filteredNfts", filteredNfts);
            setFilteredNfts(filteredNfts);
        } else {
            setFilteredNfts([]);
        }
    }

    const onSearch = (e): void => {
        let searchText = e.target.value;
        setSearch(searchText);
        getFilteredNfts(searchText);

    }

    // console.log("router", router);

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
                        <div className="searchformwbtn">
                            <div className="form d-flex">
                                <input className="form-control" onChange={onSearch} type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn" type="submit"><img className="img-fluid" src="/search.png" alt="" /></button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {filteredNfts && filteredNfts?.length ? (
                            filteredNfts.map((nftitem, index) => {
                                // console.warn('val', val.bannerImageURL);
                                return (
                                    <div className="col-lg-4 col-md-4 col-sm-6" key={index}>
                                        <div className="art-box bidbox">
                                            <div className="img">
                                                <Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a><img className="img-fluid" src={`${baseUrl}${nftitem.thumbnail}`} alt="" /></a></Link>
                                            </div>
                                            <div className="info">
                                                <div className="left">
                                                    <h5 className=""><Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a>{nftitem.title}</a></Link></h5>

                                                    <p>{nftitem.statusId == 1 &&
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
                                                        }</p>
                                                </div>
                                                <div className="right">
                                                    <h5><img src="/solana_color.png" alt="" />
                                                        {nftitem?.initialBid ?
                                                            <>
                                                                {nftitem?.currentBid > 0 ? <>{nftitem?.currentBid} </> : <>{nftitem?.initialBid} </>}

                                                            </> :
                                                            <>TBA </>}
                                                        SOL</h5>
                                                </div>
                                            </div>
                                            <div className="info bidnow">
                                                <div className="left">
                                                    <p>
                                                        <b>
                                                            {user?.roleTypeId == 2 && nftitem.statusId == 3 ? (<a className="cursor-pointer" onClick={() => onBidClick(`${nftitem.nftIdentifier}`, `${nftitem.auctionIdentifier}`)}>Bid Now</a>) : (<>TBA</>)}
                                                        </b>
                                                    </p>
                                                </div>
                                                <div className="right">
                                                    <p>
                                                        {nftitem?.isFavorite && <>ahd adkajsdkasj hdkjhaskjd kjahsdkjakd hkj</>}
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
                                );
                            })
                        ) : (
                            data && data?.length && !search ? (
                                data.map((nftitem, index) => {
                                    // console.warn('val', val.bannerImageURL);
                                    return (
                                        <div className="col-lg-4 col-md-4 col-sm-6" key={index}>
                                            <div className="art-box bidbox">
                                                <div className="img">
                                                    <Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a><img className="img-fluid" src={`${baseUrl}${nftitem.thumbnail}`} alt="" /></a></Link>
                                                </div>
                                                <div className="info">
                                                    <div className="left">
                                                        <h5 className=""><Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a>{nftitem.title}</a></Link></h5>

                                                        <p>{nftitem.statusId == 1 &&
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
                                                            }</p>
                                                    </div>
                                                    <div className="right">
                                                        <h5><img src="/solana_color.png" alt="" />
                                                            {nftitem?.initialBid ?
                                                                <>
                                                                    {nftitem?.currentBid > 0 ? <>{nftitem?.currentBid} </> : <>{nftitem?.initialBid} </>}

                                                                </> :
                                                                <>TBA </>}
                                                            SOL</h5>
                                                    </div>
                                                </div>
                                                <div className="info bidnow">
                                                    <div className="left">
                                                        <p>
                                                            <b>
                                                                {user?.roleTypeId == 2 && nftitem.statusId == 3 ? (<a className="cursor-pointer" onClick={() => onBidClick(`${nftitem.nftIdentifier}`, `${nftitem.auctionIdentifier}`)}>Bid Now</a>) : (<>TBA</>)}
                                                            </b>
                                                        </p>
                                                    </div>
                                                    <div className="right">
                                                        <p>
                                                            {nftitem?.isFavorite && <>ahd adkajsdkasj hdkjhaskjd kjahsdkjakd hkj</>}
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
                                    );
                                })
                            ) : null
                        )}

                        {
                            data?.length == 0 || (search && filteredNfts?.length == 0) ? <div className="alert alert-info">No NFTs to show right now!</div> : null
                        }
                    </div>

                </div>
            </section>

            {display && <BidonNFT onHide={updateDisplay} nftIdentifier={nftidt} auctionIdentifier={aucidt} />}
        </>
    );
};
