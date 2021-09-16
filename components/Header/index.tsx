/* eslint-disable @next/next/no-img-element */
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import logo from "../../public/images/logo-fundo-azul.svg";

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

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
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
                <img
                  src="/images/logo-fundo-azul.svg"
                  alt="Rateria"
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
                {/* data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVQImWP4/1+6rojBwYHh0wUGBnNjBgsdA1tHLy0lBgZTIwY+QQUGBgUbK16G//+lJzczmBgx/LjPAAB6vQ4Tu7pSTAAAAABJRU5ErkJggg== */}
                <Image
                  src={logo}
                  alt="Logo da Rateria"
                  width={160}
                  height={160}
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVQImWP4/1+6rojBwYHh0wUGBnNjBgsdA1tHLy0lBgZTIwY+QQUGBgUbK16G//+lJzczmBgx/LjPAAB6vQ4Tu7pSTAAAAABJRU5ErkJggg=="
                  className={isShrunk ? styles.collapsed : styles.image}
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
