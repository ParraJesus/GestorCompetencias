import React from "react";
import Style from "../stylesheets/Header.module.css";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { ReactComponent as UserIcon } from "../assets/bxs-user-circle.svg";

const Header = ({ titulo, isExpanded }) => {
  return (
    <header className={Style.header}>
      <div className={Style.logo}>
        <div
          className={`${Style.color_container} ${
            isExpanded ? `${Style.expanded}` : ""
          }`.trimEnd()}
        ></div>
        <Logo className="small-icon" />
        <h1>CREA</h1>
      </div>
      <h1>{titulo}</h1>
      <UserIcon className="small-icon logOut" title="Cerrar Sesión"></UserIcon>
    </header>
  );
};

export default Header;
