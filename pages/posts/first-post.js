import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

import Layout from "../../components/layout";


export default function FirstPost() {
  return (
  <Layout>
  <Head>
    <title>First Post</title>
  </Head>
  <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload" // controls when the 3rd party script should load
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`) // run after script finished LOADING
        }
      />
  <h1>FirstPost</h1>
  <Image 
    src="/images/profile.jpeg"
    height={500}
    width={500}
    alt="profile"
/>
  </Layout>
  );
}
