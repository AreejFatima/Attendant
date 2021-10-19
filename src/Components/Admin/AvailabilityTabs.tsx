import Tabs from "./Tabs";
import { Data_ } from "../../Adapter/types";
import DisplayTab from "./DisplayTab";

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

// eslint-disable-next-line react/destructuring-assignment
const Tab = (props) => <>{props.children}</>;

export default AvailabilityTabs;
