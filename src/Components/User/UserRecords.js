/* eslint-disable react/destructuring-assignment */
import { useState } from "react";
import { useSelector } from "react-redux";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import Table from "react-bootstrap/Table";
import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import history from "../../history";

const R = require("ramda");

const UserRecords = () => {
  const [search, setSearch] = useState("");
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
      <UserInput update={(e) => handleChange(e)} />
      <Recordz data={recordsByDate} />
    </div>
  );
};

const UserInput = (props) => (
  <div>
    <input
      className="form-control mb-2"
      style={{
        width: "30%",
        marginLeft: "35%",
        border: "2px solid green",
        marginTop: "1%",
      }}
      placeholder="Search Record..."
      onChange={(e) => props.update(e)}
    />
  </div>
);

const RecordsRow = (props) => {
  const { date, punchIn, punchOut } = props;
  return (
    <tr>
      <td>{date}</td>
      <td>{punchIn}</td>
      <td>{punchOut}</td>
    </tr>
  );
};

const Recordz = (props) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Date</th>
        <th>Punch In</th>
        <th>Punch Out</th>
      </tr>
    </thead>
    <tbody>
      {props.data.map((d) => (
        <RecordsRow date={d.date} punchIn={d.punchIn} punchOut={d.punchOut} />
      ))}
    </tbody>
  </Table>
);

export default UserRecords;
