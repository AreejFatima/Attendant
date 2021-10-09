const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleEditFormSave,
  isEdit,
}) => (
  <tr>
    {isEdit ? (
      <>
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
        <td>
          <input
            type="text"
            required="required"
            placeholder="Role"
            name="role"
            onChange={handleEditFormChange}
            value={editFormData.role}
          />
        </td>
        <td>
          <input
            type="email"
            required="required"
            placeholder="Email"
            name="email"
            onChange={handleEditFormChange}
            value={editFormData.email}
          />
        </td>
        <td className="opration">
          <button className="button" onClick={handleEditFormSave}>
            Save
          </button>
        </td>
      </>
    ) : (
      <>
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
        <td>
          <input
            type="text"
            required="required"
            placeholder="Role"
            name="role"
            onChange={handleEditFormChange}
            value={editFormData.role}
          />
        </td>
        <td>
          <input
            type="email"
            required="required"
            placeholder="Email"
            name="email"
            onChange={handleEditFormChange}
            value={editFormData.email}
          />
        </td>
        <td className="opration">
          <button className="button" onClick={handleEditFormSave}>
            Save
          </button>
        </td>
      </>
    )}
  </tr>
);

export default EditableRow;
