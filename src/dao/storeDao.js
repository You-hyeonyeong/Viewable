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
    selectStoreByFilter


}

