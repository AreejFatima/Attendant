/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { getRecords, getUsers } from "../../Adapter/gists";
import { deleteEmployee } from "../../Redux/Slices/adminSlice";

const R = require("ramda");

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getUsers().then((data) => {
      setEmployees(JSON.parse(data));
    });
    getRecords().then((data) => {
      setRecords(JSON.parse(data));
    });
  }, []);

  // Deleting Employee and Records
  function removeEmployee(eid) {
    const payload = {
      data: employees,
      data_record: records,
      id: eid,
    };
    dispatch(deleteEmployee(payload));
    setTimeout(() => {
      const toDelete = R.find(R.propEq("id", eid))(employees);
      const filteredEmployees = employees.filter((item) => item !== toDelete);

      const toDeleteRec = R.find(R.propEq("id", eid))(records);
      const filteredrecords = records.filter((item) => item !== toDeleteRec);

      setEmployees(filteredEmployees);
      setRecords(filteredrecords);
    }, 500);
    alert("Deleted Sucessfully, Reload to see changes");
  }

  // Form Header
  function renderHeader() {
    const headerElement = ["EmployeeId", "Name", "Department"];
    return headerElement.map((key, index) => (
      <th key={index}>{key.toUpperCase()}</th>
    ));
  }
  // Form Body
  function renderBody() {
    return (
      employees &&
      employees.map(({ id, username, dept }) => (
        <tr>
          <td>{id}</td>
          <td>{username}</td>
          <td>{dept}</td>
          <td className="opration">
            <button className="button" onClick={() => removeEmployee(id)}>
              Delete
            </button>
          </td>
        </tr>
      ))
    );
  }

  return (
    <>
      <div className="aicon">
        <button onClick={() => history.push("AdminDashboard")}>
          <FaBackward size={30} />
        </button>
        <button onClick={() => history.push("AdminLogin")}>
          <BiLogOutCircle size={30} />
        </button>
      </div>
      <h1 id="Etitle">Employee List</h1>
      <table id="employee">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </>
  );
};

export default EmployeeTable;
