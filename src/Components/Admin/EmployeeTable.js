/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";
import {
  deleteEmployee,
  editEmployees,
  addRecord,
} from "../../Redux/Slices/adminSlice";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { getUsers, getRecords } from "../../Adapter/gists";
import SearchBar from "../User/SearchBar";

const R = require("ramda");

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  let tableData = [...employees];
  const [currentEmpId, setcurrentEmpId] = useState({
    id: null,
    dept: "",
    role: "",
    email: "",
    username: "",
    pincode: "",
  });
  const [editFormData, setEditFormData] = useState({
    username: "",
    dept: "",
    role: "",
    email: "",
  });

  const [addFormData, setAddFormData] = useState({
    username: "",
    dept: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    getUsers().then((data) => {
      setEmployees(JSON.parse(data));
    });
    getRecords().then((data) => {
      setRecords(JSON.parse(data));
    });
  }, []);

  function handleSearchChange(event) {
    const searchValue = event.target.value;
    setSearch(searchValue);
  }

  const searchString = search;
  if (searchString.length > 0) {
    tableData = tableData.filter(
      (e) =>
        e.username.match(searchString) ||
        e.role.match(searchString) ||
        e.dept.match(searchString)
    );
  }

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
  function handleAdd() {
    setIsAdded(true);
  }
  function handleAddFormChange(event) {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  }

  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = `0${num}`;
    return num;
  }

  function getId(dept) {
    const firstid = "000";
    if (R.isEmpty(employees)) {
      return `${dept}-${firstid}`;
    }
    const lastUser = R.last(employees);
    const intId = lastUser.id.split("-");
    const newId = parseInt(intId[1], 10) + 1;
    const padded = pad(newId, 3);
    return `${dept}-${padded}`;
  }

  function handleAddFormSubmit() {
    const addedEmployee = {
      id: getId(addFormData.dept),
      username: addFormData.username,
      dept: addFormData.dept,
      role: addFormData.role,
      email: addFormData.email,
      pincode: "000000",
    };
    const newRecord = {
      id: getId(addFormData.dept),
      Records: [{ date: "", punchIn: "", punchOut: "", workHours: 0 }],
    };
    const newEmployees = [...employees];
    newEmployees.push(addedEmployee);
    setEmployees(newEmployees);
    setIsAdded(false);
    const initial = {
      username: "",
      dept: "",
      role: "",
      email: "",
    };
    setAddFormData(initial);

    setTimeout(() => {
      dispatch(editEmployees(newEmployees));
      dispatch(addRecord(newRecord));
    }, 1000);
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
      username,
      dept,
      role,
      email,
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
    const editedEmployee = {
      id: currentEmpId.id,
      username: editFormData.username,
      dept: editFormData.dept,
      role: editFormData.role,
      email: editFormData.email,
      pincode: currentEmpId.pincode,
    };
    const newEmployees = [...employees];

    const index = employees.findIndex((emp) => emp.id === currentEmpId.id);

    newEmployees[index] = editedEmployee;

    setEmployees(newEmployees);

    setTimeout(() => {
      dispatch(editEmployees(newEmployees));
    }, 1000);

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
    const headerElement = ["Name", "Department", "Role", "Email", "Operations"];
    return headerElement.map((key, index) => (
      <th key={index}>{key.toUpperCase()}</th>
    ));
  }
  // Form Body
  function renderBody(data) {
    return (
      data &&
      data.map(({ id, username, dept, pincode, role, email }) => (
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
      <SearchBar update={(e) => handleSearchChange(e)} />
      <button className="add-emp" onClick={handleAdd}>
        <RiAddFill size={50} />
      </button>
      <table id="employee">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <>
          <tbody>{renderBody(tableData)}</tbody>
          {isAdded ? (
            <EditableRow
              editFormData={addFormData}
              handleEditFormChange={handleAddFormChange}
              handleEditFormSave={handleAddFormSubmit}
            />
          ) : null}
        </>
      </table>
    </>
  );
};

export default EmployeeTable;
