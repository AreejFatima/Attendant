/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";
import { BiCalendarEvent, BiTimer, BiLogOut } from "react-icons/bi";
import { patchUserRecords, setActiveUser } from "../Redux/Slices/userSlice";

import "../App.css";

const R = require("ramda");

// Calculating Employee Work Hours (Seconds returned and used for testing)
function calculateWorkHours(st, et) {
  const startTime = moment(st, "HH:mm:ss A");
  const endTime = moment(et, "HH:mm:ss A");
  const duration = moment.duration(endTime.diff(startTime));
  const hours = parseInt(duration.asHours(), 10);
  const minutes = parseInt(duration.asMinutes(), 10) % 60;
  const seconds = parseInt(duration.asSeconds(), 10);
  // const result = hours + " hour and " + minutes + " minutes.";
  return seconds;
}

const userDashboardPage = () => {
  const activeUser = useSelector((state) => state.user.activeUser);
  const userRecords = useSelector((state) => state.user.userRecords);
  const [isWorking, setisWorking] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  function addUserRecord(userRecordsArray, id, status, timestamp) {
    const tempRec = R.clone(userRecordsArray);

    const userRecord = R.findIndex(R.propEq("id", id), tempRec);

    if (status) {
      const newRecord = {
        date: timestamp[0],
        punchIn: timestamp[1],
        punchOut: "",
        workHours: 0,
      };
      tempRec[userRecord].Records.push(newRecord);
      dispatch(patchUserRecords(tempRec));
    } else {
      const lastRecord = R.last(tempRec[userRecord].Records);
      lastRecord.punchOut = timestamp[1];
      const start = lastRecord.punchIn;
      const end = timestamp[1];
      const totalHours = calculateWorkHours(start, end);
      lastRecord.workHours = totalHours;
      dispatch(patchUserRecords(tempRec));
    }
  }

  function handlePunch() {
    const status = !isWorking;
    const timestamp = R.split(", ", new Date().toLocaleString());
    setisWorking(status);
    addUserRecord(userRecords, activeUser.id, status, timestamp);
  }

  function handleLogout() {
    const inactive = {
      id: "",
      pincode: "",
      username: "",
      dept: "",
    };
    dispatch(setActiveUser(inactive));
    history.push("/");
  }

  return (
    <div>
      <div className="avatar">
        <div className="avatar__letters">{`Hi ${
          activeUser.username ? activeUser.username : "User"
        }`}</div>
      </div>
      <div className="buttons">
        {!isWorking && (
          <button className="btnz" onClick={handlePunch}>
            <CgArrowLongRight size={40} className="cb" /> <p>Punch In</p>
          </button>
        )}
        {isWorking && (
          <button className="btnz" onClick={handlePunch}>
            <CgArrowLongLeft size={40} /> <p>Punch Out</p>
          </button>
        )}

        <button className="btnz" onClick={() => history.push("/LeaveRequest")}>
          <BiCalendarEvent size={40} />
          <p> Apply for Leave</p>
        </button>
        <button className="btnz" onClick={() => history.push("/UserRecords")}>
          <BiTimer size={40} />
          <p>Show Records</p>
        </button>
        <button className="btnz" onClick={handleLogout}>
          <BiLogOut size={40} /> <p>LogOut </p>
        </button>
      </div>
    </div>
  );
};

export default userDashboardPage;
