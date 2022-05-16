import type { NextPage } from "next";
import Head from "next/head";
import { ProfileView } from "../views";

const Profile: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Profile - BluChip</title>
        <meta
          name="description"
          content="NFT basics"
        />
      </Head>
      <ProfileView />
    </div>
  );
};

export default Profile;