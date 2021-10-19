/* eslint-disable react/destructuring-assignment */
import { FC, useState, Children } from "react";
import TabButtons from "./TabButtons";

const Tabs: FC = (props: any) => {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const changeTab = (tab: typeof activeTab): void => {
    setActiveTab(tab);
  };
  let content: string[];
  const buttons: string[] = [];
  return (
    <div>
      {Children.map(props.children, (child) => {
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
