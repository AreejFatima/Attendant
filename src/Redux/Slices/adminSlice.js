/* eslint-disable no-console */
/* eslint-disable no-return-await */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  patchUsers,
  getUsers,
  getRecords,
  getallGists,
  patchRecords,
} from "../../Components/gists";

const R = require("ramda");

const initialState = {
  requestedLeaves: [],
  employees: [],
  records: [],
};

// fetching data from gists and setting states
export const fetchDataFromGists = createAsyncThunk(
  "admin/fetchData",
  async (_, thunkApi) => {
    getallGists();
    setTimeout(() => {
      getUsers().then((data) => {
        thunkApi.dispatch(setInitialEmployees(JSON.parse(data)));
      });
      getRecords().then((data) => {
        thunkApi.dispatch(setInitialERecords(JSON.parse(data)));
      });
    }, 1000);
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Delete Employee & Record
    deleteEmployee(state, action) {
      state.employees = action.payload.data;
      state.records = action.payload.data_record;
      const toDelete = R.find(
        R.propEq("id", action.payload.id),
        state.employees
      );
      const toDeleteRec = R.find(
        R.propEq("id", action.payload.id),
        state.records
      );

      const filteredRecords = state.records.filter(
        (item) => item !== toDeleteRec
      );

      const filteredEmployees = state.employees.filter(
        (item) => item !== toDelete
      );

      const stringEmp = JSON.stringify(filteredEmployees);
      (async () => await patchUsers(stringEmp))();

      const stringRec = JSON.stringify(filteredRecords);
      (async () => await patchRecords(stringRec))();

      state.employees = filteredEmployees;
    },

    // Set States

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
