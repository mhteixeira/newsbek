import Link from "next/link";
import React from "react";
import { elastic as Menu } from "react-burger-menu";
import styles from "./Sidebar.module.css";
import { FaBook, FaUsers } from "react-icons/fa";

function Sidebar(props: any) {
  return (
    <Menu {...props} right>
      <Link href="/">
        <a className="menu-item">
          <FaBook size={28} />
          &ensp;NEWS
        </a>
      </Link>
      <br />
      <Link href="/sobre">
        <a className="menu-item">
          <FaUsers size={28} />
          &ensp;RATINHOS
        </a>
      </Link>
      <br />
    </Menu>
  );
}

export default Sidebar;
