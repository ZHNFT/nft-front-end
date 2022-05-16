// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';


// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { NewsLetters } from 'components/NewsLetters';


//Font Awesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSearch,
//   faAmbulance,
//   faAnchor,
// } from "@fortawesome/free-solid-svg-icons";

export const HomeView: FC = ({ }) => {
    const wallet = useWallet();
    const { connection } = useConnection();

    const balance = useUserSOLBalanceStore((s) => s.balance)
    const { getUserSOLBalance } = useUserSOLBalanceStore()

    const [edntime, setEndTime] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        const target = new Date("03/30/2022 23:59:59")

        const interval = setInterval(() => {
            const now = new Date()
            const difference = target.getTime() - now.getTime()

            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            setDays(d);

            const h = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            setHours(h);

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            setMinutes(m);

            const s = Math.floor((difference % (1000 * 60)) / 1000);
            setSeconds(s);
            if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
                setEndTime(true)
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if (wallet.publicKey) {
            // console.log(wallet.publicKey.toBase58())
            getUserSOLBalance(wallet.publicKey, connection)
        }
    }, [wallet.publicKey, connection, getUserSOLBalance])

    return (
        <>
            {/* <FontAwesomeIcon
        icon={faSearch}
        style={{ fontSize: 100, color: "blue" }}
      />

      <FontAwesomeIcon
        icon={faAmbulance}
        style={{ fontSize: 100, color: "orange" }}
      />

      <FontAwesomeIcon
        icon={faAnchor}
        style={{ fontSize: 100, color: "green" }}
      /> */}
            <section className="mainsection">
                <div className="container">
                    <div className="row">
                        <div className="com-md-12">
                            <h1>Welcome to the Premier BluChip NFT Marketplace!</h1>
                        </div>
                        <div className="col-md-8">

                            <p>Ever Heard of Swappable NFTs?</p>
                            <p>Get exclusive access to Investment-grade NFTs of real blue-chip artwork which has a unique option to swap the digital NFT for the actual sought-after blue-chip original. Our NFTs have an embedded redemption claim enabling you to exchange your NFT for the actual physical artwork — guaranteed by a blockchain SmartContract!</p>
                            <p>Museum-grade, blue-chip art is difficult to obtain and typically reserved for the top art collectors of the world. Our BluChip NFT Marketplace is one of the biggest, most-trusted platforms through which you can bid on and obtain auctioned NFTs of renowned artists such as Banksy, Basquiat, Haring and more!</p>
                            <p>BluChip NFTs are on the forefront to create unique provably-scarce tokens of actual museum-grade art. Each artwork is linked to your NFT by its blockchain SmartContract with the artwork’s provenance and a Certificate of Authenticity [COA] to those who have a desire to obtain collectible digital NFTs or swap the NFT for the actual original artwork. With our experience in both physical and digital art, we've curated and precisely digitized an impressive museum collection of original works of blue-chip art that took over 70 years to obtain.</p>
                            <p>With decades of curatorial experience, we’ve now bridged two asset classes; the Fine Art Asset Class and the emerging NFT Digital Asset Class. This gives savvy collectors the choice to obtain and own either the NFT or actual museum-quality BluChip masterworks. Explore our collection now and get a chance to join the latest innovation in art collecting for tech-savvy traders, investors, and collectors.</p>
                            <Link href="/explore"><a className="btn btn-dark">Explore Now</a></Link>
                            <div className="row">
                                <div className="col-md-12">
                                    <ul>
                                        <li>
                                            30M+
                                            <small>Worth Artwork</small>
                                        </li>
                                        <li>
                                            1
                                            <small>Auction</small>
                                        </li>
                                        <li>
                                            Only 1
                                            <small>Artist</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">

                            <div className="nft-card">


                                <div className="nft-data">
                                    <div className="top">
                                        <h4 className='nftcardtophead'><a >Wicked Trumpet Player Banksy</a></h4>
                                        {/* <div className="user">
                                    <a ><img src="/(11).png" className="img-fluid" alt="" />
                                    Arkhan17</a>
                                </div> */}
                                    </div>
                                    <div className="middle">
                                        <a ><img src="/nfts/Wicked-Trumpet-Player-Banksy.jpg" alt="" /></a>
                                    </div>
                                    <div className="bottom">
                                        <div className="toprow">
                                            <div className="left">Initial Bid
                                            </div>
                                            <div className="right">
                                                Auction Start
                                            </div>
                                        </div>
                                        <div className="bottomrow">
                                            <div className="left">
                                                <img src="/solana_color.png" alt="" />  TBA SOL
                                            </div>
                                            <div className="right">
                                                {edntime ? (
                                                    <>
                                                        TBA
                                                    </>
                                                ) : (
                                                    <>
                                                        {days}d {hours}h {minutes}m {seconds}s
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom HTML start  */}
            <section className="cta1">
                <div className="container">
                    <div className="row align-items-center ">
                        <div className="col-md-6 col-sm-12 text-center">
                            <a ><img className="img-fluid" src="/Protocol=Solana, Shadow=FALSE.png" alt="" /></a>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <h2>Solana — The World’s Most Powerful Digital Asset Price Discovery Engine</h2>
                            <p>Solana is the fastest blockchain in the world and the fastest growing ecosystem in crypto. Solana’s innovation of implementing Proof of History on a decentralized blockchain and ultra fast transaction throughout speeds have made this blockchain the ultimate choice for our platform. BluChip Marketplace features swappable NFT claim codified in each SmartContract.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="toparts">
                <div className="container ">
                    <div className="row ">
                        <div className="col-md-12 ">
                            <h2 className="text-center">Exclusive BluChip NFTs — An Emerging Asset Class You Want to Own</h2>
                            <p className="text-center">NFT investments are at an all-time high because they guarantee unique and verifiable ownership rights to the original art created by world-famous artists and help savvy art collectors maintain and even increase the value of the NFT owned by them. Our BluChip Marketplace prides itself in offering some of the highest value artwork from different corners of the world entrusted to us for exclusive minting of NFTs on our platform backed by the Solana Blockchain. Take a look at some of our featured, high-demand NFTs that have granted us more than a few bragging rights:</p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-6 col-sm-12 col-lg-5">
                            <div className="artbox">
                                <div className="img">
                                    <Link href="/"><a><img className="img-fluid" src="/nfts/Stik-Love.jpg" /></a></Link>
                                </div>
                                <div className="info">
                                    <div className="left">
                                        <div className="titlenstock">
                                            <h5><a >Stik Love</a></h5>
                                            <p>Auction Start:  TBA</p>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <p>Initial Bid</p>
                                        <p><img className="img-fluid" src="/sol.png" alt="" /> TBA SOL</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 col-lg-7">
                            <div className="artlisting">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="artlist-item">
                                            <div className="img">
                                                <Link href="/"><a><img className="img-fluid" src="/nfts/King-Robo.jpg" alt="" /></a></Link>
                                            </div>
                                            <div className="info">
                                                <h5><Link href="/"><a>King Robbo</a></Link></h5>
                                                <div className="user-eth">
                                                    {/* <div className="img">
                                                <a ><img className="img-fluid" src="/(12).png" alt="" /></a>
                                            </div> */}
                                                    <div className="eth">
                                                        <img className="img-fluid" src="/solana_green.png" alt="" /> TBA SOL
                                                    </div>
                                                    {/* <div className="of">
                                                1 of 8
                                            </div> */}
                                                </div>
                                                <a className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Coming Soon</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="artlist-item">
                                            <div className="img">
                                                <Link href="/"><a><img className="img-fluid" src="/nfts/Jean-Michel-Basquiat_Side_1.jpg" alt="" /></a></Link>
                                            </div>
                                            <div className="info">
                                                <h5><Link href="/"><a>Jean Michel Basquiat - Side 1</a></Link></h5>
                                                <div className="user-eth">
                                                    {/* <div className="img">
                                                <a ><img className="img-fluid" src="/(10).png" alt="" /></a>
                                            </div> */}
                                                    <div className="eth">
                                                        <img className="img-fluid" src="/solana_green.png" alt="" /> TBA SOL
                                                    </div>
                                                    {/* <div className="of">
                                                1 of 8
                                            </div> */}
                                                </div>
                                                <a className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Coming Soon</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="artlist-item">
                                            <div className="img">
                                                <Link href="/"><a><img className="img-fluid" src="/nfts/Jean-Michel-Basquiat_Side_2.jpg" alt="" /></a></Link>
                                            </div>
                                            <div className="info">
                                                <h5><Link href="/"><a>Jean Michel Basquiat - Side 2</a></Link></h5>
                                                <div className="user-eth">
                                                    {/* <div className="img">
                                                <a ><img className="img-fluid" src="/(10).png" alt="" /></a>
                                            </div> */}
                                                    <div className="eth">
                                                        <img className="img-fluid" src="/solana_green.png" alt="" /> TBA SOL
                                                    </div>
                                                    {/* <div className="of">
                                                1 of 8
                                            </div> */}
                                                </div>
                                                <a className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Coming Soon</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="artlist-item">
                                            <div className="img">
                                                <Link href="/"><a><img className="img-fluid" src="/nfts/Banksy.jpg" alt="" /></a></Link>
                                            </div>
                                            <div className="info">
                                                <h5><Link href="/"><a>Banksy</a></Link></h5>
                                                <div className="user-eth">
                                                    {/* <div className="img">
                                                <a ><img className="img-fluid" src="/(10).png" alt="" /></a>
                                            </div> */}
                                                    <div className="eth">
                                                        <img className="img-fluid" src="/solana_green.png" alt="" /> TBA SOL
                                                    </div>
                                                    {/* <div className="of">
                                                1 of 8
                                            </div> */}
                                                </div>
                                                <a className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Coming Soon</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            </div>
                        </div>
                        {/* <div className="col-md-6 col-sm-12 col-lg-4 ps-5 pl-md-0">
                    <h3>Top Collections over </h3>
                    <h6>Last 7 days</h6>
                    <div className="table-listing">
                        <table className="table table-hover">
                            <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    <div className="info">
                                        <a ><img className="img-fluid" src="/(28).png" alt="" /></a>
                                        <div className="sep">
                                            <h6><a >CryptoFunks</a></h6>
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 19,769.39
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="vol green">
                                        +26.52%
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    2
                                </td>
                                <td>
                                    <div className="info">
                                        <a ><img className="img-fluid" src="/(27).png" alt="" /></a>
                                        <div className="sep">
                                            <h6><a >Cryptix</a></h6>
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 2,769.39
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="vol red">
                                        +10.52%
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    3
                                </td>
                                <td>
                                    <div className="info">
                                        <a ><img className="img-fluid" src="/unsplash_5MTf9XyVVgM.png" alt="" /></a>
                                        <div className="sep">
                                            <h6><a >Frensware</a></h6>
                                            <img className="img-fluid" src="/solana_color.png" alt="" /> 9,232.39
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="vol green">
                                        +2.52%
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    4
                                </td>
                                <td>
                                    <div className="info">
                                        <a ><img className="img-fluid" src="/(5).png" alt=""/></a>
                                        <div className="sep">
                                            <h6><a >PunkArt</a></h6>
                                            <img className="img-fluid" src="/solana_color.png" alt=""/> 3,769.39
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="vol green">
                                        +1.52%
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    5
                                </td>
                                <td>
                                    <div className="info">
                                        <a ><img className="img-fluid" src="/(4).png" alt=""/></a>
                                        <div className="sep">
                                            <h6><a >Art Crypto</a></h6>
                                            <img className="img-fluid" src="/solana_color.png" alt=""/> 10,769.39
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="vol red">
                                        +2.52%
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div> */}
                    </div>
                </div>
            </section>
            {/* <section className="f-projects">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Projects Featured NFTs</h2>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="project-box">
                        <div className="images">
                            <div className="img">
                                <Link href="/nftdetails"><a><img className="img-fluid" src="/(23).png"/></a></Link>
                            </div>
                            <div className="imgs">
                                <Link href="/nftdetails"><a><img className="img-fluid" src="/(1).png" alt=""/></a></Link>
                                <Link href="/nftdetails"><a><img className="img-fluid" src="/(29).png" alt=""/></a></Link>
                                <Link href="/nftdetails"><a><img className="img-fluid" src="/(20).png" alt=""/> <span className="count">+5 </span></a></Link>
                            </div>
                        </div>
                        <div className="info">
                            <h5><a >Amazing Collection</a></h5>
                            <div className="user">
                                <a ><img className="img-fluid" src="/(10).png" alt=""/> by Arkhan</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="project-box">
                        <div className="images">
                            <div className="img">
                                <a ><img className="img-fluid" src="/(25).png"/></a>
                            </div>
                            <div className="imgs">
                                <a ><img className="img-fluid" src="/(2).png" alt=""/></a>
                                <a ><img className="img-fluid" src="/(30).png" alt="" /></a>
                                <a ><img className="img-fluid" src="/(21).png" alt="" /> <span className="count">+9 </span></a>
                            </div>
                        </div>
                        <div className="info">
                            <h5><a >Amazing Collection</a></h5>
                            <div className="user">
                                <a ><img className="img-fluid" src="/(10).png" alt="" /> by Arkhan</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="project-box">
                        <div className="images">
                            <div className="img">
                                <a ><img className="img-fluid" src="/(26).png" /></a>
                            </div>
                            <div className="imgs">
                                <a ><img className="img-fluid" src="/(3).png" alt="" /></a>
                                <a ><img className="img-fluid" src="/0.1.png" alt="" /></a>
                                <a ><img className="img-fluid" src="/(22).png" alt="" /> <span className="count">+3 </span></a>
                            </div>
                        </div>
                        <div className="info">
                            <h5><a >Amazing Collection</a></h5>
                            <div className="user">
                                <a ><img className="img-fluid" src="/(10).png" alt="" /> by Arkhan</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <a  className="btn btn-dark">View All</a>
                </div>
            </div>
        </div>
    </section> */}
            <section className="secure">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">

                            <p>50% of the profits from this NFT sale will be donated to ARTification, a free art program for residents of Charles Hocking House and the surrounding area of Hockney.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="secure">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2>Your Security Is Our Priority</h2>
                            <p>NFTs opened the floodgates to create a scarcity of digital goods for the first time. However, that's not all that NFTs have done. Through the same blockchain technology that is used for cryptocurrency, NFTs come with a unique code that can't be copied or exchanged. Once you buy NFTs, you get the sole ownership of the original artwork created by artists and the option of swapping it with the physical BluChip artwork. With each transaction on an NFT, a new, unique code is generated, so there are no chances of two people ever owning or even knowing the same code.</p>
                            <p>We have emphasized that this security element of NFTs stays intact regardless of the number of transactions on a single piece of art. NFTs on BluChip are copyrighted by original artists, and the built-in authentication makes it difficult for third parties to breach our system.</p>
                        </div>
                        <div className="col-md-6">
                            <img className="img-fluid" src="/(16).png" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="cta2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2>Jump on the Bandwagon <br /> of Innovation & Growth</h2>
                        </div>
                        <div className="col-md-3">
                            <img className="img-fluid" src="/(9).png" alt="" />
                            <h5>Transparency</h5>
                            <p>
                                BluChip knows the importance of transparency and authenticity in the art world, both digital and physical. At any given time, you can swap the digital artwork for the physical one and vice versa. We guarantee transparent trading processes for all the original art pieces on our platform.
                            </p>
                        </div>
                        <div className="col-md-3">
                            <img className="img-fluid" src="/(6).png" alt="" />
                            <h5>Auction</h5>
                            <p>
                                Our auction process is incredibly seamless, and we only use Solana as our primary blockchain for all transactions of digital art. Your currency and bids are highly secured, courtesy of Solana and the additional security measures we've adapted.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Stay in the Loop</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Want to get regular updates on NFT art and the latest trends in the market? Keep tabs by subscribing to our newsletter now!</p>
                            <NewsLetters />
                        </div>
                        {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                    sldkjflsdk fjljk
                </div> */}
                    </div>
                </div>
            </div>
            {/* Custom HTML end */}

        </>


    );
};
