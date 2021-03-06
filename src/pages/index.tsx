import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>BluChip | Home</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="BluChip, with its experience in physical and NFT artwork, offers unique, original pieces of art with the option of swapping one for the other. Take a look now!"
        />
        <meta
          name="keywords"
          content="NFT Crypto, Buy NFT, NFT Investment, BluChip NFTs, NFT Artwork"
        />
        <meta
          name="primarykeyword"
          content="NFT Art"
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
      <HomeView />
    </div>
  );
};

export default Home;
