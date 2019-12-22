import { query } from "../utils/mysql";

async function selectStoreByBuildingIdx(buildingIdx) {
    const selectQuery = `SELECT s.name, s.img, s.phone, s.address, s.operating
                        c.title, 
                        FROM viewable.store s
                        JOIN viewable.category c ON s.categoryIdx = c.categoryIdx
                        JOIN viewable.builgingStoreFacility bsf ON s.buildingIdx = bsf.buildingIdx
                        WHERE s.buildingIdx = ?;`
    return await query(selectQuery,[buildingIdx]);
}
async function selectStoreByStoreIdx(storeIdx) {
    const selectQuery = `;`
    return await query(selectQuery,[storeIdx]);
}

async function selectStoreByCategoryIdx(categoryIdx) {
    const selectQuery = `SELECT * FROM viewable.store WHERE categoryIdx = ?;`
    return await query(selectQuery,[categoryIdx]);
} 

module.exports = { 
    selectStoreByBuildingIdx,
    selectStoreByStoreIdx,
    selectStoreByCategoryIdx

}

