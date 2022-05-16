import type { NextPage } from "next";
import Head from "next/head";
import { ContactUsView } from "../views";

const ContactUs: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="NFT basics"
        />
      </Head>
      <ContactUsView />
    </div>
  );
};

export default ContactUs;