import type { NextPage } from "next";
import Head from "next/head";
import { AnnounceAuctionView } from "../views";

const AnnounceAuction: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Announce Auction - Bluchip</title>
        <meta
          name="description"
          content="Announce Auction"
        />
      </Head>
      <AnnounceAuctionView />
    </div>
  );
};

export default AnnounceAuction;