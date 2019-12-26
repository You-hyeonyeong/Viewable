const { query } = require("../utils/mysql");

async function BuildingQuery(latitude, longitude) {
    const selectQuery = `SELECT b.buildingIdx, b.name, b.address, b.latitude, b.longitude, 
                        ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) )
                        *cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin(radians(latitude)) ) ) AS distance
                        FROM viewable.building b 
                        HAVING distance < 0.2
                        ORDER BY distance;`
    return await query(selectQuery,[latitude, longitude, latitude]);
}
async function BuildingFacilities(buildingIdx) {
    const selectQuery = `SELECT DISTINCT  bsf.buildingIdx, f.facilityIdx, f.name FROM viewable.facility f 
                        JOIN viewable.buildingStoreFacility bsf ON bsf.facilityIdx = f.facilityIdx
                        WHERE bsf.buildingIdx = ? AND f.facilityIdx < 5;`
    return await query(selectQuery,[buildingIdx]);
}


module.exports = { 
    BuildingQuery,
    BuildingFacilities
}
