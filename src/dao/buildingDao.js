import { query } from "../utils/mysql";

async function BuildingQuery() {
    const buildingSql = `SELECT * FROM viewable.building`;
    return await query(buildingSql);
}

async function oneBuildingQuery(buildingIdx) {
    const onebuildingSql = `SELECT * FROM viewable.building WHERE buildingIdx = ? `;
    return await query(onebuildingSql, (buildingIdx));
}


module.exports = { 
    BuildingQuery,
    oneBuildingQuery
}
