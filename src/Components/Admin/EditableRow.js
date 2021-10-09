const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSave,
}) => (
  <tr>
    <td>
      <input
        type="text"
        required="required"
        placeholder="id"
        name="id"
        onChange={handleEditFormChange}
        value={editFormData.id}
      />
    </td>
    <td>
      <input
        type="text"
        required="required"
        placeholder="Name"
        name="username"
        onChange={handleEditFormChange}
        value={editFormData.username}
      />
    </td>
    <td>
      <input
        type="text"
        required="required"
        placeholder="Department"
        name="dept"
        onChange={handleEditFormChange}
        value={editFormData.dept}
      />
    </td>
    <td className="opration">
      <button className="button" onClick={handleEditFormSave}>
        Save
      </button>
    </td>
  </tr>
);

export default EditableRow;
