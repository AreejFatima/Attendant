/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import "../../App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BiErrorCircle } from "react-icons/bi";
import { pushLeave } from "../../Redux/Slices/userSlice";

const LeaveRequest = () => {
  const id = useSelector((state) => state.user.activeUser.id);
  const [newLeave, setNewLeave] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (newLeave !== "") {
      dispatch(pushLeave(newLeave));
    }
  }, [newLeave]);

  const initialValues = {
    name: "",
    dept: "",
    type: "",
    days: 0,
    reason: "",
    message: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    alert("leave submitted");
    const tempLeave = {
      userid: id,
      status: "pending",
      name: values.name,
      dept: values.dept,
      type: values.type,
      days: values.days,
      reason: values.reason,
      message: values.message,
    };
    setNewLeave(tempLeave);
    history.push("/UserDashboard");
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Required!";
    else if (values.dept==='null') errors.dept = "Required!";
    else if (values.reason==='null') errors.reason = "Required!";
    else if (values.type==='null') errors.type = "Required!";
    else if (!values.days) errors.days = "Required!";
    return errors;
  };
  return (
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
  );
};

const ErrorDiv = (props) => (
  <div className="error">
    <BiErrorCircle size={22} />
    {props.children}
  </div>
);

export default LeaveRequest;
