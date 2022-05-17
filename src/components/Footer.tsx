import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { FC } from 'react';
import PdfViewer from '../components/Pdf-viewer'

export const Footer: FC = () => {
    const { publicKey, sendTransaction } = useWallet();
    const d = new Date();
    let year = d.getFullYear();
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-md-4">
                            <img className="img-fluid footer-logo" src="/logo.png" alt="" />
                            <h6>BluChip - Let's Socialize</h6>
                            <p>BluChip is a Solana-based platform that helps artists, traders, investors, and collectors to meet in one place and get the most out of their NFTs. Get in touch with us through any of the following social media platforms to learn and grow together:</p>
                            <ul className="social">
                                {/* <li><a href="https://facebook.com" target="_blank"><img className="img-fluid" src="/fb.png" alt="" /></a></li> */}
                                <li><a href="https://twitter.com/BluChip_NFT" target="_blank"><img className="img-fluid" src="/twitter-line.png" alt="" /></a></li>
                                <li><a href="https://www.instagram.com/BluChip_NFT/" target="_blank"><img className="img-fluid" src="/instagram-line.png" alt="" /></a></li>
                                <li><a href="https://www.linkedin.com/groups/14062137/" target="_blank"><img className="img-fluid" src="/linkedin.png" alt="" /></a></li>
                            </ul>
                            <p>BluChip is a division of ArtCoins International — Duns # 118677567</p>

                        </div>

                        {/* <!-- Modal --> */}
                        <div className="modal" id="pressRelease" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content" style={{ width: '200%' }}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Press Release</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <PdfViewer />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="footermenu">
                                <div className="menu">
                                    <h6>Market Place</h6>
                                    <ul>
                                        <li><Link href="/explore"><a>All NFTs</a></Link></li>
                                        <li><Link href="/explore"><a>New</a></Link></li>
                                        <li><a data-bs-toggle="modal" data-bs-target="#pressRelease">Press Release</a></li>
                                    </ul>
                                </div>
                                <div className="menu">
                                    {publicKey &&
                                        <>
                                            <h6>My Account</h6>
                                            <ul>
                                                <li><Link href="/profile"><a>Profile</a></Link></li>
                                                <li><Link href="/mybids"><a>My Bids</a></Link></li>
                                                <li><Link href="/mywatchlist"><a>My Watchlist</a></Link></li>
                                                {/* <li><a href="#">Settings</a></li> */}
                                            </ul>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-4">
                            <h6>Stay in the Loop</h6>
                            <p>Want to get regular updates on NFT art and the latest trends in the market? Keep tabs by subscribing to our newsletter now!</p>
                            <NewsLetters />
                        </div> */}
                    </div>
                </div>
            </footer>
            <div className="footer copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="text-md-start text-center"> Copyright © {year} BluChip. All Rights Reserved. </p>
                        </div>
                        <div className="col-md-6 text-end">
                            <p className="text-md-end text-center"><Link href="/termsandconditions"><a>Terms & Conditions</a></Link> | <a href="#" data-bs-toggle="modal" data-bs-target="#pressRelease">Press Release</a> | <Link href="/privacypolicy"><a>Privacy Policy</a></Link> | <Link href="/contactus"><a>Contact Us</a></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
