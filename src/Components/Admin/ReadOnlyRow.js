const ReadOnlyRow = ({id,username,dept,removeEmployee,editEmployee,pincode,role,email}) => ( 
        <tr>
          <td>{id}</td>
          <td>{username}</td>
          <td>{dept}</td>
          <td className="opration">
            <button className="button" onClick={() => removeEmployee(id)}>
              Delete
            </button>
            <button className="button"  onClick={(event) => editEmployee(event,id,username,dept,pincode,role,email)} >
              Edit
            </button>
          </td>
        </tr>
     )
 
export default ReadOnlyRow;