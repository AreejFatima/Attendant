/* eslint-disable no-console */
/* eslint-disable no-return-await */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  patchUsers,
  getUsers,
  getRecords,
  getallGists,
  patchRecords,
  patchSettings,
} from "../../Adapter/gists";

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

export const patchEmployeeData = createAsyncThunk(
  "admin/patchEmployeeData",
  async (employees, thunkApi) => {
    const stringUsers = JSON.stringify(employees);
    patchUsers(stringUsers);
    thunkApi.dispatch(setInitialEmployees(employees));
  }
);

export const patchRecordData = createAsyncThunk(
  "admin/patchRecordData",
  async (records, thunkApi) => {
    const stringRecords = JSON.stringify(records);
    patchRecords(stringRecords);
    thunkApi.dispatch(setInitialERecords(records));
  }
);

export const patchSettingData = createAsyncThunk(
  "admin/patchSettingData",
  async (hours) => {
    const stringHours = JSON.stringify(hours);
    patchSettings(stringHours);
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addEmployee(state, action) {
      state.employees.push(action.payload);
      const stringUsers = JSON.stringify(state.employees);
      (async () => await patchUsers(stringUsers))();
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

export const {
  deleteEmployee,
  setInitialEmployees,
  setInitialERecords,
  addEmployee,
} = adminSlice.actions;
export default adminSlice.reducer;
