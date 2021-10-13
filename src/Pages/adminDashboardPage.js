import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import "font-awesome/css/font-awesome.min.css";
import { fetchDataFromGists } from "../Redux/Slices/adminSlice";
import WorkHourTable from "../Components/Admin/WorkHourTable";
import AvailabilityTabs from "../Components/Admin/AvailabilityTabs";
import SearchBar from "../Components/User/SearchBar";

const R = require("ramda");

const adminDashboardPage = () => {
  const timestamp = R.split(", ", new Date().toLocaleString());
  const currentDate = timestamp[0];
  const [search, setSearch] = useState("");
  const history = useHistory();
  const [workHourLog, setWHLog] = useState([]);
  const allEmployees = [];
  const available = [];
  const unavailable = [];
  let searchResults = [];
  const onleave = [];
  const recordz = useSelector((state) => state.admin.records);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFromGists());
    assembleWHdata();
  }, []);

  // Calculating work hours
  function assembleWHdata(event) {
    const tempLogArr = [];
    const month = event ? event.target.value : 0;

    const currentdate = new Date();
    const todayDate = Date.parse(
      R.split(", ", currentDate.toLocaleString())[0]
    );
    const temp = new Date(currentdate.setMonth(currentdate.getMonth() - month));
    const lastNmonths = Date.parse(R.split(", ", temp.toLocaleString())[0]);

    if (recordz) {
      R.map((item) => {
        let sum = 0;
        let count = 0;
        R.map((r) => {
          const rdate = Date.parse(r.date);
          if (rdate === "" || (rdate >= lastNmonths && rdate <= todayDate)) {
            sum += r.workHours;
          }
          count += 1;
        }, item.Records);

        const tempLog = {
          id: item.id,
          totalHours: sum,
          averageHours: sum / count,
        };
        tempLogArr.push(tempLog);
      }, recordz);
    }
    setWHLog(tempLogArr);
  }

  // Finding Available, onLeave & Unavailable Employees
  function assembleData() {
    if (recordz) {
      R.map((item) => {
        const last = R.last(item.Records);
        if (last.date === currentDate && last.punchOut === "") {
          if (!available.includes(item.id)) {
            available.push(item.id);
            const temp = {
              id: item.id,
              status: "Available",
            };
            allEmployees.push(temp);
          }
        } else if (last.date === currentDate && last.punchOut !== "") {
          if (!unavailable.includes(item.id)) {
            unavailable.push(item.id);
            const temp = {
              id: item.id,
              status: "UnAvailable",
            };
            allEmployees.push(temp);
          }
        } else if (!onleave.includes(item.id)) {
          onleave.push(item.id);
          const temp = {
            id: item.id,
            status: "On Leave",
          };
          allEmployees.push(temp);
        }
      }, recordz);
    }
  }
  assembleData();
  // SearchBar
  function handleSearchChange(event) {
    const searchValue = event.target.value;
    setSearch(searchValue);
  }

  const searchString = search;
  if (searchString.length > 0) {
    searchResults = allEmployees.filter((e) => e.id.match(searchString));
  }

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
          <SearchBar update={(e) => handleSearchChange(e)} />
          {R.isEmpty(searchResults) ? (
            <AvailabilityTabs
              available={available}
              unavailable={unavailable}
              onleave={onleave}
            />
          ) : null}

          {R.isEmpty(searchResults) ? null : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((e) => (
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="split right">
          <h2>Employee Work Hours </h2>
          <div className="btn-group">
            <button value="0" onClick={(e) => assembleWHdata(e)}>
              All
            </button>
            <button value="1" onClick={(e) => assembleWHdata(e)}>
              1 month
            </button>
            <button value="3" onClick={(e) => assembleWHdata(e)}>
              3 month
            </button>
            <button value="6" onClick={(e) => assembleWHdata(e)}>
              6 month
            </button>
            <button value="12" onClick={(e) => assembleWHdata(e)}>
              12 month
            </button>
          </div>
          <WorkHourTable data={workHourLog} />
        </div>
      </div>
    </div>
  );
};

export default adminDashboardPage;
