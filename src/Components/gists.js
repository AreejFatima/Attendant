/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: `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`,
});

const userGist = "9cdd7a2c81928f9d191c68251cc6c374";
const recordGist = "93d782341000b8029b86197d98a6dc23";
const leaveGist = "7e6075bdce0d6baef0df758c030d4f1c";

export const getUsers = async () => {
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
};
export const getRecords = async () => {
  try {
    const response = await octokit.request(`GET /gists/${recordGist}`, {
      org: "octokit",
      type: "private",
    });
    const data = response.data.files["records.txt"].content;
    return data;
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
