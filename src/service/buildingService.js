const buildingDao = require("../dao/buildingDao");
const reportDao = require("../dao/reportDao");

async function getBuilding(latitude, longitude) {
  const getBuilding = await buildingDao.BuildingQuery(latitude, longitude);

  // getBuilding.map(async building => {
  //   building["facility"] = await buildingDao.BuildingFacilities(
  //     building.buildingIdx
  //   );

  //   if (building.facility.length >= 3) {
  //     building["light"] = 3;
  //   } else if (building.facility.length >= 2) {
  //     building["light"] = 2;
  //   } else {
  //     building["light"] = 1;
  //   }
  // });

  for (let i = 0; i < getBuilding.length; i++) {
    getBuilding[i]["facility"] = await buildingDao.BuildingFacilities(
      getBuilding[i].buildingIdx
    );

    const list = [];
    getBuilding[i].facility.map(f => {
      list.push(f.facilityIdx);
    });
    getBuilding[i].facility = list;

    if (getBuilding[i].facility.length >= 3) {
      getBuilding[i]["light"] = 3;
    } else if (getBuilding[i].facility.length >= 2) {
      getBuilding[i]["light"] = 2;
    } else {
      getBuilding[i]["light"] = 1;
    }
  }
  return getBuilding;
}
//BuildingFacilities
async function getBuildingFacility(buildingIdx) {
  const BuildingFacilities = await buildingDao.BuildingFacilities(buildingIdx);
  console.log(BuildingFacilities);
  return BuildingFacilities;
}
async function getOneBuildingFacility(buildingIdx) {
  const buildingQuery = await buildingDao.BuildingFacilities(buildingIdx);
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
  getBuildingFacility,
  getOneBuildingFacility,
  postReport
};