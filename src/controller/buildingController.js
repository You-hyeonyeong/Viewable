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

async function getOneBuilding(req, res, next) {
  try {
    const oneBuilding = await buildingService.getOneBuilding(req.params.buildingIdx)
    response(res, 200, "성공", oneBuilding[0]);
  } catch (e) {
    next(e);
    return false;
  }
}

async function postbuildingReport(req, res, next) {
  const title = req.body.title;
  const contents = req.body.contents;
  const img = req.body.img;

  try {
    const postReport = await buildingService.postReport(title, contents, img)
    response(res, 200, "성공", postReport);
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = { 
  getTest,
  getOneBuilding,
  postbuildingReport
}

