import type { NextPage } from "next";
import Head from "next/head";
import { ExploreView } from "../views";

const Explore: NextPage = (props) => {
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
      <ExploreView />
    </div>
  );
};

export default Explore;
