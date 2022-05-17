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
      <MyWatchListView />
    </div>
  );
};

export default MyWatchList;