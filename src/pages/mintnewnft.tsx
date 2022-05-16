import type { NextPage } from "next";
import Head from "next/head";
import { MintNewNFTView } from "../views";

const MintNewNFT: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Mint NFT - Bluchip</title>
        <meta
          name="description"
          content="NFT basics"
        />
      </Head>
      <MintNewNFTView />
    </div>
  );
};

export default MintNewNFT;