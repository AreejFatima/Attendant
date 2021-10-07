import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import SearchBar from "../Components/User/SearchBar";
import RecordsTable from "../Components/User/RecordsTable";

const R = require("ramda");

const userRecordsPage = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const userRecords = useSelector((state) => state.user.userRecords);
  const id = useSelector((state) => state.user.activeUser.id);
  const allRecords = [];
  let recordsByDate = [];

  R.map((item) => {
    if (item.id === id) {
      allRecords.push(item.Records);
    }
  }, userRecords);

  R.map((item) => {
    R.map((subRecord) => {
      recordsByDate.push(subRecord);
    }, item);
  }, allRecords);

  function handleChange(event) {
    const searchValue = event.target.value;
    setSearch(searchValue);
  }

  const searchString = search;
  if (searchString.length > 0) {
    recordsByDate = recordsByDate.filter((e) => e.date.match(searchString));
  }

  return (
    <div>
      <div className="aicon">
        <button onClick={() => history.push("UserDashboard")}>
          <FaBackward size={30} />
        </button>
        <button onClick={() => history.push("/")}>
          <BiLogOutCircle size={30} />
        </button>
      </div>
      <SearchBar update={(e) => handleChange(e)} />
      <RecordsTable data={recordsByDate} />
    </div>
  );
};
export default userRecordsPage;
