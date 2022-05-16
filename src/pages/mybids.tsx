import type { NextPage } from "next";
import Head from "next/head";
import { MyBidView } from "../views";

const MyBid: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>My Bids - Bluchip</title>
        <meta
          name="description"
          content="My Bids - Bluchip"
        />
      </Head>
      <MyBidView />
    </div>
  );
};

export default MyBid;