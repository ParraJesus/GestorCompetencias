import React from "react";
import Style from "../stylesheets/SideMenu.module.css";
import { Link } from "react-router-dom";

const SideMenuExpandedItem = ({ texto, enlace }) => {
  return (
    <li className={Style.listItem}>
      <Link className={Style.listLink} to={enlace}>
        {texto}
      </Link>
    </li>
  );
};

export default SideMenuExpandedItem;
