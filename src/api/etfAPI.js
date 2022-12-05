import axios from "axios";

// const url =  'https://etf-diy-kml.herokuapp.com' //dev
const url =  'http://127.0.0.1:3085' // local

const etfAPIetflist = axios.create({
  baseURL: `${url}/etflist`,
  timeout: 15000,
});

const etfAPIetflike = axios.create({
  baseURL: `${url}/like`,
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

export const getETFLike = (token) => {
  return etfAPIetflike.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export const addETFLike = (token, id) => {
  return etfAPIetflike.post("/", {
    data: {
      ETFid : id
    }
   }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export const deleteETFLike = (token, id) => {
  return etfAPIetflike.delete(`/`, {
    data: {
      ETFid : id
    }
    ,headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
