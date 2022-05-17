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
      <ExploreView />
    </div>
  );
};

export default Explore;
