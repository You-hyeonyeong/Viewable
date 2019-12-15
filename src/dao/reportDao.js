import { query } from "../utils/mysql";

async function insertBuildingReport() {
    const insertQuery = `INSERT INTO report(title, contents, img) VALUES ( ?, ?, ?)`;
    return await query(insertQuery);
}
module.exports = { 
    insertBuildingReport 
}

