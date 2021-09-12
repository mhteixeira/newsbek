import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rateria Poli-USP</title>
        <meta name="description" content="A bateria da Escola Politécnica" />
        <link rel="icon" href="/images/logo-fundo-azul.svg" />
      </Head>
      <Header />
      <main className={styles.mainContent}>
        <article>
          {/* {rows.map((row: any) => {
            const adress = "/newsbek/" + (rows.indexOf(row) + 1);
            return ( */}
          <div className={styles.card}>
            <Link href="/posts/1">
              <a>Título do post</a>
            </Link>
            <h3>01/01/2022</h3>
          </div>
          {/* );
          })} */}
        </article>
      </main>
    </>
  );
};

export default Home;
