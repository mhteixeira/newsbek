/* eslint-disable @next/next/no-img-element */
import styles from "./AltHeader.module.css";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

import logo from "../../public/images/logo-fundo-azul.svg";

interface HeaderProps {
  currentPage: string;
}

function Header({ currentPage }: HeaderProps) {
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
        <div className={styles.content} style={{ height: isShrunk ? 80 : 160 }}>
          <Link href="/">
            <a>
              <div className={styles.logoAndText}>
                <div className={isShrunk ? styles.logoCollapsed : styles.logo}>
                  <Image
                    src={logo}
                    alt="Logo da Rateria"
                    width={160}
                    height={160}
                    quality={100}
                    placeholder="blur"
                    blurDataURL={
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVQImWP4/1+6rojBwYHh0wUGBnNjBgsdA1tHLy0lBgZTIwY+QQUGBgUbK16G//+lJzczmBgx/LjPAAB6vQ4Tu7pSTAAAAABJRU5ErkJggg=="
                    }
                    className={isShrunk ? styles.collapsed : styles.image}
                  />
                </div>
                <h3
                  className={`${isShrunk ? styles.rateriaCollapsed : ""} ${
                    styles.rateria
                  }`}
                >
                  NEWSBEK
                </h3>
              </div>
            </a>
          </Link>
          <nav style={{ height: isShrunk ? 80 : 120 }}>
            <Link href="/">
              <a className={currentPage === "Home" ? styles.foco : ""}>News</a>
            </Link>
            <Link href="/ratinhos">
              <a className={currentPage === "About" ? styles.foco : ""}>
                Ratinhos
              </a>
            </Link>
          </nav>
        </div>

        <div className={styles.mobileContent}>
          <div className={styles.mobileLogoAndText}>
            <Image
              src={logo}
              alt="Logo da Rateria"
              width={60}
              height={60}
              quality={100}
              placeholder="blur"
              blurDataURL={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVQImWP4/1+6rojBwYHh0wUGBnNjBgsdA1tHLy0lBgZTIwY+QQUGBgUbK16G//+lJzczmBgx/LjPAAB6vQ4Tu7pSTAAAAABJRU5ErkJggg=="
              }
            />
            <h3 className={styles.rateriaMobile}>NEWSBEK</h3>
          </div>
          <div id="App">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          </div>
          <div id="page-wrap"></div>
        </div>
      </div>
      <div className={styles.placeholder} />
    </>
  );
}

export default Header;
