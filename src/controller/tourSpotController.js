const { response } = require("../utils/response");
const tourSpotService = require("../service/tourSpotService");

async function getTourList(req, res, next) {
  try {
    const tourSpotList = await tourSpotService.getTourList();
    response(res, 200, "성공", tourSpotList);
  } catch (e) {
    next(e);
    return false;
  }
}
async function getOneTourList(req, res, next) {
  try {
    const tourSpotIdx = req.params.tourSpotIdx;
    const tourSpotList = await tourSpotService.getOneTourList(tourSpotIdx);
    response(res, 200, "성공", tourSpotList[0]);
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = {
  getTourList,
  getOneTourList
};