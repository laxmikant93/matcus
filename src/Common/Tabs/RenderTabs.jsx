import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./tabs.module.scss";

export default function RenderTabs({ tabs, TabWrapperClass, TabButtonClass, ActiveTabClass, activeTitle, valueState }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleActive = (index, title) => {
    setActiveTab(index)
    if (valueState) {
      activeTitle(title)
    }
  }
  return (
    <React.Fragment>
      <div className={TabWrapperClass ? TabWrapperClass : styles.TabContainer}>
        {tabs.map((tab, index) => (
          <button className={`${TabButtonClass ? TabButtonClass : "button btn-s"} ${activeTab === index && (ActiveTabClass ? ActiveTabClass : 'button-primary')}`} key={index} onClick={() => handleActive(index, tab.title)}>
            {tab.title}
          </button>
        ))}
      </div>
      {tabs[activeTab].render()}
    </React.Fragment >
  );
}