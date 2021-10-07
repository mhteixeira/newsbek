import Head from "next/head";
import styles from "./Ratinhos.module.css";
import Image from "next/image";
import { google } from "googleapis";
import AltHeader from "../../components/AltHeader";
import RatinhoCard from "../../components/RatinhoCard";
import React, { useState } from "react";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#fff5da" offset="20%" />
      <stop stop-color="#ffebb7" offset="50%" />
      <stop stop-color="#fff5da" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#fff5da" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const MyImage = (props: any) => {
  return (
    <Image
      alt={"next/image"}
      src={props.src}
      layout="responsive"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      width={600}
      height={400}
    />
  );
};

export async function getStaticProps() {
  const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    undefined,
    (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    target
  );

  const range = `Ratinhos`;
  const sheets = google.sheets({ version: "v4", auth: jwt });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  // @ts-ignore
  const rows = response.data.values;
  rows?.shift();
  rows?.shift();

  let years: string[] = [];
  rows?.map((row) => {
    if (years.indexOf(row[1]) === -1) years.push(row[1]);
  });

  let rowsByYear = {};
  years.map((year) => {
    const yearRow = rows?.filter((row) => row[1] == year);
    let pair = { [year]: yearRow };

    rowsByYear = { ...rowsByYear, ...pair };
  });

  return {
    props: { rowsByYear, years },
    revalidate: 30,
  };
}

export default function Ratinhos({ rowsByYear, years }: any) {
  const [searchText, setSearchText] = useState("");

  const [filterChocalho, setFilterChocalho] = useState(false);
  const [filterAgogo, setFilterAgogo] = useState(false);
  const [filterTamborim, setFilterTamborim] = useState(false);
  const [filterCaixa, setFilterCaixa] = useState(false);
  const [filterRipa, setFilterRipa] = useState(false);
  const [filterSurdo, setFilterSurdo] = useState(false);

  const renderers = {
    img: MyImage,
  };

  return (
    <>
      <Head>
        <title>Newsbek</title>
        <meta name="description" content="A newsletter da Rateria!" />
        <link rel="icon" href="/images/logo-fundo-azul.svg" />
      </Head>

      <AltHeader currentPage={"Ratinhos"} />
      <main className={styles.mainContent}>
        <div className={styles.searchBarMobile}>
          <input
            type="text"
            placeholder="Buscar ritmista, ano ou cargo"
            onChange={(e) => {
              setSearchText(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <div className={styles.filtersMobile}>
          <label className={styles.checkBoxContainer}>
            Chocalho
            <input
              type="checkbox"
              onChange={(e) => setFilterChocalho(e.target.checked)}
              checked={filterChocalho}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Agogô
            <input
              type="checkbox"
              onChange={(e) => setFilterAgogo(e.target.checked)}
              checked={filterAgogo}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Tamborim
            <input
              type="checkbox"
              onChange={(e) => setFilterTamborim(e.target.checked)}
              checked={filterTamborim}
            />
            <span className={styles.checkmark}></span>
          </label>

          <label className={styles.checkBoxContainer}>
            Caixa
            <input
              type="checkbox"
              onChange={(e) => setFilterCaixa(e.target.checked)}
              checked={filterCaixa}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Ripa
            <input
              type="checkbox"
              onChange={(e) => setFilterRipa(e.target.checked)}
              checked={filterRipa}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Surdo
            <input
              type="checkbox"
              onChange={(e) => setFilterSurdo(e.target.checked)}
              checked={filterSurdo}
            />
            <span className={styles.checkmark}></span>
          </label>
        </div>
        <article>
          {years.map((year: string) => {
            let ratinhosRendered = 0;

            return (
              <>
                {searchText === "" && <h1 key={year}>{year}</h1>}
                <div className={styles.cardsContainer}>
                  {rowsByYear[year].map((row: any) => {
                    let notFiltered = false;

                    const filter = searchText.toUpperCase().trim();
                    const name = row[0].toUpperCase().trim();

                    if (searchText != "") {
                      row.map((item: string) => {
                        if (item.toUpperCase().trim().indexOf(filter) >= 0)
                          notFiltered = true;
                      });
                      if (!notFiltered) {
                        return <></>;
                      }
                    }

                    notFiltered = false;
                    if (
                      filterChocalho ||
                      filterAgogo ||
                      filterTamborim ||
                      filterCaixa ||
                      filterRipa ||
                      filterSurdo
                    ) {
                      if (
                        filterChocalho &&
                        (row.slice(9, 15).indexOf("2") >= 0 ||
                          row.slice(9, 15).indexOf("10") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterAgogo &&
                        (row.slice(9, 15).indexOf("3") >= 0 ||
                          row.slice(9, 15).indexOf("11") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterTamborim &&
                        (row.slice(9, 15).indexOf("4") >= 0 ||
                          row.slice(9, 15).indexOf("12") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterCaixa &&
                        (row.slice(9, 15).indexOf("5") >= 0 ||
                          row.slice(9, 15).indexOf("13") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterRipa &&
                        (row.slice(9, 15).indexOf("6") >= 0 ||
                          row.slice(9, 15).indexOf("14") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterSurdo &&
                        (row.slice(9, 15).indexOf("7") >= 0 ||
                          row.slice(9, 15).indexOf("15") >= 0)
                      )
                        notFiltered = true;
                      if (!notFiltered) return <></>;
                    }

                    ratinhosRendered += 1;

                    return (
                      <RatinhoCard
                        key={row}
                        name={row[0]}
                        year={row[1]}
                        profilePicSrc={
                          row[2] === "Sem foto"
                            ? "Sem foto"
                            : "https://drive.google.com/uc?id=" + row[2]
                        }
                        badges={row
                          .slice(9, 15)
                          .sort((a: string, b: string) =>
                            a > b ? 1 : b > a ? -1 : 0
                          )}
                      />
                    );
                  })}

                  {ratinhosRendered === 0 && searchText === "" && (
                    <p>Nenhum ritmista de {year} encontrado</p>
                  )}
                </div>
              </>
            );
          })}
          <div className={styles.arrows}></div>
          <div className={styles.back}></div>
        </article>
      </main>
    </>
  );
}
