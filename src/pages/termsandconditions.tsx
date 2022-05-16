import type { NextPage } from "next";
import Head from "next/head";
import { TermsAndConditionsView } from "../views";

const TermsAndConditions: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>BluChip | Terms and Conditions</title>
        <meta
          name="description"
          content="Bluchip"
        />
      </Head>
      <TermsAndConditionsView />
    </div>
  );
};

export default TermsAndConditions;