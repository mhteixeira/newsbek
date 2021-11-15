/* eslint-disable @next/next/no-img-element */
import styles from "../../pages/ratinhos/Ratinhos.module.css";
import Link from "next/link";
import Image from "next/image";
import Badge from "../Badge";
import { useState } from "react";

const placeholderPhoto = "/images/Ratinho.svg";
interface RatinhoCardProps {
  name: string;
  year: string;
  profilePicSrc: string;
  badges: string[];
}

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

function RatinhoCard({ name, year, profilePicSrc, badges }: RatinhoCardProps) {
  badges = badges.sort((a: string, b: string) =>
    Number(a) > Number(b) || Number(a) == 0 ? 1 : Number(b) > Number(a) ? -1 : 0
  );

  const [isImageLoading, setIsImageLoading] = useState(true);

  let leftBadges = [];
  let rightBadges = [];
  for (let i = 0; i <= 5; i++) {
    leftBadges.push(<Badge id={badges[i]} />);
    rightBadges.push(<Badge id={badges[i + 6]} />);
  }

  return (
    <div className={styles.card}>
      <div className={styles.front}>
        <img
          src={profilePicSrc === "Sem foto" ? placeholderPhoto : profilePicSrc}
          alt={"Foto: " + name}
        />
        <div className={styles.leftBadges}>{leftBadges}</div>
        <div className={styles.rightBadges}>{rightBadges}</div>
      </div>
      <h3>
        {name}
        <br />({year})
      </h3>
    </div>
  );
}

export default RatinhoCard;
