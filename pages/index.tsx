import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Link from 'next/link';
import { google } from 'googleapis';

import { getPlaiceholder } from 'plaiceholder';
import { InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
	const { base64 } = await getPlaiceholder('/images/logo-fundo-azul.svg');

	const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
	const jwt = new google.auth.JWT(
		process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
		undefined,
		(process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
		target
	);

	const range = `NewsBek`;
	const sheets = google.sheets({ version: 'v4', auth: jwt });
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
			blurDataURL: base64,
		},
		revalidate: 30,
	};
}

const Home: NextPage = ({ rows, blurDataURL }: any) => {
	const [searchText, setSearchText] = useState('');

	return (
		<>
			<Head>
				<title>Newsbek</title>
				<meta name="description" content="A newsletter da Rateria!" />
				<link rel="icon" href="/images/logo-fundo-azul.svg" />
			</Head>
			<Header blurDataURL={blurDataURL} />
			<main className={styles.mainContent}>
				<article>
					<div className={styles.searchBar}>
						<input
							type="text"
							placeholder="Buscar posts"
							onChange={(e) => {
								setSearchText(e.target.value);
								console.log(e.target.value);
							}}
						/>
					</div>
					{rows.map((row: any) => {
						const filter = searchText.toUpperCase().trim();
						const title = row[0].toUpperCase().trim();

						if (searchText != '') {
							if (title.indexOf(filter) == -1) return <></>;
						}

						if (row[0][0] === '#') return <h2>{row[0].slice(2)}</h2>;

						const adress = '/posts/' + row[3];
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
