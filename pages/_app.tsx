import "../styles/globals.css";
import Layout from "../layout/layout";
import { StoreProvider } from "../utils/Store";
import { AppProps } from "next/app";
import { StrictMode } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </StrictMode>
  );
}

export default MyApp;
