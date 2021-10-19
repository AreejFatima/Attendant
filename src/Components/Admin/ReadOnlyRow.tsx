/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import {MouseEvent} from "react";

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
    email: string
  ) => void;
  pincode: string;
  role: string;
  email: string;
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
}: Props): JSX.Element => (
  <tr>
    <td>{username}</td>
    <td>{dept}</td>
    <td>{role}</td>
    <td>{email}</td>
    <td className="opration">
      <button className="button" onClick={() => removeEmployee(id)}>
        Delete
      </button>
      <button
        className="button2"
        onClick={(event: React.MouseEvent<HTMLElement>) =>
          editEmployee(event, id, username, dept, pincode, role, email)
        }
      >
        Edit
      </button>
    </td>
  </tr>
);

export default ReadOnlyRow;
