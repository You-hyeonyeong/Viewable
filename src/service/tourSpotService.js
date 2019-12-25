const tourSpotDao = require("../dao/tourSpoDao");

async function getTourList() {
  const tourSpotQuery = await tourSpotDao.selectTourList();
  return tourSpotQuery;
}
async function getOneTourList(tourSpotIdx) {
  const tourSpotQuery = await tourSpotDao.selectOneTourList(tourSpotIdx);
  return tourSpotQuery;
}
module.exports = {
  getTourList,
  getOneTourList
};