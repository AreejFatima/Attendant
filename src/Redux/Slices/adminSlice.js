/* eslint-disable no-return-await */
import { createSlice } from "@reduxjs/toolkit";

import { patchUsers } from "../../Components/gists";

const R = require("ramda");

const initialState = {
  requestedLeaves: [],
  employees: [],
  records: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    deleteEmployee(state, action) {
      state.employees = action.payload.data;
      const toDelete = R.find(
        R.propEq("id", action.payload.id),
        state.employees
      );
      
      const filteredEmployees = state.employees.filter(
        (item) => item !== toDelete
      );
      const stringEmp = JSON.stringify(filteredEmployees);
      (async () => await patchUsers(stringEmp))();
    },

    setInitialEmployees(state, action) {
      state.employees = action.payload;
    },

    setInitialERecords(state, action) {
      state.records = action.payload;
    },
  },
});

export const { deleteEmployee, setInitialEmployees, setInitialERecords } =
  adminSlice.actions;
export default adminSlice.reducer;
