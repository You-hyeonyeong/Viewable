import { response } from "../utils/response.js";
import buildingService from "../service/buildingService"

async function getBuilding(req, res, next) {
  const latitude = req.query.latitude
  const longitude = req.query.longitude
  try {
    const test = await buildingService.getBuilding(latitude, longitude)
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
  const img = req.file.location;

  try {
    const postReport = await buildingService.postReport(title, contents, img)
    response(res, 200, "성공", postReport);
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = { 
  getBuilding,
  getOneBuilding,
  postbuildingReport
}

