import Head from "next/head";
import styles from "./Ratinhos.module.css";
import Image from "next/image";
import { google } from "googleapis";
import AltHeader from "../../components/AltHeader";
import RatinhoCard from "../../components/RatinhoCard";
import ConditionalWrapper from "../../components/ConditionalWrapper";
import React, { useState } from "react";

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

  let ritmistasByInstrument = [0, 0, 0, 0, 0, 0];
  let years: string[] = [];
  rows?.map((row) => {
    if (years.indexOf(row[1]) === -1) years.push(row[1]);

    let badgesIDs = row.slice(15, 27);

    if (badgesIDs.indexOf("2") >= 0 || badgesIDs.indexOf("10") >= 0)
      ritmistasByInstrument[0] += 1;
    if (badgesIDs.indexOf("3") >= 0 || badgesIDs.indexOf("11") >= 0)
      ritmistasByInstrument[1] += 1;
    if (badgesIDs.indexOf("4") >= 0 || badgesIDs.indexOf("12") >= 0)
      ritmistasByInstrument[2] += 1;
    if (badgesIDs.indexOf("5") >= 0 || badgesIDs.indexOf("13") >= 0)
      ritmistasByInstrument[3] += 1;
    if (badgesIDs.indexOf("6") >= 0 || badgesIDs.indexOf("14") >= 0)
      ritmistasByInstrument[4] += 1;
    if (badgesIDs.indexOf("7") >= 0 || badgesIDs.indexOf("15") >= 0)
      ritmistasByInstrument[5] += 1;
  });

  let rowsByYear = {};
  years.map((year) => {
    const yearRow = rows?.filter((row) => row[1] == year);
    let pair = { [year]: yearRow };

    rowsByYear = { ...rowsByYear, ...pair };
  });

  return {
    props: { rowsByYear, years, ritmistasByInstrument },
    revalidate: 30,
  };
}

export default function Ratinhos({
  rowsByYear,
  years,
  ritmistasByInstrument,
}: any) {
  
  const [searchText, setSearchText] = useState("");

  const [filterChocalho, setFilterChocalho] = useState(false);
  const [filterAgogo, setFilterAgogo] = useState(false);
  const [filterTamborim, setFilterTamborim] = useState(false);
  const [filterCaixa, setFilterCaixa] = useState(false);
  const [filterRipa, setFilterRipa] = useState(false);
  const [filterSurdo, setFilterSurdo] = useState(false);

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
            }}
          />
        </div>
        <div className={styles.filtersMobile}>
          <label className={styles.checkBoxContainer}>
            Chocalho ({ritmistasByInstrument[0]})
            <input
              type="checkbox"
              onChange={(e) => setFilterChocalho(e.target.checked)}
              checked={filterChocalho}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Agogô ({ritmistasByInstrument[1]})
            <input
              type="checkbox"
              onChange={(e) => setFilterAgogo(e.target.checked)}
              checked={filterAgogo}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Tamborim ({ritmistasByInstrument[2]})
            <input
              type="checkbox"
              onChange={(e) => setFilterTamborim(e.target.checked)}
              checked={filterTamborim}
            />
            <span className={styles.checkmark}></span>
          </label>

          <label className={styles.checkBoxContainer}>
            Caixa ({ritmistasByInstrument[3]})
            <input
              type="checkbox"
              onChange={(e) => setFilterCaixa(e.target.checked)}
              checked={filterCaixa}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Ripa ({ritmistasByInstrument[4]})
            <input
              type="checkbox"
              onChange={(e) => setFilterRipa(e.target.checked)}
              checked={filterRipa}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Surdo ({ritmistasByInstrument[5]})
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
                {/* <div className={styles.cardsContainer}> */}
                <ConditionalWrapper
                  condition={searchText === ""}
                  wrapper={(children: any) => (
                    <div className={styles.cardsContainer}>{children}</div>
                  )}
                >
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
                      let badgesIDs = row.slice(15, 27);

                      if (
                        filterChocalho &&
                        (badgesIDs.indexOf("2") >= 0 ||
                          badgesIDs.indexOf("10") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterAgogo &&
                        (badgesIDs.indexOf("3") >= 0 ||
                          badgesIDs.indexOf("11") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterTamborim &&
                        (badgesIDs.indexOf("4") >= 0 ||
                          badgesIDs.indexOf("12") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterCaixa &&
                        (badgesIDs.indexOf("5") >= 0 ||
                          badgesIDs.indexOf("13") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterRipa &&
                        (badgesIDs.indexOf("6") >= 0 ||
                          badgesIDs.indexOf("14") >= 0)
                      )
                        notFiltered = true;
                      if (
                        filterSurdo &&
                        (badgesIDs.indexOf("7") >= 0 ||
                          badgesIDs.indexOf("15") >= 0)
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
                        badges={row.slice(15, 27)}
                      />
                    );
                  })}

                  {ratinhosRendered === 0 && searchText === "" && (
                    <p>Nenhum ritmista de {year} encontrado</p>
                  )}
                </ConditionalWrapper>
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
