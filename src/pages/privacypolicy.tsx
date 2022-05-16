import type { NextPage } from "next";
import Head from "next/head";
import { PrivacyPolicyView } from "../views";

const PrivacyPolicy: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>BluChip | privacy Policy</title>
        <meta
          name="description"
          content="NFT basics"
        />
      </Head>
      <PrivacyPolicyView />
    </div>
  );
};

export default PrivacyPolicy;