import type { NextPage } from "next";
import Head from "next/head";
import { LoginView } from "../views";
import { userService } from "services";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";

const Login: NextPage = (props) => {
  // const user = userService.userValue;
  // const {publicKey} = useWallet();
  // const router = useRouter();
  //   if(publicKey) {
  //       //router.back();
  //       // console.log(user.accessToken);
  //   } else {
  //       router.push('/');
  //   }
  return (
    <div>
      <Head>
        <title>BluChip | Login</title>
        <meta
          name="description"
          content="Login"
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
      <LoginView />
    </div>
  );
};

export default Login;