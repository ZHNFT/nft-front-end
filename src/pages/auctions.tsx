import type { NextPage } from "next";
import Head from "next/head";
import { AuctionsView } from "../views";
import { userService } from "services";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";

const Auctions: NextPage = (props) => {
  // const user = userService.userValue;
  // const {publicKey} = useWallet();
  // const router = useRouter();
  //   if(publicKey) {
  //       //router.back();
  //       // console.log(user.accessToken);
  //   } else {
  //       router.push('/');
  //   }
  return (
    <div>
      <Head>
        <title>Auction - BluChip</title>
        <meta
          name="description"
          content="Auction"
        />
      </Head>
      <AuctionsView />
    </div>
  );
};

export default Auctions;