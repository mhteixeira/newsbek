import Head from "next/head";
import styles from "./Ratinhos.module.css";
import Image from "next/image";
import { google } from "googleapis";
import AltHeader from "../../components/AltHeader";
import RatinhoCard from "../../components/RatinhoCard";

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
        <article>
          {years.map((year: string) => {
            return (
              <>
                <h1 key={year}>{year}</h1>
                <div className={styles.cardsContainer}>
                  {rowsByYear[year].map((row: any) => {
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
