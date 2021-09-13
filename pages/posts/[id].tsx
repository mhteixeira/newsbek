// import { google } from "googleapis";
import Head from "next/head";
import styles from "./Post.module.css";
import Header from "../../components/Header";
import Link from "next/link";
import { google } from "googleapis";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

export async function getStaticProps(context: any) {
  const id = context.params.id;
  console.log(id);
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
  let [title, content, date] = ["Erro", "Fale com algum dev :(", "--/--/--"];

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
    revalidate: 10,
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
  const rows = response.data.values;

  // Get the paths we want to pre-render based on posts
  const paths = rows?.map((row) => ({
    params: { id: row[3] },
  }));

  // console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export default function Post({ title, content, date }: any) {
  const router = useRouter();

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
