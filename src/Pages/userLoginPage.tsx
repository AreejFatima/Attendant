/* eslint-disable jsx-a11y/label-has-associated-control */
import "../App.css";
import { useEffect } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import * as R from "ramda";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorDiv from "../Components/Shared/ErrorDiv";
import {
  setActiveUser,
  fetchUserDataFromGists,
} from "../Redux/Slices/userSlice";
import { empType, allEmpType} from "../Adapter/types";
import Auth from '../Routing/Auth'

const userLoginPage = (): JSX.Element => {
  const usersList: empType[] = useSelector(
    (state: RootStateOrAny) => state.user.allUsers
  );
  
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchUserDataFromGists());
  }, []);

  const initialValues: allEmpType = {
    id: "",
    pin: "",
  };

  const onSubmit = (values): void => {
    const enteredId = values.id;
    const enteredPin = values.pin;
    R.map((item) => {
      if (item.id === enteredId && item.pincode === enteredPin) {
        dispatch(setActiveUser(item));
        window.localStorage.setItem("activeUser", JSON.stringify(item));
        
      }
    }, usersList);
    Auth.authenticate()
    history.push("/UserDashboard");
  };

  const handleRegister = () => {
    history.push("/Register");
  };

  const validate = (values) => {
    const current = R.find(R.propEq("id", values.id))(usersList);
    const errors: any = {};
    if (current !== undefined) {
      if (!values.pin || values.pin.length > 6 || values.pin.length < 6)
        errors.pin = "pincode must be 6 digits long";
      else if (values.pin !== current.pincode)
        errors.pin = "Wrong Pincode Entered!";
    } else {
      errors.id = "Employee not found! Enter correct id";
    }
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
            Employee Login
          </h1>
          <div className="formik-login">
            <label htmlFor="id">Employee Id</label>
            <Field type="text" id="id" name="id" placeholder="XX-000" />
            <ErrorMessage name="id" component={ErrorDiv} />
            <label htmlFor="pin">Employee Pin</label>
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
            <button
              style={{ backgroundColor: "#04aa6d", margin: "2%" }}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </Form>
      </Formik>
      <p className="linkAdmin">
        Log In as <a href="/AdminLogin">Admin</a>
      </p>
    </div>
  );
};

export default userLoginPage;
