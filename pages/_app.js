import "@/styles/globals.css";
import Layout from "@/components/Layouts/layout";
import { Poppins } from "next/font/google";
import KrustyProvider from "@/components/ContextProvider/KrustyContextProvider";
const poppins = Poppins({ weight: "400", subsets: ["devanagari"] });

export default function App({ Component, pageProps }) {
  return (
    <KrustyProvider>
      <main className={poppins.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </KrustyProvider>
  );
}
