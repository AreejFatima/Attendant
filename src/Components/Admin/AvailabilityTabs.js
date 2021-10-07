import { FaUserAlt } from "react-icons/fa";
import Tabs from "./Tabs";

const R = require("ramda");

const AvailabilityTabs = (props) => {
  const { available, unavailable, onleave } = props;
  return (
    <div className="tabs">
      <Tabs>
        <Tab label="Available">
          <div>
            {R.map(
              (item) => (
                <ul>
                  <li>
                    <span style={{ display: "flex" }}>
                      <FaUserAlt size={40} />
                      <h5 style={{ marginLeft: "10%", marginTop: "3%" }}>
                        {item}
                      </h5>
                    </span>
                  </li>
                </ul>
              ),
              available
            )}
          </div>
        </Tab>
        <Tab label="Unavailable">
          <div>
            {R.map(
              (item) => (
                <ul>
                  <li>
                    <span style={{ display: "flex" }}>
                      <FaUserAlt size={40} />
                      <h5 style={{ marginLeft: "10%", marginTop: "3%" }}>
                        {item}
                      </h5>
                    </span>
                  </li>
                </ul>
              ),
              unavailable
            )}
          </div>
        </Tab>
        <Tab label="OnLeave">
          <div>
            {R.map(
              (item) => (
                <ul>
                  <li>
                    <span style={{ display: "flex" }}>
                      <FaUserAlt size={40} />
                      <h5 style={{ marginLeft: "10%", marginTop: "3%" }}>
                        {item}
                      </h5>
                    </span>
                  </li>
                </ul>
              ),
              onleave
            )}
          </div>{" "}
        </Tab>
      </Tabs>
    </div>
  );
};

// eslint-disable-next-line react/destructuring-assignment
const Tab = (props) => <>{props.children}</>;

export default AvailabilityTabs;
