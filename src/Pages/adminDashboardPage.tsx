import { useState, useEffect } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import * as R from "ramda";
import { AiFillSetting } from "react-icons/ai";
import "font-awesome/css/font-awesome.min.css";
import WorkHourTable from "../Components/Admin/WorkHourTable";
import AvailabilityTabs from "../Components/Admin/AvailabilityTabs";
import SearchBar from "../Components/User/SearchBar";
import { recordType, workType, allEmpType } from "../Adapter/types";
import { fetchUserDataFromGists } from "../Redux/Slices/userSlice";
import Auth from "../Routing/Auth";

const adminDashboardPage = (): JSX.Element => {
  const timestamp = R.split(", ", new Date().toLocaleString());
  const currentDate: string = timestamp[0];
  const [search, setSearch] = useState<string>("");
  const history = useHistory();
  const [workHourLog, setWHLog] = useState<workType[]>([]);
  const allEmployees: allEmpType[] = [];
  const available: string[] = [];
  const unavailable: string[] = [];
  let searchResults: allEmpType[] = [];
  const onleave: string[] = [];
  const recordz: recordType = useSelector(
    (state: RootStateOrAny) => state.user.userRecords
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDataFromGists());
    assembleWHdata(null);
  }, []);

  // Calculating work hours
  function assembleWHdata(event): void {
    const tempLogArr = [];
    const month = event ? event.target.value : 1;
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
          if (r.date === "" || (rdate >= lastNmonths && rdate <= todayDate)) {
            sum += r.workHours;
          }
          count += 1;
        }, item.Records);

        const tempLog: workType = {
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
  function assembleData(): void {
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

  function handleLogout() {
    Auth.signout();
    history.push("/AdminLogin");
  }
  // SearchBar
  function handleSearchChange(event): void {
    const searchValue = event.target.value;
    setSearch(searchValue);
  }

  const searchString: string = search;
  if (searchString.length > 0) {
    searchResults = allEmployees.filter((e) => e.id.match(searchString));
  }

  return (
    <div className="adminMain">
      <div className="aicon">
        <button onClick={handleLogout}>
          <FaBackward size={30} />
        </button>
        <button onClick={() => history.push("AdminSettings")}>
          <AiFillSetting size={30} />
        </button>
      </div>
      <div>
        <div className="split left">
          <SearchBar update={(e) => handleSearchChange(e)} />
          <p style={{ fontStyle: "italic", color: "grey", fontSize: "13px" }}>
            Search by ID
          </p>
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
            <button value="12" onClick={(e) => assembleWHdata(e)}>
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
          <WorkHourTable workHourLog={workHourLog} />
        </div>
      </div>
    </div>
  );
};

export default adminDashboardPage;
