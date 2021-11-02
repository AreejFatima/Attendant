/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as R from "ramda";
import { fetchUserDataFromGists } from "../Redux/Slices/userSlice";
import ErrorDiv from "../Components/Shared/ErrorDiv";
import { allEmpType, empType } from "../Adapter/types";
import Auth from "../Routing/Auth";

const adminLoginPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const usersList: empType[] = useSelector(
    (state: RootStateOrAny) => state.user.allUsers
  );
  const admin = R.find(R.propEq("role", "ADMIN"))(usersList);
  // Fetching Records and users from gists
  useEffect(() => {
    dispatch(fetchUserDataFromGists());
  }, []);

  const initialValues: allEmpType = {
    id: "",
    pin: "",
  };

  const onSubmit = (): void => {
    Auth.authenticate()
    history.push("/AdminDashboard");
  };
  const validate = (values: allEmpType) => {
    const errors: any = {};
    if (!values.id || values.id === "") errors.id = "Admin Id cannot be blank!";
    else if (values.id !== admin.id) errors.id = "Invalid Admin Id!";
    if (!values.pin || values.pin === "")
      errors.pin = "Pincode cannot be blank!";
    else if (values.pin !== admin.pincode) errors.pin = "Invalid Pincode";
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
