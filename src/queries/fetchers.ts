import axios from "axios";

// set up headers for passing jwt
const getTokenHeader = () => {
  const token = sessionStorage.getItem("token") || "";
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

// set up fetchers for CRUD
export const get = (url: string) => {
  return axios.get(url, getTokenHeader()).then((res) => res.data);
};

export const post = (url: string, body: any) => {
  return axios.post(url, body, getTokenHeader()).then((res) => res.data);
};

export const put = (url: string, body: any) => {
  return axios.put(url, body, getTokenHeader()).then((res) => res.data);
};

export const remove = (url: string) => {
  return axios.delete(url, getTokenHeader()).then((res) => res.data);
};
