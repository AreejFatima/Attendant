/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

import { deleteEmployee, editEmployees } from "../../Redux/Slices/adminSlice";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { getUsers, getRecords } from "../../Adapter/gists";

const R = require("ramda");

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentEmpId, setcurrentEmpId] = useState({
    id: null,
    dept: "",
    role: "",
    email: "",
    username: "",
    pincode: "",
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    username: "",
    dept: "",
  });

  useEffect(() => {
    getUsers().then((data) => {
      console.log(JSON.parse(data));
      setEmployees(JSON.parse(data));
    });
    getRecords().then((data) => {
      console.log(JSON.parse(data));
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
    }, 1000);
    // alert("Deleted Sucessfully, Reload to see changes");
  }

  function editEmployee(event, id, username, dept, pincode, role, email) {
    const currentTemp = {
      id,
      username,
      dept,
      pincode,
      role,
      email,
    };
    setcurrentEmpId(currentTemp);
    const tempEmp = {
      id,
      username,
      dept,
    };
    setEditFormData(tempEmp);
  }

  function handleEditFormChange(event) {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  }

  function handleEditFormSave() {
    console.log("ok");
    const editedEmployee = {
      id: currentEmpId.id,
      username: editFormData.username,
      dept: editFormData.dept,
      role: currentEmpId.role,
      email: currentEmpId.role,
      pincode: currentEmpId.pincode,
    };
    console.log(editedEmployee);
    const newEmployees = [...employees];

    const index = employees.findIndex((emp) => emp.id === currentEmpId.id);

    newEmployees[index] = editedEmployee;

    setEmployees(newEmployees);

    setTimeout(() => {
      dispatch(editEmployees(newEmployees));
    }, 1000);

    console.log("newList", newEmployees);

    const initial = {
      id: null,
      dept: "",
      role: "",
      email: "",
      username: "",
      pincode: "",
    };
    setcurrentEmpId(initial);
  }

  // Form Header
  function renderHeader() {
    const headerElement = ["EmployeeId", "Name", "Department", "Operations"];
    return headerElement.map((key, index) => (
      <th key={index}>{key.toUpperCase()}</th>
    ));
  }
  // Form Body
  function renderBody() {
    return (
      employees &&
      employees.map(({ id, username, dept, pincode, role, email }) => (
        <>
          {currentEmpId.id === id ? (
            <EditableRow
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
              handleEditFormSave={handleEditFormSave}
            />
          ) : (
            <ReadOnlyRow
              id={id}
              username={username}
              dept={dept}
              pincode={pincode}
              role={role}
              email={email}
              removeEmployee={removeEmployee}
              editEmployee={editEmployee}
            />
          )}
        </>
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
