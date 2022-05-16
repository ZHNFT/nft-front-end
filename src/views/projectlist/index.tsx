
import Link from "next/link";
import { FC, useState } from "react";

export const ProjectListView: FC = ({ }) => {
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12 pt-3 pb-5 mw-70">
                    <h2 className="text-center">PROJECT LIST</h2>
                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam etiam viverra tellus imperdiet. Ipsum dolor sit amet, consectetur adipiscing elit. Aliquam etiam viverra tellus imperdiet.</p>
                </div>
            </div>
        </div>
    </section>
    <section className="toparts">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="table-listing nft-proj-listings">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td className="text-start">Project Title</td>
                                    <td>Volume</td>
                                    <td>Floor Price</td>
                                    <td>Whishlist</td>
                                    <td>Items</td>
                                    <td>Social</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row" data-label="# Project">
                                        1
                                    </td>
                                    <td data-label="Project Title">
                                        <div className="info">
                                            <a href="#"><img className="img-fluid" src="/(28).png" alt="" /></a>
                                            <div className="sep">
                                                <h6><a href="#">CryptoFunks</a></h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-label="Volume">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Floor Price">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Whishlist">
                                        11
                                    </td>
                                    <td data-label="Items">
                                        5.0K
                                    </td>
                                    <td data-label="Social">
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-outline-dark"><img src="/discord-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/twitter-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/instagram-line.png" alt="" /></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="# Project">
                                        2
                                    </td>
                                    <td data-label="Project Title">
                                    <div className="info">
                                        <a href="#"><img className="img-fluid" src="/(27).png" alt="" /></a>
                                        <div className="sep">
                                            <h6><a href="#">Cryptix</a></h6>
                                            
                                        </div>
                                    </div>
                                </td>
                                    <td data-label="Volume">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Floor Price">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Whishlist">
                                        11
                                    </td>
                                    <td data-label="Items">
                                        5.0K
                                    </td>
                                    <td data-label="Social">
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-outline-dark"><img src="/discord-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/twitter-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/instagram-line.png" alt="" /></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="# Project">
                                        3
                                    </td>
                                    <td data-label="Project Title">
                                        <div className="info">
                                            <a href="#"><img className="img-fluid" src="/unsplash_5MTf9XyVVgM.png" alt="" /></a>
                                            <div className="sep">
                                                <h6><a href="#">Frensware</a></h6>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td data-label="Volume">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Floor Price">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Whishlist">
                                        11
                                    </td>
                                    <td data-label="Items">
                                        5.0K
                                    </td>
                                    <td data-label="Social">
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-outline-dark"><img src="/discord-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/twitter-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/instagram-line.png" alt="" /></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="# Project">
                                        4
                                    </td>
                                    <td data-label="Project Title">
                                        <div className="info">
                                            <a href="#"><img className="img-fluid" src="/(5).png" alt="" /></a>
                                            <div className="sep">
                                                <h6><a href="#">PunkArt</a></h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-label="Volume">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Floor Price">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Whishlist"> 
                                        11
                                    </td >
                                    <td data-label="Items">
                                        5.0K
                                    </td>
                                    <td data-label="Social">
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-outline-dark"><img src="/discord-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/twitter-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/instagram-line.png" alt="" /></button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" data-label="# Project">
                                        5
                                    </td>
                                    <td data-label="Project Title">
                                        <div className="info">
                                            <a href="#"><img className="img-fluid" src="/(4).png" alt="" /></a>
                                            <div className="sep">
                                                <h6><a href="#">Art Crypto</a></h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-label="Volume">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Floor Price">
                                        <div className="sep">
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </td>
                                    <td data-label="Whishlist">
                                        11
                                    </td>
                                    <td data-label="Items">
                                        5.0K
                                    </td>
                                    <td data-label="Social">
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-outline-dark"><img src="/discord-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/twitter-line.png" alt="" /></button>
                                            <button className="btn btn-sm btn-outline-dark"><img src="/instagram-line.png" alt="" /></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
};
