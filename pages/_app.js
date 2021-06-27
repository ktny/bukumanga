// @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../styles/global.css";
import * as gtag from "../src/lib/gtag";

export const siteName = "BUKUMANGA";
export const description = "はてなブックマーク数を元にwebマンガをまとめたサイト";
const url = "https://bukumanga.com";
const imgUrl = "https://bukumanga.com/icon.png";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // useEffect(() => {
  //   if (!gtag.existsGaId) {
  //     return;
  //   }
  //   const handleRouteChange = path => {
  //     gtag.pageview(path);
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <React.Fragment>
      <Head>
        <title>
          {siteName} - {description}
        </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content={imgUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={url} />
      </Head>
      <StylesProvider injectFirst>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </StylesProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
