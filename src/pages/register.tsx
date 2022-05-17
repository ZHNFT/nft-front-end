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
      <RegisterView />
    </div>
  );
};

export default Register;