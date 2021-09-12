// import { google } from "googleapis";
import Head from "next/head";
import styles from "./Post.module.css";
import Header from "../../components/Header";
import Link from "next/link";
import { google } from "googleapis";
import ReactMarkdown from "react-markdown";

export async function getServerSideProps({ query }: any) {
  const { id } = query;

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

  const row = rows?.find((row) => row[3] === id);
  let [title, content, date] = ["Erro", "Fale com algum dev :(", "Erro"];

  if (row) {
    title = row[0];
    content = row[1];
    date = row[2];
  }

  return {
    props: {
      title,
      content,
      date,
    },
  };
}

export default function Post({ title, content, date }: any) {
  return (
    <>
      <Head>
        <title>Newsbek</title>
        <meta name="description" content="A newsletter da Rateria" />
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
          <ReactMarkdown>{content}</ReactMarkdown>
          <Link href="/">
            <a className={styles.back}> ← Voltar à página inicial</a>
          </Link>
        </article>
      </main>
    </>
  );
}
