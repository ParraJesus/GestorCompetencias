import React, { useState } from "react";
import styles from "../stylesheets/SideMenu.module.css";

const ProfessorSideMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`${styles.sidebar_container} ${
        isExpanded ? `${styles.expanded}` : ""
      }`.trimEnd()}
      onMouseEnter={() => {
        setIsExpanded(true);
      }}
      onMouseLeave={() => {
        setIsExpanded(false);
      }}
    ></div>
  );
};

export default ProfessorSideMenu;
