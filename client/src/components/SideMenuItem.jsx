import React from "react";
import styles from "../stylesheets/SideMenu.module.css";

const SideMenuItem = ({ Icono, texto, isExpanded, onClick }) => {
  return (
    <div className={styles.sideMenuItem_container} onClick={onClick}>
      <Icono className={`${styles.sideMenuItem_icon} small-icon`} />
      {isExpanded && (
        <p className={`${styles.sideMenuItem_texto} texto-mayor`}>{texto}</p>
      )}
    </div>
  );
};

export default SideMenuItem;
