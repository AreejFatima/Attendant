/* eslint-disable react/void-dom-elements-no-children */
import { useState, useEffect } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { patchUserData, setActiveUser } from "../../Redux/Slices/userSlice";
import { empType } from "../../Adapter/types";
import UploadImage from "./UploadImage";
import EditableForm from "./EditableForm";
import WorkHours from "./WorkHours";

const R = require("ramda");

const UserProfile = () => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const location = useLocation();
  const prop = location.state;
  const activeUser = prop.user;
  const { role } = prop;

  let usersList: empType[];

  if (role === "user") {
    usersList = useSelector((state: RootStateOrAny) => state.user.allUsers);
  } else {
    usersList = useSelector((state: RootStateOrAny) => state.admin.employees);
  }

  const [url, setUrl] = useState(activeUser.profilePic);
  const dispatch = useDispatch();

  function showForm() {
    setShowEditForm((prev) => !prev);
  }

  useEffect(() => {
    const tempUsers = R.clone(usersList);
    const index = R.findIndex(R.propEq("id", activeUser.id))(tempUsers);
    const toUpdate = R.find(R.propEq("id", activeUser.id))(tempUsers);
    toUpdate.profilePic = url;
    tempUsers[index] = toUpdate;
    dispatch(patchUserData(tempUsers));
    dispatch(setActiveUser(toUpdate));
  }, [url]);

  return (
    <>
      <div id="layout">
        <div className="resizable-x" style={{minHeight:'200vh'}}>
          <div
            className="left"
            style={{ width: "20%", marginTop: "0.2%", marginLeft: "0%" }}
          >
            <UploadImage setUrl={setUrl} />
            <h3 style={{ color: "white" }}>{activeUser.username}</h3>
            <button className="edit" onClick={showForm}>
              Edit Profile
            </button>
          </div>
          {showEditForm === false ? (
            <div style={{ width: "77%" ,marginLeft:'1%' }}>
              <div className="top">
                <h2 style={{ marginRight: "70%" }}>User Details</h2>
                <div id="table" style={{ marginLeft: "30%", marginTop: "4%",marginBottom:'2%' }}>
                  <div className="tr">
                    <div className="td">Name:</div>
                    <div className="td">{activeUser.username}</div>
                  </div>
                  <div className="tr">
                    <div className="td">Email:</div>
                    <div className="td">{activeUser.email}</div>
                  </div>
                  <div className="tr">
                    <div className="td">Role:</div>
                    <div className="td">{activeUser.role}</div>
                  </div>
                  <div className="tr">
                    <div className="td">Phone:</div>
                    <div className="td">{activeUser.phone}</div>
                  </div>
                  <div className="tr">
                    <div className="td">Department:</div>
                    <div className="td">{activeUser.dept}</div>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div>
                  {" "}
                  {activeUser.id ? (
                    <WorkHours id={activeUser.id} role={role} type="graphical" />
                  ) : null}
                </div>
              </div>
              <div className="bottom" >
                <div>
                  {" "}
                  {activeUser.id ? (
                    <WorkHours id={activeUser.id} role={role} type="tabular" />
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <br />
              <br />
              <EditableForm
                id={activeUser.id}
                role={activeUser.role}
                pincode={activeUser.pincode}
                dept={activeUser.dept}
                username={activeUser.username}
                email={activeUser.email}
                phone={activeUser.phone}
                profilePic={activeUser.profilePic}
                showEditForm={showEditForm}
                type={role}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default UserProfile;
