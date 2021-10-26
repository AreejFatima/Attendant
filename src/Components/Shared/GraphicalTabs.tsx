import Tabs from "./Tabs";
import LineChart from "./LineChart";
import Tab from "./Tab";
import { chartType } from "../../Adapter/types";

interface propType {
  daily: () => chartType;
  weekly: () => chartType;
  monthly: () => chartType;
}

const GraphicalTabs = (props: propType): JSX.Element => {
  const { daily, weekly, monthly } = props;
  return (
    <div className="tabs">
      <Tabs>
        <Tab label="Daily">
          <LineChart dataToPlot={daily} />
        </Tab>
        <Tab label="Weekly">
          <LineChart dataToPlot={weekly} />
        </Tab>
        <Tab label="Monthly">
          <LineChart dataToPlot={monthly} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GraphicalTabs;
