import type { NextPage } from "next";
import Head from "next/head";
import { RegisterView } from "../views";

const Register: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>BluChip | Register</title>
        <meta
          name="description"
          content="Register"
        />
      </Head>
      <RegisterView />
    </div>
  );
};

export default Register;