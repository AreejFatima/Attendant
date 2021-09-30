/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-await */
import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import {
  patchUsers,
  patchRecords,
  patchLeaves,
  getUsers,
  getRecords,
  getallGists,
} from "../../Components/gists";

const R = require("ramda");

const initialState = {
  allUsers: [],
  userRecords: [],
  activeUser: {},
  leaves: [],
};

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
    }, 1000);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      state.allUsers.push(action.payload);
      const stringUsers = JSON.stringify(state.allUsers);
      (async () => await patchUsers(stringUsers))();
    },

    setInitialUsers(state, action) {
      state.allUsers = action.payload;
    },

    setInitialRecords(state, action) {
      state.userRecords = action.payload;
    },

    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },

    pushLeave(state, action) {
      state.leaves.push(action.payload);
      const stringLeave = JSON.stringify(state.leaves);
      (async () => await patchLeaves(stringLeave))();
    },

    pushRecord(state, action) {
      state.userRecords.push(action.payload);

      const stringRecords = JSON.stringify(state.userRecords);
      (async () => await patchRecords(stringRecords))();
    },

    addRecord(state, action) {
      const userRecord = R.findIndex(
        R.propEq("id", action.payload.id),
        state.userRecords
      );

      if (action.payload.status) {
        const newRecord = {
          date: action.payload.timestamp[0],
          punchIn: action.payload.timestamp[1],
          punchOut: "",
          workHours: 0,
        };
        state.userRecords[userRecord].Records.push(newRecord);
        const stringRecords = JSON.stringify(state.userRecords);
        (async () => await patchRecords(stringRecords))();
      } else {
        const lastRecord = R.last(state.userRecords[userRecord].Records);
        lastRecord.punchOut = action.payload.timestamp[1];
        const start = lastRecord.punchIn;
        const end = action.payload.timestamp[1];
        const totalHours = calculateWorkHours(start, end);
        lastRecord.workHours = totalHours;

        const stringRecords = JSON.stringify(state.userRecords);
        (async () => await patchRecords(stringRecords))();
      }
    },
  },
});

function calculateWorkHours(st, et) {
  const startTime = moment(st, "HH:mm:ss A");
  const endTime = moment(et, "HH:mm:ss A");
  const duration = moment.duration(endTime.diff(startTime));
  const hours = parseInt(duration.asHours(), 10);
  const minutes = parseInt(duration.asMinutes(), 10) % 60;
  const seconds = parseInt(duration.asSeconds(), 10);
  // const result = hours + " hour and " + minutes + " minutes.";
  return seconds;
}

export const {
  addUser,
  setActiveUser,
  addRecord,
  pushRecord,
  pushLeave,
  setInitialUsers,
  setInitialRecords,
} = userSlice.actions;
export default userSlice.reducer;
