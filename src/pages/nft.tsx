import type { NextPage } from "next";
import Head from "next/head";
import { NFTView } from "../views";

const NFT: NextPage = (props) => {
  // const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Head>
        <title>BluChip | NFT List</title>
        <meta
          name="description"
          content="NFT List"
        />
      </Head>
      <NFTView />
    </div>
  );
};

export default NFT;
