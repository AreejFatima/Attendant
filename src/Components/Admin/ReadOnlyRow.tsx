import { MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { avatar } from "../../avatar";

interface Props {
  id: string;
  username: string;
  dept: string;
  removeEmployee: (id: string) => void;
  editEmployee: (
    event: MouseEvent<HTMLElement>,
    id: string,
    username: string,
    dept: string,
    pincode: string,
    role: string,
    email: string,
    phone: string,
    profilePic: string
  ) => void;
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

  function handleViewUserProfile() {
    const activeUser = {
      id,
      username,
      dept,
      pincode,
      role,
      phone,
      email,
      profilePic,
    };
    const temp = {
      user: activeUser,
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
          onClick={handleViewUserProfile}
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
          onClick={(event: MouseEvent<HTMLElement>) =>
            editEmployee(
              event,
              id,
              username,
              dept,
              pincode,
              role,
              email,
              phone,
              profilePic
            )
          }
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
