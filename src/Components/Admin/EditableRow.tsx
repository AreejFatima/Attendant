import { ChangeEvent } from "react";
import { empType } from "../../Adapter/types";

interface Props {
  editFormData: empType;
  profilePic: string;
  handleEditFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEditFormSave: () => void;
}

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSave,
  profilePic,
}: Props): JSX.Element => (
  <tr>
    <td>
      <input
        type="text"
        required
        placeholder="Name"
        name="username"
        onChange={handleEditFormChange}
        value={editFormData.username}
      />
    </td>
    <td>
      <input
        type="text"
        required
        placeholder="Department"
        name="dept"
        onChange={handleEditFormChange}
        value={editFormData.dept}
      />
    </td>
    <td>
      <input
        type="text"
        required
        placeholder="Role"
        name="role"
        onChange={handleEditFormChange}
        value={editFormData.role}
      />
    </td>
    <td>
      <input
        type="text"
        required
        placeholder="Email"
        name="email"
        onChange={handleEditFormChange}
        value={editFormData.email}
      />
    </td>
    <td>
      <img src={profilePic} alt="" height="100" width="100" />
    </td>

    <td className="opration">
      <button className="button2" onClick={handleEditFormSave}>
        Save
      </button>
    </td>
  </tr>
);

export default EditableRow;
