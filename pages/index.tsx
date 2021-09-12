import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Link from "next/link";
import { getRows } from "../libs/getDataFromSheets";
import { google } from "googleapis";

export async function getServerSideProps() {
  const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    undefined,
    (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    target
  );

  const range = `NewsBek`;
  const sheets = google.sheets({ version: "v4", auth: jwt });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  // @ts-ignore
  const rows = response.data.values;
  rows?.shift();

  return {
    props: {
      rows,
    },
  };
}

const Home: NextPage = ({ rows }: any) => {
  return (
    <>
      <Head>
        <title>Newsbek</title>
        <meta name="description" content="A bateria da Escola Politécnica" />
        <link rel="icon" href="/images/logo-fundo-azul.svg" />
      </Head>
      <Header />
      <main className={styles.mainContent}>
        <article>
          {rows.map((row: any) => {
            const adress = "/posts/" + row[3];
            return (
              <div key={row[0]} className={styles.card}>
                <Link href={adress}>
                  <a>{row[0]}</a>
                </Link>
                <h3>
                  <span> {row[2]}</span>
                  <br />({row[5]} de leitura)
                </h3>
              </div>
            );
          })}
        </article>
      </main>
    </>
  );
};

export default Home;
