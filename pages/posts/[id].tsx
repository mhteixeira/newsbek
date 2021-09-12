// import { google } from "googleapis";
import Head from "next/head";
import styles from "./Post.module.css";
import Header from "../../components/Header";
import Link from "next/link";

export async function getServerSideProps({ query }: any) {
  const { id } = query;

  return {
    props: {
      id,
    },
  };
}

export default function Post({ id }: any) {
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
          <h1>
            <span>01/01/01</span>
            <br />
            Título - {id}
          </h1>
          <div
            className={styles.dangerousDiv}
            // dangerouslySetInnerHTML={{ __html: content }}
          >
            <p>Oioioi</p>
          </div>
          <Link href="/">
            <a className={styles.back}> ← Voltar à página inicial</a>
          </Link>
        </article>
      </main>
    </>
  );
}
