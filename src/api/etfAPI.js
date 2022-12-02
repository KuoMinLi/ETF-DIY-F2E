import axios from "axios";

const etfAPIetflist = axios.create({
  baseURL: "https://etf-diy-kml.herokuapp.com/etflist",
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
