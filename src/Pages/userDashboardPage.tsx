/* eslint-disable no-lone-blocks */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import * as R from "ramda";
import { useEffect, useState } from "react";
import moment from "moment";
import { CgArrowLongRight, CgArrowLongLeft } from "react-icons/cg";
import { BiCalendarEvent, BiTimer, BiLogOut } from "react-icons/bi";
import {
  patchUserRecords,
  setActiveUser,
  fetchUserDataFromGists,
} from "../Redux/Slices/userSlice";
import { leaveType, recordType, empType } from "../Adapter/types";
import ErrorBoundary from "../Components/Shared/ErrorBoundary";

function calculateWorkHours(st: string, et: string) {
  const startTime = moment(st, "HH:mm:ss A");
  const endTime = moment(et, "HH:mm:ss A");
  const duration = moment.duration(endTime.diff(startTime));
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes()) % 60;
  const seconds = Math.floor(duration.asSeconds());

  // const result = hours + " hour and " + minutes + " minutes.";
  return seconds;
}

const userDashboardPage = () => {
  const [errors, setErrors] = useState("");
  const activeUser = useSelector(
    (state: RootStateOrAny) => state.user.activeUser
  );
  const userRecords: recordType[] = useSelector(
    (state: RootStateOrAny) => state.user.userRecords
  );
  const [isWorking, setisWorking] = useState<boolean>(false);
  const [isDisabled, setisDisabled] = useState<boolean>(false);
  const date = R.split(", ", new Date().toLocaleString());
  const userLeaves: leaveType[] = useSelector(
    (state: RootStateOrAny) => state.user.leaves
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDataFromGists());
  }, []);

  useEffect(() => {
    try {
      if (!R.isEmpty(activeUser)) {
        const checkUser = R.find(R.propEq("userid", activeUser.id))(userLeaves);
        const checkDate = checkUser !== undefined ? checkUser.appliedOn : null;
        if (checkDate === date[0]) {
          setisDisabled(true);
        } else {
          setisDisabled(false);
        }
      } else {
        throw new TypeError("Cannot Display Dashboard, No User is Active");
      }
    } catch (error) {
      setErrors(error);
    }
  }, []);

  function addUserRecord(
    userRecordsArray: recordType[],
    id: string,
    status: boolean,
    timestamp
  ) {
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

  function handlePunch(): void {
    try {
      const status = !isWorking;
      const timestamp = R.split(", ", new Date().toLocaleString());
      setisWorking(status);
      addUserRecord(userRecords, activeUser.id, status, timestamp);
    } catch (error) {
      setErrors(error);
    }
  }

  function handleLogout(): void {
    const inactive = {
      id: "",
      pincode: "",
      username: "",
      dept: "",
      email: "",
      role: "",
      phone: "",
      profilePic: "",
    };
    dispatch(setActiveUser(inactive));
    history.push("/");
  }

  function handleProfile() {
    const temp = {
      user: activeUser,
      role: "user",
    };
    history.push({
      pathname: "/UserProfile",
      state: temp,
    });
  }

  function handleRecords() {
    try {
      history.push("/UserRecords");
    } catch (error) {
      setErrors(error);
    }
  }

  {
    if (errors) {
      return <h1>{errors}</h1>;
    }
    return (
      <div>
        {!R.isEmpty(activeUser) ? (
          <img src={activeUser.profilePic} alt="Not Found" className="avatar" />
        ) : (
          <div className="avatar" style={{ marginLeft: "46%" }}>
            <div className="avatar__letters">{`Hi ${
              activeUser.username ? activeUser.username : "User"
            }`}</div>
          </div>
        )}
        <br />
        <h2 style={{ marginTop: "2%" }} className="title">
          Hi, {activeUser.username}!
        </h2>
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

          <button
            className="btnz"
            onClick={() => history.push("/LeaveRequest")}
            disabled={isDisabled}
          >
            <BiCalendarEvent size={40} />
            <p> Apply for Leave</p>
          </button>
          <button className="btnz" onClick={handleRecords}>
            <BiTimer size={40} />
            <p>Show Records</p>
          </button>
          <button className="btnz" onClick={handleProfile}>
            <BiTimer size={40} />
            <p>Profile</p>
          </button>
          <button className="btnz" onClick={handleLogout}>
            <BiLogOut size={40} /> <p>LogOut </p>
          </button>
        </div>
      </div>
    );
  }
};

export default userDashboardPage;
