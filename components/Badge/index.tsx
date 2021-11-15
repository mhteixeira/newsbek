// @ts-nocheck
/* eslint-disable @next/next/no-img-element */
import styles from "../../pages/ratinhos/Ratinhos.module.css";
import Link from "next/link";
import Image from "next/image";
import { indexing_v3 } from "googleapis";

const badgeAgogo = "/badges/Agogô.svg";
const badgeArte = "/badges/Arte.svg";
const badgeCaixa = "/badges/Caixa.svg";
const badgeCGL = "/badges/CGL.svg";
const badgeChocalho = "/badges/Chocalho.svg";
const badgeComunicacao = "/badges/Comunicação.svg";
const badgeCriacao = "/badges/Criação.svg";
const badgeDiretoriaDeAgogo = "/badges/Diretoria de Agogô.svg";
const badgeDiretoriaDeCaixa = "/badges/Diretoria de Caixa.svg";
const badgeDiretoriaDeChocalho = "/badges/Diretoria de Chocalho.svg";
const badgeDiretoriaDeDjembe = "/badges/Diretoria de Djembê";
const badgeDiretoriaDeRipa = "/badges/Diretoria de Ripa.svg";
const badgeDiretoriaDeSurdo = "/badges/Diretoria de Surdo.svg";
const badgeDiretoriaDeTamborim = "/badges/Diretoria de Tamborim.svg";
const badgeDiretoriaDeXequere = "/badges/Diretoria de Xequerê.svg";
const badgeDjembe = "/badges/Djembê.svg";
const badgeDSF = "/badges/DSF.svg";
const badgeMestre = "/badges/Mestre.svg";
const badgePalco = "/badges/Palco.svg";
const badgePresidencia = "/badges/Presidência.svg";
const badgeRatoDoAno = "/badges/Rato do ano.svg";
const badgeRipa = "/badges/Ripa.svg";
const badgeSurdo = "/badges/Surdo.svg";
const badgeTamborim = "/badges/Tamborim.svg";
const badgeTesouraria = "/badges/Tesouraria.svg";
const badgeXequere = "/badges/Xequerê.svg";

interface BadgeProps {
  id: string;
}
const badgesID = {
  0: [badgeCaixa, "Caixa"],
  1: [badgeChocalho, "Chocalho"],
  2: [badgeAgogo, "Agogô"],
  3: [badgeTamborim, "Tamborim"],
  4: [badgeCaixa, "Caixa"],
  5: [badgeRipa, "Ripa"],
  6: [badgeSurdo, "Surdo"],
  7: [badgeXequere, "Xequerê"],
  8: [badgeDjembe, "Djembê"],
  9: [badgeDiretoriaDeChocalho, "Diretoria de Chocalho"],
  10: [badgeDiretoriaDeAgogo, "Diretoria de Agogô"],
  11: [badgeDiretoriaDeTamborim, "Diretoria de Tamborim"],
  12: [badgeDiretoriaDeCaixa, "Diretoria de Caixa"],
  13: [badgeDiretoriaDeRipa, "Diretoria de Ripa"],
  14: [badgeDiretoriaDeSurdo, "Diretoria de Surdo"],
  15: [badgeMestre, "Mestre"],
  16: [badgeArte, "Arte"],
  17: [badgeCGL, "CGL"],
  18: [badgeComunicacao, "Comunicação"],
  19: [badgeCriacao, "Driação"],
  20: [badgeDSF, "DSF"],
  21: [badgePalco, "Palco"],
  22: [badgePresidencia, "Presidência"],
  23: [badgeRatoDoAno, "Rato do Ano"],
  24: [badgeTesouraria, "Tesouraria"],
};

function Badge({ id }: BadgeProps) {
  if (id === "0") return <></>;

  return (
    <div className={styles.badge}>
      <div className={styles.tooltip}>{badgesID[id][1]}</div>

      <img src={badgesID[id][0]} alt="foto"></img>
    </div>
  );
}

export default Badge;
