import { query } from "../utils/mysql";

async function BuildingQuery() {
    const selectQuery = `SELECT * FROM viewable.building`;
    return await query(selectQuery);
}

async function oneBuildingQuery(buildingIdx) {
    const selectQuery = `SELECT name, address FROM viewable.building WHERE buildingIdx = ? `;
    return await query(selectQuery, (buildingIdx));
}


module.exports = { 
    BuildingQuery,
    oneBuildingQuery
}
