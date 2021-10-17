/* eslint-disable jsx-a11y/label-has-associated-control */
import "../App.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { patchLeaveData } from "../Redux/Slices/userSlice";
import ErrorDiv from "../Components/Shared/ErrorDiv";
import { leaveType } from "../Redux/Slices/adminSlice";

const R = require("ramda");

const userLeavePage: React.FC = () => {
  const id = useSelector((state: RootStateOrAny) => state.user.activeUser.id);
  const stateLeaves: leaveType[] = useSelector(
    (state: RootStateOrAny) => state.user.leaves
  );
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMesage, setMessage] = useState<string>("");
  const [newLeave, setNewLeave] = useState<leaveType>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (newLeave !== null) {
      const tempLeave: leaveType[] = [...stateLeaves];
      tempLeave.push(newLeave);
      dispatch(patchLeaveData(tempLeave));
    }
  }, [newLeave]);

  function SnackBarClose(): void {
    setIsSnackOpen(false);
  }

  const initialValues = {
    name: "",
    dept: "",
    type: "",
    days: 0,
    reason: "",
    message: "",
    appliedOn:"",
  };

  const onSubmit = (values) => {
    const date = R.split(", ", new Date().toLocaleString());
    setIsSnackOpen(true);
    setMessage("Leave Submitted!");
    const tempLeave: leaveType = {
      userid: id,
      status: "pending",
      name: values.name,
      dept: values.dept,
      type: values.type,
      days: values.days,
      reason: values.reason,
      message: values.message,
      appliedOn:date[0]
    };
    setNewLeave(tempLeave);
    history.push("/UserDashboard");
  };

  const validate = (values): void => {
    const errors: any = {};
    if (!values.name) errors.name = "Required!";
    else if (values.dept === "null") errors.dept = "Required!";
    else if (values.reason === "null") errors.reason = "Required!";
    else if (values.type === "null") errors.type = "Required!";
    else if (!values.days) errors.days = "Required!";
    return errors;
  };
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
          <h3
            style={{
              color: "#04aa6d",
              fontFamily: "sans-serif",
              marginTop: "2%",
            }}
          >
            Leave Application Form
          </h3>
          <div className="formik-leave">
            <label htmlFor="name">Enter Full Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component={ErrorDiv} />

            <label htmlFor="dept">Select Department</label>
            <Field as="select" name="dept">
              <option value="null">Select Department</option>
              <option value="FE">FE</option>
              <option value="BE">BE</option>
              <option value="QA">QA</option>
            </Field>
            <ErrorMessage name="dept" component={ErrorDiv} />

            <label htmlFor="type">Select Leave Type</label>
            <Field as="select" name="type">
              <option value="null">Leave Type</option>
              <option value="HalfLeave">Half Leave</option>
              <option value="FullLeave">Full Leave</option>
            </Field>
            <ErrorMessage name="type" component={ErrorDiv} />

            <label htmlFor="days">Enter Days</label>
            <Field type="number" id="days" name="days" />
            <ErrorMessage name="days" component={ErrorDiv} />

            <label htmlFor="reason">Tell your Reason</label>
            <Field as="select" name="reason" className="select">
              <option value="null">Reason for Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="vacation">Vacation Leave</option>
              <option value="annual">Annual Leave</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage name="reason" component={ErrorDiv} />

            <label htmlFor="message">Message</label>
            <Field as="textarea" id="message" name="message" />
            <ErrorMessage name="message" component={ErrorDiv} />
            <button
              type="submit"
              style={{
                backgroundColor: "#04aa6d",
                marginRight: "46%",
                marginBottom: "4%",
              }}
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default userLeavePage;
