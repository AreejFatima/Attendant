import Tabs from "../Shared/Tabs";
import { availabilityType } from "../../Adapter/types";
import DisplayTab from "./DisplayTab";
import Tab from "../Shared/Tab";

const AvailabilityTabs = (props: availabilityType): JSX.Element => {
  const { available, unavailable, onleave } = props;
  return (
    <div className="tabs">
      <Tabs>
        <Tab label="Available">
          <DisplayTab availabilityList={available} />
        </Tab>
        <Tab label="Unavailable">
          <DisplayTab availabilityList={unavailable} />
        </Tab>
        <Tab label="OnLeave">
          <DisplayTab availabilityList={onleave} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AvailabilityTabs;
