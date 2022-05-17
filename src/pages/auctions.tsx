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
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10903103181"></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-10903103181', {
page_path: window.location.pathname,
});
`,
          }}
        />

      </Head>
      <AuctionsView />
    </div>
  );
};

export default Auctions;