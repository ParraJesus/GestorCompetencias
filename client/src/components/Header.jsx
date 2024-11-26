import React from "react";
import Style from "../stylesheets/Header.module.css";
import { ReactComponent as CogIcon } from "../assets/bxs-cog.svg";
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
        <CogIcon className="small-icon" />
        <h1>CREA</h1>
      </div>
      <h1>{titulo}</h1>
      <UserIcon className="small-icon" />
    </header>
  );
};

export default Header;
