/* eslint-disable array-callback-return */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import "../../App.css";
import { getUsers, getRecords, getallGists } from "../gists";
import {
  setActiveUser,
  setInitialUsers,
  setInitialRecords,
} from "../../Redux/Slices/userSlice";

const R = require("ramda");

const Login = () => {
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState({});
  const [newUser, setNewBox] = useState(true);
  const usersList = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getallGists();
    setTimeout(() => {
      getUsers().then((data) => {
        dispatch(setInitialUsers(JSON.parse(data)));
      });
      getRecords().then((data) => {
        dispatch(setInitialRecords(JSON.parse(data)));
      });
    }, 1000);
  }, []);

  function findFormErrors() {
    const current = R.find(R.propEq("id", id))(usersList);
    // eslint-disable-next-line no-console
    console.log("current", current);
    const newErrors = {};
    if (current !== undefined) {
      if (!pin || pin.length > 6 || pin.length < 6)
        newErrors.pin = "pincode must be 6 digits long";
      else if (pin !== current.pincode)
        newErrors.pin = "Wrong Pincode Entered!";
    } else {
      newErrors.id = "Employee not found! Enter correct id";
    }
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (R.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const enteredId = event.target[1].value;
      const enteredPin = event.target[2].value;
      R.map((item) => {
        if (item.id === enteredId && item.pincode === enteredPin) {
          dispatch(setActiveUser(item));
        }
      }, usersList);
      history.push("/UserDashboard");
      setErrors(null);
    }
  }

  function handleRegister() {
    history.push("/Register");
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="New User"
            style={{ fontStyle: "italic", fontWeight: "bold", color: "green" }}
            defaultChecked={newUser}
            onChange={() => setNewBox(!newUser)}
          />
        </Form.Group>

        <Form.Group size="lg">
          <Form.Label>Enter Employee Id </Form.Label>
          <Form.Control
            placeholder="XX-000"
            autoFocus
            type="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            isInvalid={!!errors.id}
          />
          <Form.Control.Feedback type="invalid">
            {errors.id}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group size="lg">
          <Form.Label>Enter Pin </Form.Label>
          <Form.Control
            type='password'
            value={pin}
            placeholder="--6-digit-pin--"
            onChange={(e) => setPin(e.target.value)}
            isInvalid={!!errors.pin}
          />
          <Form.Control.Feedback type="invalid">
            {errors.pin}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          style={{ backgroundColor: "#04aa6d", margin: "2%" }}
          type="submit"
          disabled={newUser === true}
        >
          Log In
        </Button>

        <Button
          style={{ backgroundColor: "#04aa6d", margin: "2%" }}
          onClick={handleRegister}
          disabled={!newUser}
        >
          Register
        </Button>
      </Form>

      <p className="linkAdmin">
        Log In as <a href="/AdminLogin">Admin</a>
      </p>
    </div>
  );
};

export default Login;
