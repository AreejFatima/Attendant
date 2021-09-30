/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaUserAlt, FaSortUp, FaSortDown, FaBackward } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import "font-awesome/css/font-awesome.min.css";
import { fetchDataFromGists } from "../../Redux/Slices/adminSlice";

const R = require("ramda");

const AdminDashboard = () => {
  const timestamp = R.split(", ", new Date().toLocaleString());
  const currentDate = timestamp[0];
  const history = useHistory();
  const workHourLog = [];
  const available = [];
  const unavailable = [];
  const onleave = [];
  const recordz = useSelector((state) => state.admin.records);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFromGists());
  }, []);

  function assembleWHdata() {
    if (recordz) {
      R.map((item) => {
        let sum = 0;
        let count = 0;
        R.map((r) => {
          sum += r.workHours;
          count += 1;
        }, item.Records);
        const tempLog = {
          id: item.id,
          totalHours: sum,
          averageHours: sum / count,
        };
        workHourLog.push(tempLog);
      }, recordz);
    }
  }
  assembleWHdata();

  function assembleData() {
    if (recordz) {
      R.map((item) => {
        const last = R.last(item.Records);
        if (last.date === currentDate && last.punchOut === "") {
          if (!available.includes(item.id)) {
            available.push(item.id);
          }
        } else if (last.date === currentDate && last.punchOut !== "") {
          if (!unavailable.includes(item.id)) {
            unavailable.push(item.id);
          }
        } else if (!onleave.includes(item.id)) {
          onleave.push(item.id);
        }
      }, recordz);
    }
  }
  assembleData();

  return (
    <div className="adminMain">
      <div className="aicon">
        <button onClick={() => history.push("AdminLogin")}>
          <FaBackward size={30} />
        </button>
        <button onClick={() => history.push("AdminSettings")}>
          <AiFillSetting size={30} />
        </button>
      </div>
      <div>
        <div className="split left">
          <AvailabilityTabs
            available={available}
            unavailable={unavailable}
            onleave={onleave}
          />
        </div>

        <div className="split right">
          <WHTable data={workHourLog} />
        </div>
      </div>
    </div>
  );
};

const sortTypes = {
  up: {
    class: "sort-up",
    fn: (a, b) => a.totalHours - b.totalHours,
  },
  down: {
    class: "sort-down",
    fn: (a, b) => b.totalHours - a.totalHours,
  },
  default: {
    class: "sort",
    fn: (a) => a,
  },
};

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
const TabButtons = ({ buttons, changeTab, activeTab }) => (
  <div className="tab-buttons">
    {buttons.map((button) => (
      <button
        className={button === activeTab ? "active" : ""}
        onClick={() => changeTab(button)}
      >
        {button}
      </button>
    ))}
  </div>
);

const Tab = (props) => <>{props.children}</>;

const WHTable = (props) => {
  const [currentSort, setCurrentsort] = useState("default");

  const onSortChange = () => {
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setCurrentsort(nextSort);
  };

  const { data } = props;

  return (
    data.length > 0 && (
      <div className="wh">
        <h1>Employee Work Hours </h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>
                Total Hours
                <button onClick={onSortChange}>
                  {sortTypes[currentSort].class === "sort-up" ||
                  sortTypes[currentSort].class === "sort" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  )}
                </button>
              </th>
              <th>Average Hours</th>
            </tr>
          </thead>
          <tbody>
            {[...data].sort(sortTypes[currentSort].fn).map((p) => (
              <tr>
                <td>{p.id}</td>
                <td>{p.totalHours}hrs</td>
                <td>{p.averageHours}hrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default AdminDashboard;
