// 預計是放會員資料, 會員收藏ETF, 會員自組ETF
export const userData = [
  {
    id: "1",
    name: "KuoMin",
    email: "KuoMin@gmail.com",
    profile: "https://i.imgur.com/0y0y0y0.jpg",
    loveETF: [
      {
        id: "1",
        name: "元大台灣50",
        code: "0050",
      },
      {
        id: "2",
        name: "元大中型100",
        code: "0051",
      }
    ],
    DIYETF: [
      {
        id: "1",
        name: "台灣5大",
        content:[
          {
            id: "1",
            name: "台積電",
            code: "2330",
            industry: "半導體業",
            percentage: 20,
          },
          {
            id: "2",
            name: "鴻海",
            code: "2317",
            industry: "其他電子業",
            percentage: 20,
          },
          {
            id: "3",
            name: "聯發科",
            code: "2454",
            industry: "半導體業",
            percentage: 20,
          },
          {
            id: "4",
            name: "台達電",
            code: "2308",
            industry: "電子零組件業",
            percentage: 20,
          },
          {
            id: "5",
            name: "聯電",
            code: "2303",
            industry: "半導體業",
            percentage: 20,
          }
        ]
      }
    ]
  },
]