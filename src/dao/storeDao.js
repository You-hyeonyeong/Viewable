const { query } = require("../utils/mysql");

const selectStoresByBuildingIdx = async buildingIdx => {
  const selectSql = `
      SELECT s.storeIdx, name, img, phone, address, operating, title as category, c.categoryIdx, facilityIdx
      FROM store AS s
      JOIN category AS c
      ON s.categoryIdx = c.categoryIdx AND s.buildingIdx = ${buildingIdx}
      JOIN buildingStoreFacility AS b
      ON s.storeIdx = b.storeIdx AND b.buildingIdx = ${buildingIdx}
      ORDER BY s.storeIdx;`;
  return await query(selectSql);
};

const selectFilteredStore = async(
  buildingIdx,
  facilityWhere,
  categoryWhere
) => {
  const selectSql = `
      SELECT *
      FROM (
        SELECT distinct storeIdx
        FROM buildingStoreFacility as b
        WHERE buildingIdx = ${buildingIdx}${facilityWhere}) AS sidx
      JOIN store AS s
      ON s.storeIdx = sidx.storeIdx
      JOIN buildingStoreFacility AS b
      ON s.storeIdx = b.storeIdx
      ${categoryWhere}`;
  return await query(selectSql);
};

const selectStoreInfo = async storeIdx => {
  const selectSql = `
      SELECT s.buildingIdx, s.storeIdx, s.name, img, phone, s.address, operating, title as category, c.categoryIdx, facilityIdx, latitude, longitude
      FROM store AS s
      JOIN category AS c
      ON s.categoryIdx = c.categoryIdx AND s.storeIdx = ${storeIdx}
      JOIN buildingStoreFacility AS bf
      ON s.storeIdx = bf.storeIdx AND bf.storeIdx = ${storeIdx}
      JOIN building AS b 
      ON b.buildingIdx = s.buildingIdx;`;
  return await query(selectSql);
};

async function selectStoreByCategoryIdx(categoryIdx) {
  // `SELECT s.*, b.latitude, b.longitude
  //                     FROM viewable.store s
  //                     JOIN viewable.building b ON b.buildingIdx = s.buildingIdx
  //                     WHERE s.categoryIdx = ?;`;
const selectQuery =  `SELECT s.storeIdx, s.name, img, phone, s.address, operating, b.buildingIdx, facilityIdx, b.name AS buildingName, latitude, longitude
                      FROM store AS s
                      JOIN buildingStoreFacility AS bsf
                      ON s.storeIdx = bsf.storeIdx
                      JOIN building as b
                      ON b.buildingIdx = s.buildingIdx
                      WHERE s.categoryIdx = ?;`
  return await query(selectQuery, [categoryIdx]);
}

async function selectStoreByKeywordAndFilter(keyword, facilityWhere) {
  const selectSql = `
  SELECT s.storeIdx, s.name, img, phone, s.address, operating, b.buildingIdx, facilityIdx, b.name AS buildingName, latitude, longitude
  FROM (
    SELECT distinct storeIdx
    FROM buildingStoreFacility as b${facilityWhere}) AS sidx
  JOIN store AS s
  ON s.storeIdx = sidx.storeIdx
  JOIN buildingStoreFacility AS bsf
  ON s.storeIdx = bsf.storeIdx
  JOIN building as b
  ON b.buildingIdx = s.buildingIdx
  WHERE s.name LIKE '%${keyword}%';`;
  return await query(selectSql);
}
//검색어
async function selectStoreByKeyword(keyword) {
  const selectSql = `
      SELECT s.buildingIdx, s.storeIdx, s.name, img, phone, s.address, operating, title as category, c.categoryIdx, facilityIdx, latitude, longitude
      FROM viewable.store AS s
      JOIN viewable.category AS c
      ON s.categoryIdx = c.categoryIdx
      JOIN viewable.buildingStoreFacility AS bf
      ON s.storeIdx = bf.storeIdx 
      JOIN viewable.building AS b 
      ON b.buildingIdx = s.buildingIdx
      WHERE s.name LIKE '%${keyword}%'
      GROUP BY bf.facilityIdx;`;
  return await query(selectSql);
}
//매장당 편의시설리스트
async function selectFacilityByStoreIdx(storeIdx) {
  const selectSql = `SELECT bf.facilityIdx 
                    FROM viewable.store s
                    JOIN viewable.buildingStoreFacility bf on bf.storeIdx = s.storeIdx 
                    WHERE bf.storeIdx = ?`;
  return await query(selectSql, [storeIdx]);
}

module.exports = {
  selectStoresByBuildingIdx,
  selectFilteredStore,
  selectStoreInfo,
  selectStoreByCategoryIdx,
  selectStoreByKeywordAndFilter,
  selectStoreByKeyword,
  selectFacilityByStoreIdx
};