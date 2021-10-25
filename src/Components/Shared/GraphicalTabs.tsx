import Tabs from "./Tabs";
import LineChart from "./LineChart";
import Tab from "./Tab";

const GraphicalTabs = (props): JSX.Element => {
  const { daily, weekly, monthly } = props;
  return (
    <div className="tabs">
      <Tabs>
        <Tab label="Daily">
          <LineChart data={daily} />
        </Tab>
        <Tab label="Weekly">
          <LineChart data={weekly} />
        </Tab>
        <Tab label="Monthly">
          <LineChart data={monthly} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GraphicalTabs;
