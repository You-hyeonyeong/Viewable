import buildingDao from "../dao/buildingDao"
import reportDao from "../dao/reportDao"

async function getTest() {
    const test = await buildingDao.BuildingQuery()
    console.log(test)
    return test
}
async function getOneBuilding(buildingIdx) {
    const buildingQuery = await buildingDao.oneBuildingQuery(buildingIdx)
    return buildingQuery
}
async function postReport(title, contents, img) {
    const reportQuery = await reportDao.insertBuildingReport(title, contents, img)
    return reportQuery
}

module.exports = {
    getTest,
    getOneBuilding,
    postReport
}