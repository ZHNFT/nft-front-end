
import Link from "next/link";
import { FC, useState } from "react";

export const ProjectCardsView: FC = ({ }) => {
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12 pt-3 pb-4 mw-70">
                    <h2 className="text-center mb-4">EXPLORE COLLECTION</h2>
                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam etiam viverra tellus imperdiet. Ipsum dolor sit amet, consectetur adipiscing elit. Aliquam etiam viverra tellus imperdiet.</p>
                </div>
            </div>
        </div>
    </section>

    <section className="mb-5">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-6 ">
                    <div className="card-list">
                        
                        <div className="img">
                            <a href="#"><img src="/hands-digital-universe-background 2.png" alt="" className="img-fluid" /></a>
                        </div>
                        <div className="user_image">
                            <a href="#"><img src="/(5).png" alt="" /></a>
                            <h5><a href="#">PunkArt</a></h5>
                            <p><b><a href="">By 123Art</a></b></p>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 ">
                    <div className="card-list">
                        
                        <div className="img">
                            <a href="#"><img src="/hands-digital-universe-background 2-1.png" alt="" className="img-fluid" /></a>
                        </div>
                        <div className="user_image">
                            <a href="#"><img src="/(5).png" alt="" /></a>
                            <h5><a href="#">DigiArt</a></h5>
                            <p><b><a href="">By digi_Art124</a></b></p>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 ">
                    <div className="card-list">
                        
                        <div className="img">
                            <a href="#"><img src="/hands-digital-universe-background 2-2.png" alt="" className="img-fluid" /></a>
                        </div>
                        <div className="user_image">
                            <a href="#"><img src="/(5).png" alt="" /></a>
                            <h5><a href="#">Crypto Art</a></h5>
                            <p><b><a href="">By 3754_user</a></b></p>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};
