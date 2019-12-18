import { query } from "../utils/mysql";

async function getAllFacility() {
    const selectQuery = `SELECT facilityIdx, name, info FROM facility`;
    return await query(selectQuery);
}
async function getFacilityImg(facilityIdx) {
    const selectQuery = `SELECT imgurl FROM viewable.img WHERE facilityIdx = ?`;
    return await query(selectQuery,[facilityIdx]);
}

module.exports = { 
    getAllFacility,
    getFacilityImg

}

