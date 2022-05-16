
import Link from "next/link";
import { FC, useState } from "react";

export const SearchView: FC = ({ }) => {
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12 pt-3 pb-4 mw-70">
                    <h2 className="text-center mb-4">sEARCH rESULTS FOR <br />dIGITAL ART</h2>
                </div>
            </div>
        </div>
    </section>
    <section className="mb-5">
        <div className="container">
            <div className="btn-group nav nav-tabs nav-pills nav-justified  mb-md-5 mb-sm-3 mb-3" id="myTab" role="tablist">
                {/* <a className="btn btn-dark btn-outline-dark nav-link " data-bs-toggle="list" href="#Store" role="tab">Store</a> */}
                <a className="btn btn-dark btn-outline-dark nav-link active" data-bs-toggle="list" href="#NFT" role="tab">NFT</a>
            </div>
            <div className="tab-content">
                <div className="tab-pane " id="Store" role="tabpanel">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 ">
                            <div className="card-list">
                                <div className="img">
                                    <a href="#"><img src="/hands-digital-universe-background 2.png" alt="" className="img-fluid" /></a>
                                </div>
                                <div className="user_image">
                                    <a href="#"><a href="#"><img src="/(5).png" alt="" /></a></a>
                                    <h5><a href="#">P2unkArt</a></h5>
                                    <p><b><a href="#">By 123Art</a></b></p>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 ">
                            <div className="card-list">
                                <div className="img">
                                    <a href="#"><a href="#"><img src="/hands-digital-universe-background 2-1.png" alt="" className="img-fluid" /></a></a>
                                </div>
                                <div className="user_image">
                                    <a href="#"><a href="#"><img src="/(4).png" alt="" /></a></a>
                                    <h5><a href="#">DigiArt</a></h5>
                                    <p><b><a href="#">By digi_Art124</a></b></p>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 ">
                            <div className="card-list">
                                <div className="img">
                                    <a href="#"><a href="#"><img src="/hands-digital-universe-background 2-2.png" alt="" className="img-fluid" /></a></a>
                                </div>
                                <div className="user_image">
                                    <a href="#"><a href="#"><img src="/(28).png" alt="" /></a></a>
                                    <h5><a href="#">Crypto Art</a></h5>
                                    <p><b><a href="#">By 3754_user</a></b></p>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane active" id="NFT" role="tabpanel">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="art-box bidbox">
                                <div className="img">
                                    <Link href="/nftdetails"><a><img src="/Rectangle 315.png" alt="" className="img-fluid" /></a></Link>
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
                                        <p><b><Link href="/nftdetails"><a>Bid Now</a></Link></b></p>
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
                                    <Link href="/nftdetails"><a><img src="/Rectangle 315.png" alt="" className="img-fluid" /></a></Link>
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
                                        <p><b><Link href="/nftdetails"><a>Bid Now</a></Link></b></p>
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
                                    <Link href="/nftdetails"><a><img src="/Rectangle 315.png" alt="" className="img-fluid" /></a></Link>
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
                                        <p><b><Link href="/nftdetails"><a>Bid Now</a></Link></b></p>
                                    </div>
                                    <div className="right">
                                        <p><a href="#"><img src="/heart.png" alt="" /></a> <b>03</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};
