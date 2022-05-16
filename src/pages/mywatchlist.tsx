import type { NextPage } from "next";
import Head from "next/head";
import { MyWatchListView } from "../views";

const MyWatchList: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Watch List - Bluchip</title>
        <meta
          name="description"
          content="My watch List - Bluchip"
        />
      </Head>
      <MyWatchListView />
    </div>
  );
};

export default MyWatchList;