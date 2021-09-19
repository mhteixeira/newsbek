import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import AltHeader from "../components/AltHeader";
import Link from "next/link";
import { google } from "googleapis";
import { SocialIcon } from "react-social-icons";

export async function getStaticProps() {
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
    revalidate: 30,
  };
}

const Home: NextPage = ({ rows }: any) => {
  const [searchText, setSearchText] = useState("");

  const [filterInterview, setFilterInterview] = useState(false);
  const [filterReports, setFilterReports] = useState(false);
  const [filterProjects, setFilterProjects] = useState(false);

  const linktreeIcon = {
    icon: "M38.5696 18.7309L47.8523 35.6053C48.3118 36.4406 47.6434 37.4234 46.6159 37.4234H40.3961V43.8584C40.3961 44.1772 40.2694 44.483 40.044 44.7084C39.8185 44.9338 39.5128 45.0605 39.194 45.0605H35.4727C35.3149 45.0605 35.1586 45.0294 35.0127 44.969C34.8669 44.9086 34.7344 44.82 34.6227 44.7084C34.5111 44.5968 34.4226 44.4642 34.3622 44.3184C34.3018 44.1726 34.2707 44.0162 34.2707 43.8584V37.4236H35.9494L35.9501 37.4234C36.7204 37.4231 37.2886 36.8705 37.3309 36.2417C37.3449 36.02 37.2945 35.799 37.1857 35.6053L32 26.1785L36.097 18.7309C36.6331 17.7564 38.0334 17.7564 38.5696 18.7309ZM25.4304 18.7309C25.9666 17.7564 27.3669 17.7564 27.903 18.7309L32 26.1785L26.8143 35.6053C26.7055 35.799 26.6551 36.02 26.6691 36.2417C26.7114 36.8705 27.2797 37.4231 28.0499 37.4235H28.0493L28.0506 37.4236H29.7293V43.8584C29.7293 44.1772 29.6027 44.483 29.3772 44.7084C29.1518 44.9338 28.8461 45.0605 28.5272 45.0605H24.806C24.4872 45.0605 24.1815 44.9338 23.9561 44.7084C23.7306 44.483 23.604 44.1772 23.604 43.8584V37.4235H17.384C16.3565 37.4235 15.6882 36.4406 16.1477 35.6053L25.4304 18.7309Z",
    mask: "M0,0v64h64V0H0z M38.5696 18.7309L47.8523 35.6053C48.3118 36.4406 47.6434 37.4234 46.6159 37.4234H40.3961V43.8584C40.3961 44.1772 40.2694 44.483 40.044 44.7084C39.8185 44.9338 39.5128 45.0605 39.194 45.0605H35.4727C35.3149 45.0605 35.1586 45.0294 35.0127 44.969C34.8669 44.9086 34.7344 44.82 34.6227 44.7084C34.5111 44.5968 34.4226 44.4642 34.3622 44.3184C34.3018 44.1726 34.2707 44.0162 34.2707 43.8584V37.4236H35.9494L35.9501 37.4234C36.7204 37.4231 37.2886 36.8705 37.3309 36.2417C37.3449 36.02 37.2945 35.799 37.1857 35.6053L32 26.1785L36.097 18.7309C36.6331 17.7564 38.0334 17.7564 38.5696 18.7309ZM25.4304 18.7309C25.9666 17.7564 27.3669 17.7564 27.903 18.7309L32 26.1785L26.8143 35.6053C26.7055 35.799 26.6551 36.02 26.6691 36.2417C26.7114 36.8705 27.2797 37.4231 28.0499 37.4235H28.0493L28.0506 37.4236H29.7293V43.8584C29.7293 44.1772 29.6027 44.483 29.3772 44.7084C29.1518 44.9338 28.8461 45.0605 28.5272 45.0605H24.806C24.4872 45.0605 24.1815 44.9338 23.9561 44.7084C23.7306 44.483 23.604 44.1772 23.604 43.8584V37.4235H17.384C16.3565 37.4235 15.6882 36.4406 16.1477 35.6053L25.4304 18.7309Z",
    color: "#39E09B",
  };

  return (
    <>
      <Head>
        <title>Newsbek</title>
        <meta name="description" content="A newsletter da Rateria!" />
        <link rel="icon" href="/images/logo-fundo-azul.svg" />
      </Head>
      <AltHeader currentPage={"Home"} />
      <main className={styles.mainContent}>
        <div className={styles.searchBarMobile}>
          <input
            type="text"
            placeholder="Buscar posts"
            onChange={(e) => {
              setSearchText(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <div className={styles.filtersMobile}>
          <label className={styles.checkBoxContainer}>
            Entrevistas
            <input
              type="checkbox"
              onChange={(e) => setFilterInterview(e.target.checked)}
              checked={filterInterview}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Informes
            <input
              type="checkbox"
              onChange={(e) => setFilterReports(e.target.checked)}
              checked={filterReports}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.checkBoxContainer}>
            Projetos
            <input
              type="checkbox"
              onChange={(e) => setFilterProjects(e.target.checked)}
              checked={filterProjects}
            />
            <span className={styles.checkmark}></span>
          </label>
        </div>
        <div className={styles.content}>
          <article>
            {rows.map((row: any) => {
              const filter = searchText.toUpperCase().trim();
              const title = row[0].toUpperCase().trim();

              if (searchText != "") {
                if (title.indexOf(filter) == -1) {
                  return <></>;
                }
              }

              if (row[0][0] === "#")
                return (
                  <div key={row[0]}>
                    <Link href={"/edition/" + row[3].slice(1)}>
                      <a id={row[3].slice(1)} className={styles.editionHeader}>
                        <h2
                          dangerouslySetInnerHTML={{
                            __html:
                              row[0].slice(2) +
                              ` <i class=${styles.arrowRight}></i>`,
                          }}
                        ></h2>
                      </a>
                    </Link>
                  </div>
                );

              let notFiltered = false;
              if (filterInterview || filterReports || filterProjects) {
                if (filterInterview && row[4] === "Entrevistas")
                  notFiltered = true;
                if (filterReports && row[4] === "Informes") notFiltered = true;
                if (filterProjects && row[4] === "Projetos") notFiltered = true;
                if (!notFiltered) return <></>;
              }

              const adress = "/posts/" + row[3];
              return (
                <div key={row[0]} className={styles.card}>
                  <Link href={adress}>
                    <a>{row[0]}</a>
                  </Link>
                  <h3>
                    <span> {row[2]}</span>
                    <br />({row[6]} de leitura)
                  </h3>
                </div>
              );
            })}
          </article>
          <div className={styles.separator}></div>
          <div className={styles.sideOptions}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Buscar posts"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </div>

            <h3>Filtrar posts</h3>

            <label className={styles.checkBoxContainer}>
              Entrevistas
              <input
                type="checkbox"
                onChange={(e) => setFilterInterview(e.target.checked)}
                checked={filterInterview}
              />
              <span className={styles.checkmark}></span>
            </label>
            <label className={styles.checkBoxContainer}>
              Informes
              <input
                type="checkbox"
                onChange={(e) => setFilterReports(e.target.checked)}
                checked={filterReports}
              />
              <span className={styles.checkmark}></span>
            </label>
            <label className={styles.checkBoxContainer}>
              Projetos
              <input
                type="checkbox"
                onChange={(e) => setFilterProjects(e.target.checked)}
                checked={filterProjects}
              />
              <span className={styles.checkmark}></span>
            </label>
            <h3>Nossas redes</h3>
            <SocialIcon
              url="https://www.linktr.ee/rateria"
              label="Linktree"
              target="_blank"
              defaultSVG={linktreeIcon}
              className={styles.socialIcon}
              style={{ width: 40, height: 40, marginRight: 8 }}
            />
            <SocialIcon
              url="https://www.youtube.com/user/Rateria"
              label="Youtube"
              className={styles.socialIcon}
              style={{ width: 40, height: 40, marginRight: 8 }}
              target="_blank"
            />
            <SocialIcon
              url="https://www.facebook.com/rateria"
              label="Facebook"
              className={styles.socialIcon}
              style={{ width: 40, height: 40, marginRight: 8 }}
              target="_blank"
            />
            <SocialIcon
              url="https://www.instagram.com/rateriapoliusp"
              label="Instagram"
              className={styles.socialIcon}
              style={{ width: 40, height: 40, marginRight: 8 }}
              target="_blank"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
