import * as util from "../utils/index.js";

export const selectStoresBuBuildingIdx = async buildingIdx => {
  const selectSql = `
      SELECT s.storeIdx, name, img, phone, address, operating, title as category, c.categoryIdx, facilityIdx
      FROM store AS s
      JOIN category AS c
      ON s.categoryIdx = c.categoryIdx AND s.buildingIdx = ${buildingIdx}
      JOIN buildingStoreFacility AS b
      ON s.storeIdx = b.storeIdx AND b.buildingIdx = ${buildingIdx}
      ORDER BY s.storeIdx;`;
  return await util.query(selectSql);
};

export const selectFilteredStore = async(
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
  return await util.query(selectSql);
};

export const selectStoreInfo = async storeIdx => {
  const selectSql = `
      SELECT s.buildingIdx, s.storeIdx, s.name, img, phone, s.address, operating, title as category, c.categoryIdx, facilityIdx, latitude, longitude
      FROM store AS s
      JOIN category AS c
      ON s.categoryIdx = c.categoryIdx AND s.storeIdx = ${storeIdx}
      JOIN buildingStoreFacility AS bf
      ON s.storeIdx = bf.storeIdx AND bf.storeIdx = ${storeIdx}
      JOIN building AS b 
      ON b.buildingIdx = s.buildingIdx;`;
  return await util.query(selectSql);
};

// 혀녕이 수정 부분
async function selectStoreByBuildingIdx(buildingIdx) {
    const selectQuery = `SELECT s.name, s.img, s.phone, s.address, s.operating
                        c.title, 
                        FROM viewable.store s
                        JOIN viewable.category c ON s.categoryIdx = c.categoryIdx
                        JOIN viewable.builgingStoreFacility bsf ON s.buildingIdx = bsf.buildingIdx
                        WHERE s.buildingIdx = ?;`
    return await query(selectQuery,[buildingIdx]);
}

async function selectStoreByCategoryIdx(categoryIdx) {
    const selectQuery = `SELECT * FROM viewable.store WHERE categoryIdx = ?;`
    return await query(selectQuery,[categoryIdx]);
} 

//검색어 + 편의시설로 검색 가능 (편의시설 리스트는 아직)
async function selectStoreByFilter(facilityIdx) {
    const selectQuery = `SELECT s.*, f.name, bsf.facilityIdx FROM viewable.store s 
                        JOIN viewable.buildingStoreFacility bsf ON bsf.storeIdx = s.storeIdx
                        JOIN viewable.facility f ON f.facilityIdx = bsf.facilityIdx
                        WHERE s.name LIKE ? AND f.facilityIdx IN (?,?) group by s.name;`
    return await query(selectQuery,[facilityIdx,'%'+keyword+'%']);
} 

module.exports = { 
    selectStoreByBuildingIdx,
    selectStoreByCategoryIdx,
    selectStoreByFilter,
    selectStoreInfo
}
