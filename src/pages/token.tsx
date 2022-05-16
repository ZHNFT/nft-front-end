import type { NextPage } from "next";
import Head from "next/head";
import { TokenView } from "../views";

const Token: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Bluchip</title>
        <meta
          name="description"
          content="Bluchip"
        />
      </Head>
      <TokenView />
    </div>
  );
};

export default Token;
