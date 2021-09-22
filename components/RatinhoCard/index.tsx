/* eslint-disable @next/next/no-img-element */
import styles from "../../pages/ratinhos/Ratinhos.module.css";
import Link from "next/link";
import Image from "next/image";
import Badge from "../Badge";

function RatinhoCard() {
  const frase = "frase do scubi caso ele tivesse uma mas ele não tá na galeria";

  return (
    <div className={styles.card}>
      <div className={styles.front}>
        <img
          src="https://drive.google.com/uc?id=1QCtpO9BI_M9gQn0g-DnrDoF8J6imc_P9"
          alt="foto"
        ></img>
        <div className={styles.badges}>
          <Badge id={2} />
          <Badge id={5} />
          <Badge id={3} />
          <Badge id={4} />
        </div>
      </div>
      <h3>Marisa (2015)</h3>
      {/* <p>&ldquo;{frase}&rdquo;</p> */}
    </div>
  );
}

export default RatinhoCard;
