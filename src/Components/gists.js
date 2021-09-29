/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.REACT_APP_API_KEY,
});

const R = require("ramda");

require("dotenv").config();

let userGist;
let recordGist;
let leaveGist;
const allgists = [];

// console.log("key",process.env.REACT_APP_API_KEY)

export const getallGists = async () => {
  try {
    const response = await octokit.request("GET /users/AreejFatima/gists", {
      username: "AreejFatima",
    });
    R.map((gist) => {
      const temp = {
        filename: R.keys(gist.files).toString(),
        id: gist.id,
      };
      allgists.push(temp);
    }, response.data);

    R.map((item) => {
      if (item.filename === "userStore.txt") {
        userGist = item.id;
      } else if (item.filename === "leaves.txt") {
        leaveGist = item.id;
      } else if (item.filename === "records.txt") {
        recordGist = item.id;
      }
    }, allgists);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  if (userGist) {
    try {
      const response = await octokit.request(`GET /gists/${userGist}`, {
        org: "octokit",
        type: "private",
      });
      const data = response.data.files["userStore.txt"].content;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getRecords = async () => {
  try {
    if (recordGist) {
      const response = await octokit.request(`GET /gists/${recordGist}`, {
        org: "octokit",
        type: "private",
      });
      const data = response.data.files["records.txt"].content;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const patchUsers = async function (u) {
  try {
    const response = await octokit.request(`PATCH /gists/${userGist}`, {
      gist_id: userGist,
      files: {
        "userStore.txt": {
          content: u,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const patchRecords = async function (r) {
  try {
    const response = await octokit.request(`PATCH /gists/${recordGist}`, {
      gist_id: recordGist,
      files: {
        "records.txt": {
          content: r,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLeaves = async () => {
  try {
    const response = await octokit.request(`GET /gists/${leaveGist}`, {
      org: "octokit",
      type: "private",
    });
    const data = response.data.files["leaves.txt"].content;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const patchLeaves = async (l) => {
  try {
    const response = await octokit.request(`PATCH /gists/${leaveGist}`, {
      gist_id: leaveGist,
      files: {
        "leaves.txt": {
          content: l,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
