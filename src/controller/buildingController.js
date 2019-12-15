import { response } from "../utils/response.js";
import buildingService from "../service/buildingService"

async function getTest(req, res, next) {
  try {
    const test = await buildingService.getTest()
    console.log(test)
    response(res, 200, "성공", test);
  } catch (e) {
    next(e);
    return false;
  }
}

async function oneBuilding(req, res, next) {
  try {
    const oneBuilding = await buildingService.getOneBuilding(req.params.buildingIdx)
    response(res, 200, "성공", oneBuilding[0]);
  } catch (e) {
    next(e);
    return false;
  }
}

async function buildingReport(req, res, next) {
  try {
    const oneBuilding = await buildingService.postReport(req.params.buildingIdx)
    response(res, 200, "성공", oneBuilding[0]);
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = { 
  getTest,
  oneBuilding,
  buildingReport
}

