const { response } = require("../utils/response");
const buildingService = require("../service/buildingService");

async function getBuilding(req, res, next) {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  try {
    const test = await buildingService.getBuilding(latitude, longitude);
    console.log(latitude, longitude);
    response(res, 200, "성공", test);
  } catch (e) {
    next(e);
    return false;
  }
}

async function getOneBuilding(req, res, next) {
  try {
    const oneBuilding = await buildingService.getOneBuilding(
      req.params.buildingIdx
    );
    response(res, 200, "성공", oneBuilding[0]);
  } catch (e) {
    next(e);
    return false;
  }
}

async function postbuildingReport(req, res, next) {
  const userIdx = 1;
  //req.user.userIdx
  //console.log(userIdx);
  const buildingIdx = req.params.buildingIdx;
  const title = req.body.title;
  const contents = req.body.contents;
  const img = req.file.location;

  try {
    const postReport = await buildingService.postReport(
      title,
      contents,
      img,
      userIdx,
      buildingIdx
    );
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
};