
import Link from "next/link";
import { FC, useState } from "react";

export const ProjectDetailView: FC = ({ }) => {
  return (
    <>
    <section className="cover_banner">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="banner_upload">
                        <img src="/hands-digital-universe-background 1.png" className="cover-image img-fluid" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div className="fav-actions-container container">
            <div className="row">
                <div className="col-md-12">
                    <div className="user_profile">
                        <div className="user_image">
                            <img src="/Ellipse-96.png" alt="" />
                        </div>
                        <h2 className="mb-4">PunkArt</h2>
                        <p className="mw-700 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </div>
            <div className="fav-actions row align-items-center">
                <div className="col-md-6">
                    <a href="#" className="btn btn-sm btn-outline-dark"> <img src="/heart-o.png" alt="" className="" /> Add to Favourites</a>
                </div>
                <div className="col-md-6">
                    <div className="btn-group">
                        <button className="btn btn-sm btn-outline-dark"><img src="/discord-line.png" alt="" /></button>
                        <button className="btn btn-sm btn-outline-dark"><img src="/twitter-line.png" alt="" /></button>
                        <button className="btn btn-sm btn-outline-dark"><img src="/instagram-line.png" alt="" /></button>
                        <button className="btn btn-sm btn-outline-dark dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img src="/dots-v.png" alt="" /></button>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <ul className="btns">
                    <li>
                        <a href="#">5.0K <br />
                            <p>Items</p>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/solana_color.png" alt="" /> --- <br />
                            <p>Floor Price</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <section >
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="filterbar">
                    <div className="searchformwbtn">
                        <div className="form d-flex">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn" type="submit"><img src="/search.png" alt="" /></button>
                        </div>
                    </div>
                    <select className="form-select form-control" name="" id="">
                        <option value="">Price: Low to High</option>
                        <option value="">Price: High to Low</option>
                    </select>
                    <select className="form-select form-control" name="" id="">
                        <option value="">Price: Low to High</option>
                        <option value="">Price: High to Low</option>
                    </select>
                    <button className="btn btn-dark"><img src="/filter-line.png" alt="" /></button>
                </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};
