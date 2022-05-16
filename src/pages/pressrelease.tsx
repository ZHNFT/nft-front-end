import type { NextPage } from "next";
import Head from "next/head";
import { PressRelaseView } from "../views";

const PressRelase: NextPage = (props) => {
    return (
        <div>
            <Head>
                <title>BluChip | Press Release</title>
                <meta
                    name="description"
                    content="NFT basics"
                />
            </Head>
            <PressRelaseView />
        </div>
    );
};

export default PressRelase;