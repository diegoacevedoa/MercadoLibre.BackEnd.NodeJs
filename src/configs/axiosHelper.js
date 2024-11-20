import config from "../config";
import axios from "axios";

const baseUrl = config.api;

export const axiosSinToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return axios.get(url);
  } else {
    return axios(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      data: data,
    });
  }
};
