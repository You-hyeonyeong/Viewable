const { response } = require("../utils/response");
const buildingService = require("../service/buildingService");

async function getBuilding(req, res, next) {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  try {
    const test = await buildingService.getBuilding(latitude, longitude);
    response(res, 200, "성공", test);
  } catch (e) {
    next(e);
    return false;
  }
}

async function getOneBuildingFacility(req, res, next) {
  try {
    const building = await buildingService.getOneBuildingFacility(
      req.params.buildingIdx
    );
    console.log(building);

    response(res, 200, "성공", building);
  } catch (e) {
    next(e);
    return false;
  }
}

async function postbuildingReport(req, res, next) {
  const userIdx = req.user.userIdx;
  const buildingIdx = req.params.buildingIdx;
  const title = req.body.title;
  const contents = req.body.contents;

  try {
    const postReport = await buildingService.postReport(
      title,
      contents,
      "https://viewablebucket.s3.ap-northeast-2.amazonaws.com/img.jpeg",
      userIdx,
      buildingIdx
    );
    response(res, 200, "성공");
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = {
  getBuilding,
  getOneBuildingFacility,
  postbuildingReport
};