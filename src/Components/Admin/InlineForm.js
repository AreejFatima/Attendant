/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../App.css";
import ErrorDiv from "../Shared/ErrorDiv";
import {
  addEmployee,
  addRecord,
  fetchDataFromGists,
} from "../../Redux/Slices/adminSlice";

const R = require("ramda");

const InlineForm = ({ setEmployees, setRecords }) => {
  const usersList = useSelector((state) => state.admin.employees);
  const recordsList = useSelector((state) => state.admin.records);
  const [recordl, setRecordl] = useState({
    id: "",
    Records: [{ date: "", punchIn: "", punchOut: "", workHours: 0 }],
  });
  const [user, setUser] = useState({
    id: "",
    pincode: "",
    username: "",
    dept: "",
    role: "",
    email: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id !== "") {
      dispatch(fetchDataFromGists());
      dispatch(addEmployee(user));
    }
    setTimeout(() => {
      setEmployees(usersList);
    }, 500);
  }, [user]);

  useEffect(() => {
    if (recordl.id !== "") {
      dispatch(fetchDataFromGists());
      dispatch(addRecord(recordl));
    }
    setTimeout(() => {
      setRecords(recordsList);
    }, 500);
  }, [recordl]);

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
  const initialValues = {
    name: "",
    email: "",
    dept: "",
    role: "",
  };

  const onSubmit = (values) => {
    const newEmp = {
      id: getId(values.dept),
      pincode: "000000",
      username: values.name,
      dept: values.dept,
      role: values.role,
      email: values.email,
    };
    const newRecord = {
      id: getId(values.dept),
      Records: [{ date: "", punchIn: "", punchOut: "", workHours: 0 }],
    };
    setUser(newEmp);
    setRecordl(newRecord);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Required!";
    if (values.dept === "null") errors.dept = "Required!";
    if (values.role === "null") errors.role = "Required!";
    if (!values.email) errors.email = "Required!";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = "Invalid Email!";
    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form>
          <h4
            style={{
              color: "black",
              fontFamily: "sans-serif",
              marginTop: "2%",
            }}
          >
            Add New Employee
          </h4>
          <div className="formik-emp">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" placeholder="Sarah" />
            <ErrorMessage name="name" component={ErrorDiv} />

            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="sarah@example.com"
            />
            <ErrorMessage name="email" component={ErrorDiv} />

            <label htmlFor="dept">Department</label>
            <Field as="select" name="dept" id="dept">
              <option value="null">Select Department</option>
              <option value="FE">FE</option>
              <option value="BE">BE</option>
              <option value="QA">QA</option>
            </Field>
            <ErrorMessage name="dept" component={ErrorDiv} />

            <label htmlFor="role">Role</label>
            <Field as="select" name="role" id="role">
              <option value="null">Assign Roll</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
              <option value="Accountant">Accountant</option>
              <option value="HR">HR Officer</option>
            </Field>
            <ErrorMessage name="role" component={ErrorDiv} />

            <button type="submit" style={{ backgroundColor: "#04aa6d" }}>
              Add
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InlineForm;
