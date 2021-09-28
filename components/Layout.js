import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { Container } from "@material-ui/core";

const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Quizee-Time` : `Quizee-Time`}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
