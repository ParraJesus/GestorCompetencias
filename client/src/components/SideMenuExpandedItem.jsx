import React from "react";
import Style from "../stylesheets/SideMenu.module.css";

const SideMenuExpandedItem = ({ texto, enlace }) => {
  return (
    <li className={Style.listItem}>
      <a className={Style.listLink} href={enlace}>
        {texto}
      </a>
    </li>
  );
};

export default SideMenuExpandedItem;
