import axios from "axios";

const apiUsers = axios.create({
  baseURL: "https://etf-diy-kml.herokuapp.com/users",
  timeout: 5000,
});

export const apiUserSignUp = (user) => {
  return apiUsers.post("/sign_up", user)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export const apiUserSignIn = (user) => {
  return apiUsers.post("/sign_in", user)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

