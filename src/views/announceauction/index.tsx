import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { userService } from "services";
import moment from 'moment';
import BidListOnNFT from "components/BidListOnNFT";
import { notify } from "utils/notifications";

interface bidlist {
    trxId: string
    trxExplorerUrl: string
    bidAmount: number
    bidDate: string
}

export const AnnounceAuctionView: FC = ({ }) => {
    const baseUrl = process.env.BASE_URL;
    const router = useRouter();
    const nftIdt = router.query.identity;
    const auctionIdt = router.query.auctionIdentifier;
    const [loading, setLoading ] = useState(false)

    const userdata = userService.getUser();
    // console.log(userdata);
    // console.log(nftIdt, auctionIdt);
    const onClick = () => {
        setLoading(true)
        userService.setWinner(nftIdt).then((x) => {
            // console.log(x)
            if(x.data) {
                notify({type: 'success', message: "Winner Announced"});
                router.push(`/nftdetails?nftIdentifier=${nftIdt}`);
            } else {
                setLoading(false)
                notify({type: 'error', message: `${x.message}`});
            }
        });
    }

    useEffect(() => {
        if(userdata && userdata?.roleTypeId === 1) {
        } else {
            router.push("/")
        }
    }, []);

    // useEffect(() => {
    //     userService.getNFTBids(nftIdentifier, auctionIdentifier).then(x => setBidList(x.data));
    // }, []);
  
    // console.log(bidlist);
  return (
    <>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12 pt-3 pb-4 mw-70">
                    <h2 className="text-center mb-4">Announce Winner</h2>
                </div>
            </div>
        </div>
    </section>
    <section className="mb-5">
        <div className="container">
            <div className="text-center">
                <button className="btn btn-dark btn-lg" onClick={onClick}>
                {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Announce Winner
                    </button>
            </div>
        </div>
        <div className="container mt-3">
            <BidListOnNFT nftIdentifier={nftIdt as string} auctionIdentifier={auctionIdt as string} status={0} />
        </div>
    </section>
    </>
  );
};