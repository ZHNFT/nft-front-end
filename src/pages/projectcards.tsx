import type { NextPage } from "next";
import Head from "next/head";
import { ProjectCardsView } from "../views";

const ProjectCards: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Project Cards - Bluchip</title>
        <meta
          name="description"
          content="NFT basics"
        />
      </Head>
      <ProjectCardsView />
    </div>
  );
};

export default ProjectCards;