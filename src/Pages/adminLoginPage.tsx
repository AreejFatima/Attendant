/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css";
import { fetchDataFromGists } from "../Redux/Slices/adminSlice";
import ErrorDiv from "../Components/Shared/ErrorDiv";

interface initialType {
  id: string;
  pin: string;
}
const adminLoginPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const ID: string = "AD-000";
  const PIN: string = "12345";

  // Fetching Records and users from gists
  useEffect(() => {
    dispatch(fetchDataFromGists());
  }, [dispatch]);

  const initialValues: initialType = {
    id: "",
    pin: "",
  };

  const onSubmit = (): void => {
    history.push("/AdminDashboard");
  };
  const validate = (values: initialType) => {
    const errors: any = {};
    if (!values.id || values.id === "") errors.id = "Admin Id cannot be blank!";
    else if (values.id !== ID) errors.id = "Invalid Admin Id!";
    if (!values.pin || values.pin === "")
      errors.pin = "Pincode cannot be blank!";
    else if (values.pin !== PIN) errors.pin = "Invalid Pincode";
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
          <h1
            style={{
              color: "#04aa6d",
              fontFamily: "sans-serif",
              marginTop: "2%",
            }}
          >
            Admin Login
          </h1>
          <div className="formik-login">
            <label htmlFor="id">Admin Id</label>
            <Field type="text" id="id" name="id" placeholder="XX-000" />
            <ErrorMessage name="id" component={ErrorDiv} />

            <label htmlFor="pin">Admin Pincode</label>
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
              Login
            </button>
          </div>
        </Form>
      </Formik>
      <p className="linkAdmin">
        Log In as <a href="/"> Employee</a>
      </p>
    </div>
  );
};

export default adminLoginPage;
