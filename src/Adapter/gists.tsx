/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { Octokit } from "@octokit/core";
import * as R from "ramda";

const octokit = new Octokit({
  auth: process.env.REACT_APP_API_KEY,
});

const allgists = [];

// Getting All Gists, and then Data from Gists (Helper Functions)

function pipeFunctions(gistArray, response, obj) {
  R.pipe(
    R.map((gist) => {
      const temp = {
        filename: R.keys(gist.files).toString(),
        id: gist.id,
      };
      gistArray.push(temp);
    }, response),
    R.map((item) => {
      switch (item.filename) {
        case "userStore.txt":
          obj.userGist = item.id;
          break;
        case "leaves.txt":
          obj.leaveGist = item.id;
          break;
        case "records.txt":
          obj.recordGist = item.id;
          break;
        case "settings.txt":
          obj.settingGist = item.id;
          break;
      }
    }, gistArray)
  );
}

export async function getallGists() {
  try {
    const obj = {
      userGist: "",
      recordGist: "",
      leaveGist: "",
      settingGist: "",
    };
    const response = await octokit.request("GET /users/AreejFatima/gists", {
      username: "AreejFatima",
    });
    pipeFunctions(allgists, response.data, obj);
    return obj;
  } catch (error) {
    console.log(error);
  }
}

export async function getData(filename, gistId) {
  if (gistId) {
    try {
      const response = await octokit.request(`GET /gists/${gistId}`, {
        org: "octokit",
        type: "private",
      });
      const data = R.path(["data", "files", filename, "content"], response);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

// Patching Data to Gists (Helper Functions)

export async function patchData(filename, data, gistId) {
  try {
    const response = await octokit.request(`PATCH /gists/${gistId}`, {
      gist_id: gistId,
      files: {
        [filename]: {
          content: data,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
