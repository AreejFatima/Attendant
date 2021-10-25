import Tabs from "./Tabs";
import TabularView from "./TabularView";
import Tab from "./Tab";
import { hourlyType } from "../../Adapter/types";

interface propType {
  weekly: hourlyType[];
  monthly: hourlyType[];
}

const HourlyTabs = (props: propType): JSX.Element => {
  const { weekly, monthly } = props;
  return (
    <div className="tabs">
      <Tabs>
        <Tab label="Weekly">
          <TabularView data={weekly} total={40} />
        </Tab>
        <Tab label="Monthly">
          <TabularView data={monthly} total={160} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default HourlyTabs;
