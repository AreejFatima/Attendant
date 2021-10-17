/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-await */
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import {
  patchUsers,
  patchRecords,
  patchLeaves,
  getUsers,
  getRecords,
  getallGists,
  getLeaves,
} from "../../Adapter/gists";
import { leaveType, empType, recordType } from "./adminSlice";

interface initialStateType {
  allUsers: empType[];
  userRecords: recordType[];
  activeUser: any;
  leaves: leaveType[];
}

const R = require("ramda");

const initialState: initialStateType = {
  allUsers: [],
  userRecords: [],
  activeUser: {},
  leaves: [],
};
// fetching data from gists and setting states
export const fetchUserDataFromGists = createAsyncThunk(
  "user/fetchData",
  async (_, thunkApi) => {
    getallGists();
    setTimeout(() => {
      getUsers().then((data) => {
        thunkApi.dispatch(setInitialUsers(JSON.parse(data)));
      });
      getRecords().then((data) => {
        thunkApi.dispatch(setInitialRecords(JSON.parse(data)));
      });
      getLeaves().then((data) => {
        thunkApi.dispatch(setInitialLeaves(JSON.parse(data)));
      });
    }, 1000);
  }
);
export const patchUserData = createAsyncThunk(
  "user/patchUserData",
  async (users: empType[], thunkApi) => {
    const stringUsers = JSON.stringify(users);
    patchUsers(stringUsers);
    thunkApi.dispatch(setInitialUsers(users));
  }
);

export const patchUserRecords = createAsyncThunk(
  "user/patchUserRecords",
  async (record: recordType[], thunkApi) => {
    const stringRecords = JSON.stringify(record);
    patchRecords(stringRecords);
    thunkApi.dispatch(setInitialRecords(record));
  }
);

export const patchLeaveData = createAsyncThunk(
  "user/patchLeaveData",
  async (leave: leaveType[], thunkApi) => {
    const stringLeaves = JSON.stringify(leave);
    patchLeaves(stringLeaves);
    thunkApi.dispatch(setInitialLeaves(leave));
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set States
    setInitialUsers(state, action) {
      state.allUsers = action.payload;
    },

    setInitialRecords(state, action) {
      state.userRecords = action.payload;
    },
    setInitialLeaves(state, action) {
      state.leaves = action.payload;
    },

    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },
  },
});

export const {
  setActiveUser,
  setInitialUsers,
  setInitialRecords,
  setInitialLeaves,
} = userSlice.actions;
export default userSlice.reducer;
