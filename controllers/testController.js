const axios = require('axios');
const apikey = require('../config/keys')


async function getTest(req, res) {
    console.log("test com")
}
// 서울시 장애인 관광지 정보
//링크 : http://data.seoul.go.kr/dataList/datasetView.do?infId=OA-15510&srvType=A&serviceKind=0&currentPageNo=1
async function touristSpotInfo(req, res) {
    console.log(apikey)

    const result = axios.get(`http://openapi.seoul.go.kr:8088/${apikey.apikey}/json/touristSpotInfo/1/10/`,
    )
      .then(function (response) {
        console.log(response);
        console.log(response.data.touristSpotInfo);
        res.send(response.data.touristSpotInfo);
      })
      .catch(function (error) {
        console.log(error);
      })
}
// 서울시 장애인 음식점 정보
//링크 : https://data.seoul.go.kr/dataList/datasetView.do?infId=OA-15512&srvType=S&serviceKind=1&currentPageNo=1
async function touristFoodInfo(req, res) {

    const result = axios.get(`http://openapi.seoul.go.kr:8088/${apikey}/json/touristFoodInfo/1/10/`,
    )
      .then(function (response) {
        console.log(response);
        console.log(response.data.touristFoodInfo);
        res.send(response.data.touristFoodInfo);
      })
      .catch(function (error) {
        console.log(error);
      })
}


module.exports = {
    getTest,
    touristSpotInfo,
    touristFoodInfo
};