/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import ErrorDiv from "../Components/Shared/ErrorDiv";
import { recordType, empType } from "../Adapter/types";
import {
  fetchUserDataFromGists,
  patchUserData,
  patchUserRecords,
} from "../Redux/Slices/userSlice";

const R = require("ramda");

const userRegisterPage = () => {
  const usersList = useSelector((state: RootStateOrAny) => state.user.allUsers);
  const userRecordsList = useSelector(
    (state: RootStateOrAny) => state.user.userRecords
  );
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);
  const [snackMesage, setMessage] = useState<string>("");
  const history = useHistory();
  const [record, setRecord] = useState<recordType>({
    id: "",
    Records: [{ date: "", punchIn: "", punchOut: "", workHours: 0 }],
  });
  const [user, setUser] = useState<empType>({
    id: "",
    pincode: "",
    username: "",
    dept: "",
    role: "",
    email: "",
    phone:'',
    profilePic:''
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== "") {
      dispatch(fetchUserDataFromGists());
      const tempUsers = [...usersList];
      tempUsers.push(user);
      dispatch(patchUserData(tempUsers));
    }
  }, [user]);

  useEffect(() => {
    if (record.id !== "") {
      dispatch(fetchUserDataFromGists());
      const tempRecs = [...userRecordsList];
      tempRecs.push(record);
      dispatch(patchUserRecords(tempRecs));
    }
  }, [record]);

  function SnackBarClose(): void {
    setIsSnackOpen(false);
  }

  const initialValues = {
    name: "",
    pin: "",
    dept: "",
    email: "",
  };

  const onSubmit = (values): void => {
    setIsSnackOpen(true);
    setMessage("Registered Sucessfully!!!");
    const tempObj = {
      id: getId(values.dept),
      pincode: values.pin,
      username: values.name,
      dept: values.dept,
      email: values.email,
      role: "Not Assigned",
      phone:'',
      profilePic:'',
    };
    const tempRecord: recordType = {
      id: getId(values.dept),
      Records: [{ date: "", punchIn: "", punchOut: "", workHours: 0 }],
    };
    setUser(tempObj);
    setRecord(tempRecord);
  };

  const validate = (values) => {
    const errors: {
      name: string;
      pin: string;
      email: string;
    } = { name: "", pin: "", email: "" };
    if (!values.name || values.name === "")
      errors.name = "Enter Employee Username!";
    else if (values.name.length > 15) errors.name = "Name too long";
    if (!values.pin || values.pin.length > 6 || values.pin.length < 6)
      errors.pin = "pincode must be 6 digits long";
    if (!values.email) errors.email = "Required!";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = "Invalid Email!";
    return errors;
  };

  function backToLogin(): void {
    history.push("/");
  }

  function pad(num: number | string, size) {
    num = num.toString();
    while (num.length < size) num = `0${num}`;
    return num;
  }

  function getId(dept: string) {
    const firstid = "000";
    if (R.isEmpty(usersList)) {
      return `${dept}-${firstid}`;
    }
    const lastUser = R.last(usersList);
    const intId = lastUser.id.split("-");
    const newId = parseInt(intId[1], 10) + 1;
    const padded = pad(newId, 3);
    return `${dept}-${padded}`;
  }

  return (
    <div>
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
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form>
          <h1
            style={{
              color: "#04aa6d",
              fontFamily: "sans-serif",
              marginTop: "2%",
            }}
          >
            Registeration Form
          </h1>
          <div className="formik-login">
            <label htmlFor="dept">Select Department</label>
            <Field as="select" name="dept" id="dept">
              <option value="null">Select Department</option>
              <option value="FE">FE</option>
              <option value="BE">BE</option>
              <option value="QA">QA</option>
            </Field>

            <label htmlFor="name">Enter Full Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component={ErrorDiv} />

            <label htmlFor="email">Enter Email</label>
            <Field
              type="text"
              id="email"
              name="email"
              placeholder="name@example.com"
            />
            <ErrorMessage name="email" component={ErrorDiv} />

            <label htmlFor="pin">Enter New PinCode</label>
            <Field
              type="password"
              id="pin"
              name="pin"
              placeholder="--6-digit-pin--"
            />
            <ErrorMessage name="pin" component={ErrorDiv} />
            <br />

            <button
              type="submit"
              style={{ backgroundColor: "#04aa6d", margin: "2%" }}
            >
              Register Me
            </button>
            <button
              style={{ backgroundColor: "#04aa6d", margin: "2%" }}
              onClick={backToLogin}
            >
              Back to Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default userRegisterPage;
