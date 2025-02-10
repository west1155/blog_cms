import React from 'react';
import Head from "next/head";


type PropsType = {
    className?: string;
}
export const Header = ({className}: PropsType) => {
    return (
            <Head>
                <title>CMS Blog</title>
                <link rel="icon" href={'/favicon.ico'} />
                <meta name="description" content="nextjs graphql blog" />
            </Head>
    );
};
