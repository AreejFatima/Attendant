/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import TabButtons from "./TabButtons";

const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState([props.children[0].props.label]);
  
    const changeTab = (tab) => {
      setActiveTab(tab);
    };
    let content;
    const buttons = [];
    return (
      <div>
        {React.Children.map(props.children, (child) => {
          buttons.push(child.props.label);
          if (child.props.label === activeTab) content = child.props.children;
        })}
  
        <TabButtons
          activeTab={activeTab}
          buttons={buttons}
          changeTab={changeTab}
        />
        <div className="tab-content">{content}</div>
      </div>
    );
  };

  

  export default Tabs;