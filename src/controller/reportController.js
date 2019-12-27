const { response } = require("../utils/response");
const reportService = require("../service/reportService");

async function getBuildingReport(req, res, next) {
  const userIdx = req.user.userIdx; // 차 후 헤더에서 받아와야함
  console.log(req.user);
  
  try {
    const test = await reportService.getBuildingReport(userIdx);
    response(res, 200, "성공");
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = {
  getBuildingReport
};