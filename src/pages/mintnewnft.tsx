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
      <MintNewNFTView />
    </div>
  );
};

export default MintNewNFT;