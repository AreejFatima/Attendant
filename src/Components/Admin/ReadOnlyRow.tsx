import { useHistory } from "react-router-dom";
import { empType } from "../../Adapter/types";
import { avatar } from "../../avatar";

interface Props {
  id: string;
  username: string;
  dept: string;
  removeEmployee: (id: string) => void;
  editEmployee: (employee: empType) => void;
  pincode: string;
  role: string;
  email: string;
  phone: string;
  profilePic: string;
}

const ReadOnlyRow = ({
  id,
  username,
  dept,
  removeEmployee,
  editEmployee,
  pincode,
  role,
  email,
  phone,
  profilePic,
}: Props): JSX.Element => {
  const history = useHistory();
  const activeEmployee: empType = {
    id,
    username,
    dept,
    pincode,
    role,
    phone,
    email,
    profilePic,
  };
  function handleViewUserProfile(activeEmp: empType) {
    const temp = {
      user: activeEmp,
      role: "admin",
    };
    history.push({
      pathname: "/UserProfile",
      state: temp,
    });
  }

  if (profilePic === "") {
    profilePic = avatar;
  }
  return (
    <tr>
      <td>{username}</td>
      <td>{dept}</td>
      <td>{role}</td>
      <td>{email}</td>
      <td>
        <button
          style={{ background: "none", border: "none" }}
          onClick={() => handleViewUserProfile(activeEmployee)}
        >
          <img src={profilePic} alt="" height="100" width="100" />
        </button>
      </td>
      <td className="opration">
        <button className="button" onClick={() => removeEmployee(id)}>
          Delete
        </button>
        <button
          className="button2"
          onClick={() => editEmployee(activeEmployee)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
