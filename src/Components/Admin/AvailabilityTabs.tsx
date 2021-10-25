import Tabs from "../Shared/Tabs";
import { Data_ } from "../../Adapter/types";
import DisplayTab from "./DisplayTab";
import Tab from "../Shared/Tab";

const AvailabilityTabs = (props: Data_): JSX.Element => {
  const { available, unavailable, onleave } = props;
  return (
    <div className="tabs">
      <Tabs>
        <Tab label="Available">
          <DisplayTab array={available} />
        </Tab>
        <Tab label="Unavailable">
          <DisplayTab array={unavailable} />
        </Tab>
        <Tab label="OnLeave">
          <DisplayTab array={onleave} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AvailabilityTabs;
