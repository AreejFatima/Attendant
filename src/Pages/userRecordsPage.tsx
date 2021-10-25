import { useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import SearchBar from "../Components/User/SearchBar";
import RecordsTable from "../Components/User/RecordsTable";
import { recordType, individualRecType } from "../Adapter/types";

const R = require("ramda");

const userRecordsPage = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const history = useHistory();
  const userRecords: recordType[] = useSelector(
    (state: RootStateOrAny) => state.user.userRecords
  );
  const id: string = useSelector(
    (state: RootStateOrAny) => state.user.activeUser.id
  );
  const allRecords = [];
  let recordsByDate: individualRecType[] = [];

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

  function handleChange(event): void {
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
      <p style={{ fontStyle: "italic", color: "grey", fontSize: "13px" }}>
        Search by Date
      </p>
      <RecordsTable data={recordsByDate} />
    </div>
  );
};
export default userRecordsPage;
