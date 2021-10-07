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
  1: [badgeMestre, "Mestre"],
  2: [badgeChocalho, "Chocalho"],
  3: [badgeAgogo, "Agogô"],
  4: [badgeTamborim, "Tamborim"],
  5: [badgeCaixa, "Caixa"],
  6: [badgeRipa, "Ripa"],
  7: [badgeSurdo, "Surdo"],
  8: [badgeXequere, "Xequerê"],
  9: [badgeDjembe, "Djembê"],
  10: [badgeDiretoriaDeChocalho, "Diretoria de Chocalho"],
  11: [badgeDiretoriaDeAgogo, "Diretoria de Agogô"],
  12: [badgeDiretoriaDeTamborim, "Diretoria de Tamborim"],
  13: [badgeDiretoriaDeCaixa, "Diretoria de Caixa"],
  14: [badgeDiretoriaDeRipa, "Diretoria de Ripa"],
  15: [badgeDiretoriaDeSurdo, "Diretoria de Surdo"],
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
