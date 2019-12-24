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