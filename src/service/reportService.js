const reportDao = require("../dao/reportDao");

async function getBuildingReport(userIdx) {
  const reportQuery = await reportDao.selectBuildingReport(userIdx);
  console.log("test: " + reportQuery);
  return reportQuery;
}

module.exports = {
  getBuildingReport
};