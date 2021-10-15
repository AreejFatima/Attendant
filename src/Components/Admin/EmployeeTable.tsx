/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import {
  patchRecordData,
  patchEmployeeData,
  empType,
  recordType,
} from "../../Redux/Slices/adminSlice";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { getUsers, getRecords } from "../../Adapter/gists";
import SearchBar from "../User/SearchBar";
import Settings from "./Settings";

const R = require("ramda");

interface editUserType {
  username: string;
  dept: string;
  role: string;
  email: string;
}

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<empType[]>([]);
  const [records, setRecords] = useState<recordType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);
  const [snackMesage, setMessage] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  let tableData = [...employees];
  const [currentEmpId, setcurrentEmpId] = useState<empType>({
    id: null,
    dept: "",
    role: "",
    email: "",
    username: "",
    pincode: "",
  });
  const [editFormData, setEditFormData] = useState<editUserType>({
    username: "",
    dept: "",
    role: "",
    email: "",
  });

  const [addFormData, setAddFormData] = useState<editUserType>({
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

  function SnackBarClose(): void {
    setIsSnackOpen(false);
  }

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const searchValue = event.target.value;
    setSearch(searchValue);
  }

  const searchString: string = search;
  if (searchString.length > 0) {
    tableData = tableData.filter(
      (e) =>
        e.username.match(searchString) ||
        e.role.match(searchString) ||
        e.dept.match(searchString)
    );
  }

  // Deleting Employee and Records

  function removeEmployee(eid: string): void {
    setIsSnackOpen(true);
    setMessage("Employee Deleted Sucessfully!");
    const tempEmp: empType[] = [...employees];
    const tempRec: recordType[] = [...records];

    const toDelete: empType = R.find(R.propEq("id", eid), tempEmp);

    const toDeleteRec: recordType = R.find(R.propEq("id", eid), tempRec);

    const filteredRecords: recordType[] = tempRec.filter(
      (item) => item !== toDeleteRec
    );

    const filteredEmployees: empType[] = tempEmp.filter(
      (item) => item !== toDelete
    );
    dispatch(patchEmployeeData(filteredEmployees));
    dispatch(patchRecordData(filteredRecords));

    setTimeout(() => {
      const toDeleted: empType = R.find(R.propEq("id", eid))(employees);
      const filteredEmp: empType[] = employees.filter(
        (item) => item !== toDeleted
      );

      const toDeletedRec: recordType = R.find(R.propEq("id", eid))(records);
      const filteredRec: recordType[] = records.filter(
        (item) => item !== toDeletedRec
      );

      setEmployees(filteredEmp);
      setRecords(filteredRec);
    }, 1000);
  }
  function handleAdd(): void {
    setIsAdded(true);
  }
  function handleAddFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  }

  function pad(num: number | string, size) {
    num = num.toString();
    while (num.length < size) num = `0${num}`;
    return num;
  }

  function getId(dept: string): string {
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

  function handleAddFormSubmit(): void {
    const addedEmployee = {
      id: getId(addFormData.dept),
      username: addFormData.username,
      dept: addFormData.dept,
      role: addFormData.role,
      email: addFormData.email,
      pincode: "000000",
    };
    const addedRecord: recordType = {
      id: getId(addFormData.dept),
      Records: [{ date: "", punchIn: "", punchOut: "", workHours: 0 }],
    };

    const newRecords: recordType[] = [...records];
    newRecords.push(addedRecord);
    setRecords(newRecords);

    const newEmployees: empType[] = [...employees];
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
      dispatch(patchEmployeeData(newEmployees));
      dispatch(patchRecordData(newRecords));
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

  function handleEditFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  }

  function handleEditFormSave(): void {
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
      dispatch(patchEmployeeData(newEmployees));
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSnackOpen}
        autoHideDuration={3000}
        onClose={SnackBarClose}
        message={<span id="message-id">{snackMesage}</span>}
        action={[
          <IconButton
            key="close"
            arial-label="close"
            color="inherit"
            onClick={SnackBarClose}
          >
            x
          </IconButton>,
        ]}
      />
      <div className="aicon">
        <button onClick={() => history.push("AdminDashboard")}>
          <FaBackward size={30} />
        </button>
        <button onClick={() => history.push("AdminLogin")}>
          <BiLogOutCircle size={30} />
        </button>
      </div>
      <Settings />
      <div className="employee-settings">
        <h4
          style={{
            color: "#04aa6d",
            fontFamily: "sans-serif",
          }}
        >
          Employee Settings
        </h4>
        <SearchBar update={(event) => handleSearchChange(event)} />
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
      </div>
    </>
  );
};

export default EmployeeTable;
