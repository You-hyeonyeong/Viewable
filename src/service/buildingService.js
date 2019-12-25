const buildingDao = require("../dao/buildingDao");
const reportDao = require("../dao/reportDao");

async function getBuilding(latitude, longitude) {
  const getBuilding = await buildingDao.BuildingQuery(latitude, longitude);
  console.log(getBuilding);
  return getBuilding;
}
async function getOneBuilding(buildingIdx) {
  const buildingQuery = await buildingDao.oneBuildingQuery(buildingIdx);
  return buildingQuery;
}
async function postReport(title, contents, img, userIdx, buildingIdx) {
  const reportQuery = await reportDao.insertBuildingReport(
    title,
    contents,
    img,
    userIdx,
    buildingIdx
  );
  return reportQuery;
}

module.exports = {
  getBuilding,
  getOneBuilding,
  postReport
};