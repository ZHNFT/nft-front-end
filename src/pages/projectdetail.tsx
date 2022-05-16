import type { NextPage } from "next";
import Head from "next/head";
import { ProjectDetailView } from "../views";

const ProjectDetail: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Bluchip</title>
        <meta
          name="description"
          content="NFT basics"
        />
      </Head>
      <ProjectDetailView />
    </div>
  );
};

export default ProjectDetail;