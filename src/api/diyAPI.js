import axios from "axios";

const apiDIY = axios.create({
  baseURL: "https://etf-diy-kml.herokuapp.com/diy",
  timeout: 15000,
});

// data格式
// data:{
//   "name": "test",
//    "content": [
//   {
//     "naem": :"台積電",
//     "code": "2330",
//     "percentage": 100
//   }
// ]

export const apiDIYPost = (data, token) => {
  return apiDIY
    .post(
      "/", { data }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const apiDIYGet = (token) => {
  return apiDIY
    .get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};


