import buildingDao from "../dao/buildingDao"
import reportDao from "../dao/reportDao"

async function getBuilding(latitude, longitude) {
    const getBuilding = await buildingDao.BuildingQuery(latitude, longitude)
    console.log(getBuilding)
    return getBuilding
}
//BuildingFacilities
async function getBuildingFacility(buildingIdx) {
    const BuildingFacilities = await buildingDao.BuildingFacilities(buildingIdx)
    console.log(BuildingFacilities)
    return BuildingFacilities
}
async function getOneBuildingFacility(buildingIdx) {
    const buildingQuery = await buildingDao.BuildingFacilities(buildingIdx)
    return buildingQuery
}
async function postReport(title, contents, img, userIdx, buildingIdx) {
    const reportQuery = await reportDao.insertBuildingReport(title, contents, img, userIdx, buildingIdx)
    return reportQuery
}

module.exports = {
    getBuilding,
    getBuildingFacility,
    getOneBuildingFacility,
    postReport
}