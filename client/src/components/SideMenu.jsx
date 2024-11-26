import React, { useState } from "react";
import styles from "../stylesheets/SideMenu.module.css";
import SideMenuItem from "../components/SideMenuItem";
import SideMenuExpandedItem from "../components/SideMenuExpandedItem";

const SideMenu = ({ onExpandedChange, menuData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(-1);

  const handleExpandedChange = (value) => {
    onExpandedChange(value);
  };

  const handleMenuItemClick = (index) => {
    setActiveMenuIndex(index === activeMenuIndex ? -1 : index);
  };

  const activeMenuItems =
    activeMenuIndex !== -1 ? menuData[activeMenuIndex].expandedItems : [];

  return (
    <React.Fragment>
      <aside
        className={`${styles.sidebar_container} ${
          isExpanded ? `${styles.expanded}` : ""
        }`.trimEnd()}
        onMouseEnter={() => {
          setIsExpanded(true);
          handleExpandedChange(true);
        }}
        onMouseLeave={() => {
          setIsExpanded(false);
          handleExpandedChange(false);
        }}
      >
        {menuData.map((menuItem, index) => (
          <SideMenuItem
            key={index}
            texto={menuItem.texto}
            Icono={menuItem.icono}
            isExpanded={isExpanded}
            onClick={() => {
              handleMenuItemClick(index);
            }}
          />
        ))}
      </aside>
      <div
        className={`${styles.secondary_menu} ${
          activeMenuItems.length > 0 ? `${styles.displayed}` : ""
        }`.trimEnd()}
      >
        <ul className={styles.list}>
          {activeMenuItems.map((item, idx) => (
            <SideMenuExpandedItem
              key={idx}
              texto={item.texto}
              enlace={item.enlace}
            />
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideMenu;
