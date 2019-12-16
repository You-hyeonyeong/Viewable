import { response } from "../utils/response.js";
import reportService from "../service/reportService"

async function getBuildingReport(req, res, next) {
    const userIdx = 1; // 차 후 헤더에서 받아와야함
     try {
    const test = await reportService.getBuildingReport(userIdx)
    console.log(test)
    response(res, 200, "성공", test);
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = { 
  getBuildingReport
}

