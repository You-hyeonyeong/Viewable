const { query } = require("../utils/mysql");

async function selectTourList() {
  const selectQuery = `SELECT spot, thumnail, info, course FROM viewable.tourSpot;`;
  return await query(selectQuery);
}

async function selectOneTourList(tourSpotIdx) {
  const selectQuery = `SELECT spot, thumnail, info, course, contents FROM viewable.tourSpot WHERE tourSpotIdx = ?;`;
  return await query(selectQuery, [tourSpotIdx]);
}

module.exports = {
  selectTourList,
  selectOneTourList
};