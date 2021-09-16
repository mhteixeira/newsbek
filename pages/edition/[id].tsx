import Head from "next/head";
import styles from "./Edition.module.css";
import Header from "../../components/Header";
import Link from "next/link";
import Image from "next/image";
import { google } from "googleapis";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

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

export async function getStaticProps(context: any) {
  const id = context.params.id;
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

  let rowIndex = -1;
  let editionRows: number[] = [];
  let row = [["", "", ""]];
  if (rows)
    row = rows.filter((row) => {
      if (row[3].slice(1) === id) rowIndex = rows.indexOf(row);
      if (row[0][0] === "#") editionRows.push(rows.indexOf(row));
      return row[3].slice(1) === id;
    });

  let lastindex = 0;
  let postsOnEdition = [];
  if (rows) {
    if (rowIndex === editionRows[editionRows.length - 1]) {
      lastindex = rows.length;
    } else {
      lastindex = editionRows[editionRows.indexOf(rowIndex) + 1];
    }
    for (let i = rowIndex + 1; i < lastindex; i++) {
      postsOnEdition.push(rows[i]);
    }
  }
  console.log(row);
  console.log(`\nBuilding slug: ${context.params.id}`);
  return {
    props: {
      row,
      postsOnEdition,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
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
  let rows = response.data.values;

  rows?.map((row) => {
    if (row[3][0] !== "-") rows?.splice(rows?.indexOf(row), 1);
  });

  rows?.shift();

  const paths = rows?.map((row) => {
    return {
      params: { id: row[3] },
    };
  });

  return { paths, fallback: true };
}

export default function Edition({ row, postsOnEdition }: any) {
  const router = useRouter();
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

      <Header />
      <main className={styles.mainContent}>
        <article>
          {row ? (
            <div className={styles.editionHeader}>
              <h1>{row[0][0].slice(2)}</h1>
              <ReactMarkdown linkTarget="_blank" components={renderers}>
                {row[0][1]}
              </ReactMarkdown>
              <div></div>
            </div>
          ) : (
            <></>
          )}

          {postsOnEdition &&
            postsOnEdition.map((post: any) => {
              return (
                <>
                  <h1>
                    <span>{post[2]}</span>
                    <br />
                    {post[0]}
                  </h1>
                  <ReactMarkdown linkTarget="_blank" components={renderers}>
                    {post[1]}
                  </ReactMarkdown>
                  <div className={styles.line}></div>
                </>
              );
            })}
          <div className={styles.back}>
            <Link href="/">
              <a>Voltar ao menu</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
