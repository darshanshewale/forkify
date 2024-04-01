import { async } from "regenerator-runtime";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { TIME_OUT } from "./config";

const timeout = async function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long ! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIME_OUT)]);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
