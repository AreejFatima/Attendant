import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { getUsers, getRecords } from "../gists";
import {
  addUser,
  pushRecord,
  setInitialRecords,
  setInitialUsers,
} from "../../Redux/Slices/userSlice";

const R = require("ramda");

const Register = () => {
  const usersList = useSelector((state) => state.user.allUsers);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
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
      getUsers().then((data) => {
        dispatch(setInitialUsers(JSON.parse(data)));
      });
      dispatch(addUser(user));

      getRecords().then((data) => {
        dispatch(setInitialRecords(JSON.parse(data)));
      });
      dispatch(pushRecord(record));
    }
  }, [user]);

  function findFormErrors() {
    const newErrors = {};
    if (!name || name === "") newErrors.name = "Enter Employee Username!";
    else if (name.length > 15) newErrors.name = "Name too long";
    if (!pin || pin.length > 6 || pin.length < 6)
      newErrors.pin = "pincode must be 6 digits long";
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Registered Sucessfully!!!");
      const tempObj = {
        id: getId(event.target[0].value),
        pincode: event.target[2].value,
        username: event.target[1].value,
        dept: event.target[0].value,
      };
      const tempRecord = {
        id: getId(event.target[0].value),
        Records: [{ date: "", punchIn: "", punchOut: "", workHours: 0 }],
      };
      setUser(tempObj);
      setRecord(tempRecord);
    }
  }

  function backToLogin() {
    setErrors(null);
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
    <div className="Register">
      <h1
        style={{ color: "#04aa6d", fontFamily: "sans-serif", marginTop: "2%" }}
      >
        Registeration Form
      </h1>

      <Form onSubmit={handleSubmit} style={{ marginTop: "2%" }}>
        <Form.Group>
          <Form.Select
            aria-label="Floating label select example"
            style={{ width: "20%", marginLeft: "40%", marginBottom: "2%" }}
          >
            <option value="null">Select Department</option>
            <option value="FE">FE</option>
            <option value="BE">BE</option>
            <option value="QA">QA</option>
          </Form.Select>
        </Form.Group>

        <Form.Group size="lg">
          <Form.Label>Enter Full Name </Form.Label>
          <Form.Control
            autoFocus
            type="name"
            style={{ width: "20%", marginLeft: "40%", marginBottom: "2%" }}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group size="lg">
          <Form.Label>Enter New Pin </Form.Label>
          <Form.Control
            type="pin"
            style={{ width: "20%", marginLeft: "40%", marginBottom: "2%" }}
            onChange={(e) => setPin(e.target.value)}
            isInvalid={!!errors.pin}
          />
          <Form.Control.Feedback type="invalid">
            {errors.pin}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          block
          type="submit"
          style={{ backgroundColor: "#04aa6d", margin: "0.4%" }}
        >
          Register Me
        </Button>

        <Button
          block
          style={{ backgroundColor: "#04aa6d", margin: "0.4%" }}
          onClick={backToLogin}
        >
          Back to Login
        </Button>
      </Form>
    </div>
  );
};

export default Register;
