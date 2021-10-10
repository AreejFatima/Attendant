const ReadOnlyRow = ({
  id,
  username,
  dept,
  removeEmployee,
  editEmployee,
  pincode,
  role,
  email,
}) => (
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
        onClick={(event) =>
          editEmployee(event, id, username, dept, pincode, role, email)
        }
      >
        Edit
      </button>
    </td>
  </tr>);

export default ReadOnlyRow;
