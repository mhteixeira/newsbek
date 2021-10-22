/* eslint-disable @next/next/no-img-element */
import styles from "../../pages/ratinhos/Ratinhos.module.css";
import Link from "next/link";
import Image from "next/image";
import Badge from "../Badge";

const placeholderPhoto = "/images/Ratinho.svg";
interface RatinhoCardProps {
  name: string;
  year: string;
  profilePicSrc: string;
  badges: string[];
}

function RatinhoCard({ name, year, profilePicSrc, badges }: RatinhoCardProps) {
  badges.sort((a: string, b: string) =>
    Number(a) > Number(b) || Number(a) == 0 ? 1 : Number(b) > Number(a) ? -1 : 0
  );

  if (name === "B.O.") console.log(badges);

  return (
    <div className={styles.card}>
      <div className={styles.front}>
        <img
          src={profilePicSrc === "Sem foto" ? placeholderPhoto : profilePicSrc}
          alt="foto"
          loading="lazy"
        ></img>

        <div className={styles.badges}>
          <Badge id={badges[0]} />
          <Badge id={badges[1]} />
          <Badge id={badges[2]} />
          <Badge id={badges[3]} />
          <Badge id={badges[4]} />
          <Badge id={badges[5]} />
        </div>
        <div className={`${styles.badges}` + ` ${styles.badgesRight}`}>
          <Badge id={badges[6]} />
          <Badge id={badges[7]} />
          <Badge id={badges[8]} />
          <Badge id={badges[9]} />
          <Badge id={badges[10]} />
          <Badge id={badges[11]} />
        </div>
      </div>
      <h3>
        {name} ({year})
      </h3>
      {/* <p>&ldquo;{frase}&rdquo;</p> */}
    </div>
  );
}

export default RatinhoCard;
