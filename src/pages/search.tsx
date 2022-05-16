import type { NextPage } from "next";
import Head from "next/head";
import { SearchView } from "../views";

const Search: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Bluchip</title>
        <meta
          name="description"
          content="Bluchip"
        />
      </Head>
      <SearchView />
    </div>
  );
};

export default Search;