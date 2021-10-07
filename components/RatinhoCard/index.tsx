/* eslint-disable @next/next/no-img-element */
import styles from "../../pages/ratinhos/Ratinhos.module.css";
import Link from "next/link";
import Image from "next/image";
import Badge from "../Badge";

interface RatinhoCardProps {
  name: string;
  year: string;
  profilePicSrc: string;
  badges: string[];
}

function RatinhoCard({ name, year, profilePicSrc, badges }: RatinhoCardProps) {
  const frase = "frase do scubi caso ele tivesse uma mas ele não tá na galeria";

  return (
    <div className={styles.card}>
      <div className={styles.front}>
        <img src={profilePicSrc} alt="foto"></img>
        <div className={styles.badges}>
          <Badge id={badges[0]} />
          <Badge id={badges[1]} />
          <Badge id={badges[2]} />
          <Badge id={badges[3]} />
          <Badge id={badges[4]} />
          <Badge id={badges[5]} />
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
