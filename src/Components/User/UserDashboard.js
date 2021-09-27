import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";
import { BiCalendarEvent, BiTimer, BiLogOut } from "react-icons/bi";
import { addRecord, setActiveUser } from "../../Redux/Slices/userSlice";
import history from "../../history";
import "../../App.css";

const R = require("ramda");

const UserDashboard = () => {
  const activeUser = useSelector((state) => state.user.activeUser);
  const [isWorking, setisWorking] = useState(false);
  const dispatch = useDispatch();

  function handlePunch() {
    const status = !isWorking;
    const timestamp = R.split(", ", new Date().toLocaleString());
    setisWorking(status);
    const payload = {
      status,
      id: activeUser.id,
      timestamp,
    };
    dispatch(addRecord(payload));
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

export default UserDashboard;
