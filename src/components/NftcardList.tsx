import React, { FC } from 'react'
import PropTypes from 'prop-types'
import WishComponent from './WishComponent';
import Link from 'next/link';

const NftcardList: FC = props => {
    // const data;
    
  return (
      <></>
    // <div className="row">
    //                     {data && data?.length ? (
    //                         data.map((nftitem, index) => {
    //                             // console.warn('val', val.bannerImageURL);
    //                             return (
    //                                 <div className="col-lg-4 col-md-4 col-sm-6" key={index}>
    //                                     <div className="art-box bidbox">
    //                                         <div className="img">
    //                                             <Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a><img className="img-fluid" src={`${baseUrl}${nftitem.thumbnail}`} alt="" /></a></Link>
    //                                         </div>
    //                                         <div className="info">
    //                                             <div className="left">
    //                                                 <h5 className=""><Link href={"/nftdetails?nftIdentifier=" + nftitem.nftIdentifier}><a>{nftitem.title}</a></Link></h5>
                                                    
    //                                                 <p>{nftitem.statusId == 1 &&
    //                                                             <span className="badge bg-info">
    //                                                                 {nftitem.status}
    //                                                             </span>
    //                                                         }
    //                                                         {nftitem.statusId == 2 &&
    //                                                             <span className="badge bg-warning">
    //                                                                 {nftitem.status}
    //                                                             </span>
    //                                                         }
    //                                                         {nftitem.statusId == 3 &&
    //                                                             <span className="badge bg-success">
    //                                                                 {nftitem.status}
    //                                                             </span>
    //                                                         }
    //                                                         {nftitem.statusId == 4 &&
    //                                                             <span className="badge bg-dark">
    //                                                                 {nftitem.status}
    //                                                             </span>
    //                                                         }
    //                                                         {nftitem.statusId == 5 &&
    //                                                             <span className="badge bg-primary">
    //                                                                 {nftitem.status}
    //                                                             </span>
    //                                                         }</p>
    //                                             </div>
    //                                             {/* <div className="right">
    //                                                 <h5><img src="/solana_color.png" alt="" /> 43 SOL</h5>
    //                                             </div> */}
    //                                         </div>
    //                                         <div className="info bidnow">
    //                                             <div className="left">
    //                                                 <p>
    //                                                     <b>
    //                                                         {user?.roleTypeId == 2 && nftitem.statusId == 3 ? (<a className="" onClick={() => onBidClick(`${nftitem.nftIdentifier}`, `${nftitem.auctionIdentifier}`)}>Bid Now</a>) : (<>TBA</>)}
    //                                                     </b>
    //                                                 </p>
    //                                             </div>
    //                                             <div className="right">
    //                                                 <p>
    //                                                     <WishComponent nftIdentifier={nftitem?.nftIdentifier} isFavorite={nftitem?.isFavorite} wishedCount={nftitem.wishedCount} />
    //                                                     {/* {user?.roleTypeId == 2 ? 
    //                                                         <a className="cursor-pointer" onClick={onWishClick}>
    //                                                             {wish ? <img src="/heart.png" alt="" /> : <img src="/heart-o.png" alt="" />}
    //                                                         </a> :
    //                                                         <img src="/heart-o.png" alt="" />
    //                                                     }
    //                                                     <b>{nftitem.wishedCount}</b> */}
    //                                                 </p>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             );
    //                         })
    //                     ) : (
    //                                 <div className="alert alert-info">No NFTs to show right now!</div>
    //                     )}
                        
    //                 </div>
  )
}

NftcardList.propTypes = {

}

export default NftcardList
