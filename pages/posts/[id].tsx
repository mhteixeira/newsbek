// import { google } from "googleapis";
import Head from "next/head";
import styles from "./Post.module.css";
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
  const row = rows?.find((row) => {
    if (row[3] === id) rowIndex = rows.indexOf(row);
    return row[3] === id;
  });

  let previousPost = ["#", "/"];
  let nextPost = ["#", "/"];

  if (row && rows && rowIndex > 0)
    previousPost = [rows[rowIndex - 1][0], rows[rowIndex - 1][3]];

  if (row && rows && rowIndex < rows.length - 1) {
    nextPost = [rows[rowIndex + 1][0], rows[rowIndex + 1][3]];
  }

  let [title, content, date] = ["Erro", "Fale com algum dev :(", "--/--/--"];

  if (row) {
    title = row[0];
    content = row[1];
    date = row[2];
  }

  console.log(`\nBuilding post: ${context.params.id}`);

  return {
    props: {
      title,
      content,
      date,
      previousPost,
      nextPost,
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
    if (row[3][0] == "-") rows?.splice(rows?.indexOf(row), 1);
  });

  rows?.shift();

  const paths = rows?.map((row) => {
    return {
      params: { id: row[3] },
    };
  });

  return { paths, fallback: true };
}

export default function Post({
  title,
  content,
  date,
  previousPost,
  nextPost,
}: any) {
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
          <h1>
            <span>{date}</span>
            <br />
            {title}
          </h1>
          <ReactMarkdown linkTarget="_blank" components={renderers}>
            {content}
          </ReactMarkdown>{" "}
          <div></div>
          <div className={styles.arrows}>
            {previousPost && previousPost[0][0] !== "#" && (
              <Link href={"/posts/" + previousPost[1]}>
                <a>
                  <div>←</div> {previousPost[0]}
                </a>
              </Link>
            )}
            {previousPost && previousPost[0][0] === "#" && <div></div>}
            {nextPost && nextPost[0][0] !== "#" && (
              <Link href={"/posts/" + nextPost[1]}>
                <a>
                  <div>→</div>
                  {nextPost[0]}
                </a>
              </Link>
            )}
          </div>
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
