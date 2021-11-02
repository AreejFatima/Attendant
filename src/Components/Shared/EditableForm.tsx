/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import * as R from "ramda";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import ErrorDiv from "./ErrorDiv";
import { empType, errorType } from "../../Adapter/types";
import {
  fetchUserDataFromGists,
  patchUserData,
  setActiveUser,
} from "../../Redux/Slices/userSlice";

const EditableForm = ({
  id,
  role,
  pincode,
  username,
  dept,
  email,
  phone,
  profilePic,
  showEditForm,
}) => {
  const usersList: empType[] = useSelector(
    (state: RootStateOrAny) => state.user.allUsers
  );

  const initialValues = {
    pincode,
    dept,
    username,
    email,
    phone,
  };
  const [isSnackOpen, setIsSnackOpen] = useState<boolean>(false);
  const [snackMesage, setMessage] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDataFromGists);
    dispatch(
      setActiveUser(JSON.parse(window.localStorage.getItem("activeUser")))
    );
  }, []);

  function SnackBarClose(): void {
    setIsSnackOpen(false);
  }

  function validate(values): errorType {
    let errors: errorType = {
      username: "",
      pincode: "",
      email: "",
      phone: "",
      dept: "",
    };
    if (!values.username || values.username === "") {
      errors.username = "Enter Employee Username!";
    } else if (values.username.length > 15) errors.username = "Name too long";
    else if (values.dept === "null") errors.dept = "Department can't be empty!";
    else if (
      !values.pincode ||
      values.pincode.length > 6 ||
      values.pincode.length < 6
    )
      errors.pincode = "pincode must be 6 digits long";
    else if (!values.email) errors.email = "Required!";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      errors.email = "Invalid Email!";
    else if (!values.phone) errors.phone = "Required!";
    else if (
      !/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{6,6}$/im.test(
        values.phone
      )
    )
      errors.phone = "Invalid Phone Number!";
    else {
      errors = {};
    }
    return errors;
  }

  function onSubmit(values): void {
    setIsSnackOpen(true);
    setMessage("User Details Edited!");
    const tempUsers = R.clone(usersList);
    const index = R.findIndex(R.propEq("id", id))(tempUsers);
    const editedUser: empType = {
      id,
      pincode: values.pincode,
      username: values.username,
      dept: values.dept,
      email: values.email,
      role,
      phone: values.phone,
      profilePic,
    };
    tempUsers[index] = editedUser;
    dispatch(patchUserData(tempUsers));
    localStorage.activeUser = JSON.stringify(editedUser);
    dispatch(setActiveUser(editedUser));
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
        {showEditForm === true ? (
          <Form>
            <h4
              style={{
                color: "#04aa6d",
                fontFamily: "sans-serif",
                marginTop: "2%",
              }}
            >
              Edit Employee Details
            </h4>
            <div className="formik-leave">
              <label htmlFor="username">Name</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component={ErrorDiv} />

              <label htmlFor="dept">Select Department</label>
              <Field as="select" name="dept">
                <option value="null">Department</option>
                <option value="FE">FE</option>
                <option value="BE">BE</option>
                <option value="QA">QA</option>
              </Field>
              <ErrorMessage name="dept" component={ErrorDiv} />

              <label htmlFor="email">Email</label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="name@example.com"
              />
              <ErrorMessage name="email" component={ErrorDiv} />

              <label htmlFor="phone">Phone Number</label>
              <Field
                type="text"
                id="phone"
                name="phone"
                placeholder="+923000000000"
              />
              <ErrorMessage name="phone" component={ErrorDiv} />

              <label htmlFor="pincode">Enter New PinCode</label>
              <Field
                type="password"
                id="pincode"
                name="pincode"
                placeholder="--6-digit-pin--"
              />
              <ErrorMessage name="pincode" component={ErrorDiv} />
              <br />

              <button
                type="submit"
                style={{
                  backgroundColor: "#04aa6d",
                  marginLeft: "40%",
                  marginBottom: "4%",
                }}
              >
                Submit
              </button>
            </div>
          </Form>
        ) : null}
      </Formik>
    </div>
  );
};
export default EditableForm;
