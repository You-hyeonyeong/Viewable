import { query } from "../utils/mysql";

async function getAllFacility() {
    const selectQuery = `SELECT facilityIdx, name, info FROM facility`;
    return await query(selectQuery);
}
async function getFacilityImg(facilityIdx) {
    const selectQuery = `SELECT imgurl FROM viewable.img WHERE facilityIdx = ?`;
    return await query(selectQuery,[facilityIdx]);
}
async function getFacilityByStore(storeIdx) {
    const selectQuery = `SELECT bsf.facilityIdx FROM viewable.store s 
                        JOIN viewable.buildingStoreFacility bsf ON bsf.storeIdx = s.storeIdx
                        WHERE bsf.storeIdx = ?`
    return await query(selectQuery,[storeIdx]);
}

module.exports = { 
    getAllFacility,
    getFacilityImg,
    getFacilityByStore
}

