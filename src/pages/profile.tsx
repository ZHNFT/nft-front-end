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
      <ProfileView />
    </div>
  );
};

export default Profile;