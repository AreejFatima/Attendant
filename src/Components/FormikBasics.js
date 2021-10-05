/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import "../App.css";
import { useEffect } from "react";
 import {  useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BiErrorCircle } from "react-icons/bi";
import {
  fetchUserDataFromGists,
} from "../Redux/Slices/userSlice";

// const R = require("ramda");


const FormikBasics = () => {
  // const usersList = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUserDataFromGists());
  }, []);

  const initialValues = {
    name: "",
    pin: "",
  };

  const onSubmit = (values) => {
    console.log(values)
  };

  const handleRegister = () => {
    history.push("/Register");
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name || values.name === "") errors.name = "Enter Employee Username!";
    else if (values.name.length > 15) errors.name = "Name too long";
    if (!values.pin || values.pin.length > 6 || values.pin.length < 6) errors.pin = "pincode must be 6 digits long";
    return errors;
  };
  return (
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
          <Field as="select" name="department">
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
            onClick={handleRegister}
          >
            Back to Login
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

export default FormikBasics;
