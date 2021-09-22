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
  id: number;
}

function Badge({ id }: BadgeProps) {
  const badgesID = {
    1: [badgeAgogo, "Agogô"],
    2: [badgeArte, "Diretor de Arte"],
    3: [badgeCriacao, "Driação"],
    4: [badgeRipa, "Ripa"],
    5: [badgeComunicacao, "Comunicação"],
    10: [badgeXequere, "Xequerê"],
  };

  const kew = Object.keys(badgesID)[0];
  return (
    <div className={styles.badge}>
      <div className={styles.tooltip}>{badgesID[id][1]}</div>

      <img src={badgesID[id][0]} alt="foto"></img>
    </div>
  );
}

export default Badge;
