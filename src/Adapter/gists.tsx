/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { Octokit } from "@octokit/core";
import * as R from "ramda";

const octokit = new Octokit({
  auth: process.env.REACT_APP_API_KEY,
});

let userGist;
let recordGist;
let leaveGist;
let settingGist;
const allgists = [];

// Getting All Gists, and then Data from Gists (Helper Functions)
export async function getallGists() {
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
      switch (item.filename) {
        case "userStore.txt":
          userGist = item.id;
          break;
        case "leaves.txt":
          leaveGist = item.id;
          break;
        case "records.txt":
          recordGist = item.id;
          break;
        case "settings.txt":
          settingGist = item.id;
          break;
      }
    }, allgists);
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers() {
  if (userGist) {
    try {
      const response = await octokit.request(`GET /gists/${userGist}`, {
        org: "octokit",
        type: "private",
      });
      const data = R.path(
        ["data", "files", "userStore.txt", "content"],
        response
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getRecords() {
  try {
    if (recordGist) {
      const response = await octokit.request(`GET /gists/${recordGist}`, {
        org: "octokit",
        type: "private",
      });
      const data = R.path(
        ["data", "files", "records.txt", "content"],
        response
      );
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getLeaves() {
  try {
    const response = await octokit.request(`GET /gists/${leaveGist}`, {
      org: "octokit",
      type: "private",
    });
    const data = R.path(["data", "files", "leaves.txt", "content"], response);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Patching Data to Gists (Helper Functions)

export async function patchUsers(u) {
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
}

export async function patchRecords(r) {
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
}

export async function patchLeaves(l) {
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
}

export async function patchSettings(s) {
  try {
    const response = await octokit.request(`PATCH /gists/${settingGist}`, {
      gist_id: leaveGist,
      files: {
        "settings.txt": {
          content: s,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
