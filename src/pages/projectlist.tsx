import type { NextPage } from "next";
import Head from "next/head";
import { ProjectListView } from "../views";

const ProjectList: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Bluchip</title>
        <meta
          name="description"
          content="Bluchip"
        />
      </Head>
      <ProjectListView />
    </div>
  );
};

export default ProjectList;