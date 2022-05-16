import type { NextPage } from "next";
import Head from "next/head";
import { NFTDetailsView } from "../views";

const NFTDetails: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>BluChip | NFT Detail</title>
        <meta
          name="description"
          content="NFT Detail Page"
        />
      </Head>
      <NFTDetailsView />
    </div>
  );
};

export default NFTDetails;