/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-await */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, getallGists, patchData } from "../../Adapter/gists";
import {
  leaveType,
  empType,
  recordType,
  initialStateType,
  hourType,
} from "../../Adapter/types";

const initialState: initialStateType = {
  allUsers: [],
  userRecords: [],
  activeUser: {},
  leaves: [],
};
let gistObj;

// fetching data from gists and setting states
export const fetchUserDataFromGists = createAsyncThunk(
  "user/fetchData",
  async (_, thunkApi) => {
    gistObj = await getallGists();
    const userData = await getData("userStore.txt", gistObj.userGist);
    thunkApi.dispatch(setInitialUsers(JSON.parse(userData)));

    const recordData = await getData("records.txt", gistObj.recordGist);
    thunkApi.dispatch(setInitialRecords(JSON.parse(recordData)));

    const leaveData = await getData("leaves.txt", gistObj.leaveGist);
    thunkApi.dispatch(setInitialLeaves(JSON.parse(leaveData)));
  }
);
export const patchUserData = createAsyncThunk(
  "user/patchUserData",
  async (users: empType[], thunkApi) => {
    const stringUsers = JSON.stringify(users);
    patchData("userStore.txt", stringUsers, gistObj.userGist);
    thunkApi.dispatch(setInitialUsers(users));
  }
);

export const patchUserRecords = createAsyncThunk(
  "user/patchUserRecords",
  async (record: recordType[], thunkApi) => {
    const stringRecords = JSON.stringify(record);
    patchData("records.txt", stringRecords, gistObj.recordGist);
    thunkApi.dispatch(setInitialRecords(record));
  }
);

export const patchLeaveData = createAsyncThunk(
  "user/patchLeaveData",
  async (leave: leaveType[], thunkApi) => {
    const stringLeaves = JSON.stringify(leave);
    patchData("leaves.txt", stringLeaves, gistObj.leaveGist);
    thunkApi.dispatch(setInitialLeaves(leave));
  }
);

export const patchSettingData = createAsyncThunk(
  "admin/patchSettingData",
  async (hours: hourType) => {
    const stringHours = JSON.stringify(hours);
    patchData("settings.txt", stringHours, gistObj.settingGist);
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
