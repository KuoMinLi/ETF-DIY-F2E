import axios from "axios";

// const erfAPIUsers = axios.create({
//   baseURL: "https://etf-diy-kml.herokuapp.com/users",
//   timeout: 5000,
// });

const etfAPIetflist = axios.create({
  baseURL: "http://127.0.0.1:3085/etflist",
  timeout: 15000,
});

export const getETFList = () => {
  return etfAPIetflist.get("/")
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export const getETFListByCode = (code) => {
  return etfAPIetflist.get(`/${code}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
