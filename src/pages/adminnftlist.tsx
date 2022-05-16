import type { NextPage } from "next";
import Head from "next/head";
import { AdminNftListView } from "../views";

const AdminNftList: NextPage = (props) => {
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
      <AdminNftListView />
    </div>
  );
};

export default AdminNftList;
