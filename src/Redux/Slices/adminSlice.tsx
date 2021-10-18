/* eslint-disable no-console */
/* eslint-disable no-return-await */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types

import {
  patchUsers,
  getUsers,
  getRecords,
  getallGists,
  patchRecords,
  patchSettings,
} from "../../Adapter/gists";

interface Hour {
  officeHour: string;
  minWH: string;
}

export interface leaveType {
  userid: string;
  status: string;
  name: string;
  dept: string;
  type: string;
  days: number;
  reason: string;
  message: string;
  appliedOn:string
}

export interface empType {
  id: string;
  pincode: string;
  username: string;
  dept: string;
  role: string;
  email: string;
}

export interface individualRecType {
  date: string;
  punchIn: string;
  punchOut: string;
  workHours: number;
}

export interface recordType {
  id: string;
  Records: individualRecType[];
}

interface initialStateTypes {
  requestedLeaves: leaveType[];
  employees: empType[];
  records: recordType[];
}

const initialState: initialStateTypes = {
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
  async (employees: empType[], thunkApi) => {
    const stringUsers = JSON.stringify(employees);
    patchUsers(stringUsers);
    thunkApi.dispatch(setInitialEmployees(employees));
  }
);

export const patchRecordData = createAsyncThunk(
  "admin/patchRecordData",
  async (records: recordType[], thunkApi) => {
    const stringRecords = JSON.stringify(records);
    patchRecords(stringRecords);
    thunkApi.dispatch(setInitialERecords(records));
  }
);

export const patchSettingData = createAsyncThunk(
  "admin/patchSettingData",
  async (hours: Hour) => {
    const stringHours = JSON.stringify(hours);
    patchSettings(stringHours);
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Set States

    setInitialEmployees(state, action: PayloadAction<empType[]>) {
      state.employees = action.payload;
    },

    setInitialERecords(state, action: PayloadAction<recordType[]>) {
      state.records = action.payload;
    },
  },
});

export const { setInitialEmployees, setInitialERecords } = adminSlice.actions;
export default adminSlice.reducer;