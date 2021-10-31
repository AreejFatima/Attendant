/* eslint-disable react/no-array-index-key */
import { ChangeEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector,RootStateOrAny } from "react-redux";
import * as R from "ramda";
import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import {
  patchRecordData,
  patchEmployeeData,
} from "../../Redux/Slices/adminSlice";
import { empType, recordType } from "../../Adapter/types";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { getUsers, getRecords } from "../../Adapter/gists";
import SearchBar from "../User/SearchBar";
import Modal from "./Modal";
import { avatar } from "../../avatar";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<empType[]>([]);
  const [errors, setErrors] = useState("");
  const [records, setRecords] = useState<recordType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);
  const [snackMesage, setMessage] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  let tableData = [...employees];
  const allEmployees: empType[] = useSelector(
    (state: RootStateOrAny) => state.admin.employees
  );
  const [currentEmpId, setcurrentEmpId] = useState<empType>({
    id: null,
    dept: "",
    role: "",
    email: "",
    username: "",
    pincode: "",
    phone: "",
    profilePic: "",
  });
  const [editFormData, setEditFormData] = useState<empType>({
    username: "",
    dept: "",
    role: "",
    email: "",
  });

  const [addFormData, setAddFormData] = useState<empType>({
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

  useEffect(() => {
    try {
      if (R.isEmpty(allEmployees)) {
        throw new TypeError("Cannot Display Settings, Employees Not Found");
      }
    } catch (error) {
      setErrors(error);
    }
  }, []);

  function SnackBarClose(): void {
    setIsSnackOpen(false);
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
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
    const toDeleteEmp: empType = R.find(R.propEq("id", eid), tempEmp);
    const toDeleteRec: recordType = R.find(R.propEq("id", eid), tempRec);

    const filteredRecords: recordType[] = tempRec.filter(
      (item) => item !== toDeleteRec
    );

    const filteredEmployees: empType[] = tempEmp.filter(
      (item) => item !== toDeleteEmp
    );

    dispatch(patchEmployeeData(filteredEmployees));
    dispatch(patchRecordData(filteredRecords));

    const deletedEmp: empType = R.find(R.propEq("id", eid))(employees);
    const filteredEmp: empType[] = employees.filter(
      (item) => item !== deletedEmp
    );

    const deletedRec: recordType = R.find(R.propEq("id", eid))(records);
    const filteredRec: recordType[] = records.filter(
      (item) => item !== deletedRec
    );

    setEmployees(filteredEmp);
    setRecords(filteredRec);
  }

  function handleAdd(): void {
    setIsAdded(true);
  }

  function handleAddFormChange(event: ChangeEvent<HTMLInputElement>) {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  }

  function pad(num: number | string, size: number) {
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
    if (
      !(
        addFormData.username === "" ||
        addFormData.dept === "" ||
        addFormData.role === "" ||
        addFormData.email === ""
      )
    ) {
      const addedEmployee = {
        id: getId(addFormData.dept),
        username: addFormData.username,
        dept: addFormData.dept,
        role: addFormData.role,
        email: addFormData.email,
        pincode: "000000",
        phone: "",
        profilePic: "",
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
      dispatch(patchEmployeeData(newEmployees));
      dispatch(patchRecordData(newRecords));
    } else {
      setIsSnackOpen(true);
      setMessage("Missing Values: Cannot add Employee :(");
    }
  }

  function editEmployee(employee: empType): void {
    const currentTemp = {
      id: employee.id,
      username: employee.username,
      dept: employee.dept,
      pincode: employee.pincode,
      role: employee.role,
      email: employee.email,
      phone: employee.phone,
      profilePic: employee.profilePic,
    };
    setcurrentEmpId(currentTemp);
    const tempEmp = {
      username: employee.username,
      dept: employee.dept,
      role: employee.role,
      email: employee.email,
    };
    setEditFormData(tempEmp);
  }

  function handleEditFormChange(event: ChangeEvent<HTMLInputElement>) {
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
      phone: currentEmpId.phone,
      profilePic: currentEmpId.profilePic,
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
      phone: "",
      profilePic: "",
    };
    setcurrentEmpId(initial);
  }

  // Form Header
  function renderHeader() {
    const headerElement = [
      "Name",
      "Department",
      "Role",
      "Email",
      "Profile",
      "Action",
    ];
    return headerElement.map((key, index) => (
      <th key={index}>{key.toUpperCase()}</th>
    ));
  }
  // Form Body
  function renderBody(data) {
    return (
      data &&
      data.map(
        ({ id, username, dept, pincode, role, email, phone, profilePic }) => (
          <>
            {currentEmpId.id === id ? (
              <EditableRow
                editFormData={editFormData}
                handleEditFormChange={handleEditFormChange}
                handleEditFormSave={handleEditFormSave}
                profilePic={profilePic}
              />
            ) : (
              <ReadOnlyRow
                id={id}
                username={username}
                dept={dept}
                pincode={pincode}
                role={role}
                email={email}
                phone={phone}
                profilePic={profilePic}
                removeEmployee={removeEmployee}
                editEmployee={editEmployee}
              />
            )}
          </>
        )
      )
    );
  }

  if (errors) {
    return <h1>{errors}</h1>;
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
      <Modal />
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
        <p style={{ fontStyle: "italic", color: "grey", fontSize: "13px" }}>
          Search by Name, Dept and Role
        </p>
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
                profilePic={avatar}
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
