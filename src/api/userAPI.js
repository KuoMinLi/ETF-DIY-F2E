import axios from "axios";

const url =  'https://etf-diy-kml.herokuapp.com' //dev
// const url =  'http://127.0.0.1:3085' // local

const apiUsers = axios.create({
  baseURL: `${url}/users`,
  timeout: 15000,
});

export const apiUserSignUp = (user) => {
  return apiUsers.post("/sign_up", user)
    .then((res) => res.data)
}

export const apiUserSignIn = (user) => {
  return apiUsers.post("/sign_in", user)
    .then((res) => res.data)
}

