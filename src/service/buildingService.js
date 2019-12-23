import buildingDao from "../dao/buildingDao"
import reportDao from "../dao/reportDao"

async function getBuilding(latitude, longitude) {
    const getBuilding = await buildingDao.BuildingQuery(latitude, longitude)
    return getBuilding
}
async function getOneBuilding(buildingIdx) {
    const buildingQuery = await buildingDao.oneBuildingQuery(buildingIdx)
    return buildingQuery
}
async function postReport(title, contents, img, userIdx, buildingIdx) {
    const reportQuery = await reportDao.insertBuildingReport(title, contents, img, userIdx, buildingIdx)
    return reportQuery
}

module.exports = {
    getBuilding,
    getOneBuilding,
    postReport
}