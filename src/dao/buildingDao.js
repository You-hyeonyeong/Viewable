const { query } = require("../utils/mysql");

async function BuildingQuery(latitude, longitude) {
  const selectQuery = `SELECT b.name, b.address, b.latitude, b.longitude, 
                        ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) )
                        *cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin(radians(latitude)) ) ) AS distance
                        FROM viewable.building b 
                        HAVING distance < 0.2
                        ORDER BY distance ;`;

  const aa = await query(selectQuery, [latitude, longitude, latitude]);
  console.log("aa" + aa);
  console.log("selectQuery" + selectQuery);
  return aa;
}

async function oneBuildingQuery(buildingIdx) {
  const selectQuery = `SELECT b.name, b.address, b.latitude, b.longitude,
                        (SELECT count(bsf.facilityIdx) FROM viewable.buildingStoreFacility bsf WHERE bsf.facilityIdx = 1) as accessRoad,
                        (SELECT count(bsf.facilityIdx) FROM viewable.buildingStoreFacility bsf WHERE bsf.facilityIdx = 2) as lift,
                        (SELECT count(bsf.facilityIdx) FROM viewable.buildingStoreFacility bsf WHERE bsf.facilityIdx = 3) as bathroom,
                        (SELECT count(bsf.facilityIdx) FROM viewable.buildingStoreFacility bsf WHERE bsf.facilityIdx = 4) as parking
                        FROM viewable.building b
                        JOIN viewable.buildingStoreFacility as bsf ON b.buildingIdx = bsf.buildingIdx
                        WHERE b.buildingIdx = ?
                        GROUP BY b.name;`;
  return await query(selectQuery, buildingIdx);
}

module.exports = {
  BuildingQuery,
  oneBuildingQuery
};