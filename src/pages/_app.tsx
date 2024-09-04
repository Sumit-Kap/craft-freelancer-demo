import "../app/globals.css";

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import AppContext from "../components/AppContextProvider";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  console.log("process.env", process.env);
  return (
    <SessionProvider session={pageProps.session}>
      <AppContext>
        <Header />
        <Component {...pageProps} />
      </AppContext>
    </SessionProvider>
  );
}
