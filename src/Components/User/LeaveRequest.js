/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import "../../App.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBackward } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { pushLeave } from "../../Redux/Slices/userSlice";

const LeaveRequest = () => {
  const id = useSelector((state) => state.user.activeUser.id);
  const history = useHistory();

  const [newLeave, setNewleave] = useState({
    userid: "",
    status: "",
    name: "",
    dept: "",
    type: "",
    days: "",
    reason: "",
    message: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (newLeave.id !== "") {
      dispatch(pushLeave(newLeave));
    }
  }, [newLeave]);

  function handleSubmit(event) {
    alert("leave submitted");
    event.preventDefault();
    const tempLeave = {
      userid: id,
      status: "pending",
      name: event.target[0].value,
      dept: event.target[1].value,
      type: event.target[2].value,
      days: event.target[3].value,
      reason: event.target[4].value,
      message: event.target[5].value,
    };
    setNewleave(tempLeave);
  }

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
      <div className="container">
        <h1
          style={{
            color: "#04aa6d",
            fontFamily: "sans-serif",
            marginTop: "2%",
          }}
        >
          Leave Application Form
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Employee Name</label>
          <input type="text" id="name" placeholder="Name" required />
          <label htmFor="department">Department</label>
          <input
            type="text"
            id="department"
            placeholder="Department Name"
            required
          />
          <label htmlFor="leaveType">Leave Type</label>
          <select id="leaveType" required>
            <option value="half">Half Leave</option>
            <option value="full">Full Leave</option>
          </select>
          <label htmlFor="days">No. of days</label>
          <input type="text" id="days" placeholder="Enter Days" required />
          <label htmlFor="reason">Reason For Leave</label>
          <select id="reason" required>
            <option value="sick">Sick Leave</option>
            <option value="vacation">Vacation Leave</option>
            <option value="annual">Annual Leave</option>
            <option value="other">Other</option>
          </select>
          <br />
          <label htmlFor="message">Message/Comments</label>
          <textarea id="message" cols="30" rows="10" placeholder="Message" />
          <button className="leaveSubmit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;
