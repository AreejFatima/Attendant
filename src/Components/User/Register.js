/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BiErrorCircle } from "react-icons/bi";

import {
  addUser,
  pushRecord,
  fetchUserDataFromGists,
} from "../../Redux/Slices/userSlice";

const R = require("ramda");

const Register = () => {
  const usersList = useSelector((state) => state.user.allUsers);
  const history = useHistory();
  const [record, setRecord] = useState({
    id: "",
    Records: [{ date: "", punchIn: "", punchOut: "", workHours: 0 }],
  });
  const [user, setUser] = useState({
    id: "",
    pincode: "",
    username: "",
    dept: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== "") {
      dispatch(fetchUserDataFromGists());
      dispatch(addUser(user));
    }
  }, [user]);

  useEffect(() => {
    if (record.id !== "") {
      dispatch(fetchUserDataFromGists());
      dispatch(pushRecord(record));
    }
  }, [record]);

  const initialValues = {
    name: "",
    pin: "",
    dept: "",
  };

  const onSubmit = (values) => {
    alert("Registered Sucessfully!!!");
    const tempObj = {
      id: getId(values.dept),
      pincode: values.pin,
      username: values.name,
      dept: values.dept,
    };
    const tempRecord = {
      id: getId(values.dept),
      Records: [{ date: "", punchIn: "", punchOut: "", workHours: 0 }],
    };
    console.log("tempRecord", tempRecord);
    console.log("tempUser", tempObj);
    console.log("id", getId(values.dept));
    setUser(tempObj);
    setRecord(tempRecord);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name || values.name === "")
      errors.name = "Enter Employee Username!";
    else if (values.name.length > 15) errors.name = "Name too long";
    if (!values.pin || values.pin.length > 6 || values.pin.length < 6)
      errors.pin = "pincode must be 6 digits long";
    return errors;
  };

  function backToLogin() {
    history.push("/");
  }

  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = `0${num}`;
    return num;
  }

  function getId(dept) {
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
      <p className="linkAdmin">
        Log In as <a href="/">Employee</a>
      </p>
    </div>
  );
};
const ErrorDiv = (props) => (
  <div className="error">
    <BiErrorCircle size={22} />
    {props.children}
  </div>
);

export default Register;
