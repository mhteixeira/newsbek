/* eslint-disable @next/next/no-img-element */
import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import logo from '../../public/images/logo-fundo-azul.svg';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
	typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str);

function Header() {
	const [isShrunk, setShrunk] = useState(false);

	const showSettings = (event: any) => {
		event.preventDefault();
	};

	useEffect(() => {
		const handler = () => {
			setShrunk((isShrunk) => {
				if (
					!isShrunk &&
					(document.body.scrollTop > 20 ||
						document.documentElement.scrollTop > 20)
				) {
					return true;
				}

				if (
					isShrunk &&
					document.body.scrollTop < 4 &&
					document.documentElement.scrollTop < 4
				) {
					return false;
				}

				return isShrunk;
			});
		};

		window.addEventListener('scroll', handler);
		return () => window.removeEventListener('scroll', handler);
	}, []);

	return (
		<>
			<div
				id="wrapper"
				className={styles.wrapper}
				style={{ height: isShrunk ? 80 : 120 }}
			>
				<div className={styles.content}>
					<Link href="/">
						<a>
							<div className={isShrunk ? styles.logoCollapsed : styles.logo}>
								{/* <img
									src="/images/logo-fundo-azul.svg"
									alt="Rateria"
									className={isShrunk ? styles.collapsed : styles.image}
								/> */}
								<Image
									src={logo}
									alt="Logo da Rateria"
									width={160}
									height={160}
									quality={100}
									placeholder="blur"
									blurDataURL={`data:image/svg+xml;base64,${toBase64(
										shimmer(700, 475)
									)}`}
									className={isShrunk ? styles.collapsed : styles.image}
								/>
							</div>
						</a>
					</Link>

					<Link href="/">
						<a
							className={styles.pageTitle}
							style={{
								fontSize: isShrunk ? 44 : 64,
								padding: isShrunk ? 12 : 20,
								marginLeft: isShrunk ? -30 : 0,
							}}
						>
							NEWSBEK
						</a>
					</Link>
				</div>
				<div className={styles.mobileContent}>
					<Link href="/">
						<a>
							<div className={styles.mobileLogoAndText}>
								{/* <img
									src="/images/logo-fundo-azul.svg"
									alt="Rateria"
									style={{ width: 60, height: 60 }}
									

								/> */}
								<Image
									src={logo}
									alt="Logo da Rateria"
									width={60}
									height={60}
									quality={100}
									placeholder="blur"
									blurDataURL={`data:image/svg+xml;base64,${toBase64(
										shimmer(700, 475)
									)}`}
								/>
								<h3 className={styles.rateriaMobile}>NEWSBEK</h3>
							</div>
							<div id="page-wrap"></div>
						</a>
					</Link>
				</div>
			</div>
			<div className={styles.placeholder} />
		</>
	);
}

export default Header;
