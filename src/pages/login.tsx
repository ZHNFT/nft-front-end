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
      </Head>
      <LoginView />
    </div>
  );
};

export default Login;