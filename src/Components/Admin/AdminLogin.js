import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import "../../App.css";

import { fetchDataFromGists } from "../../Redux/Slices/adminSlice";

const AdminLogin = () => {
  const [id, setId] = useState("");
  const history = useHistory();
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const ID = "AD-000";
  const PIN = "12345";

  useEffect(() => {
    dispatch(fetchDataFromGists());
  }, [dispatch]);

  function findFormErrors() {
    const newErrors = {};
    if (!id || id === "") newErrors.id = "Admin Id cannot be blank!";
    else if (id !== ID) newErrors.id = "Invalid Admin Id!";
    if (!pin || pin === "") newErrors.pin = "Pincode cannot be blank!";
    else if (pin !== PIN) newErrors.pin = "Invalid Pincode";
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors(null);
      history.push("/AdminDashboard");
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg">
          <Form.Label>Enter Admin Id </Form.Label>
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
            type="password"
            placeholder="*****"
            value={pin}
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
        >
          Log In
        </Button>
      </Form>

      <p className="linkAdmin">
        Log In as <a href="/">Employee</a>
      </p>
    </div>
  );
};

export default AdminLogin;
