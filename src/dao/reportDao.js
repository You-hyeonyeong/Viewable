import { query } from "../utils/mysql";

async function insertBuildingReport(title, contents, img) {
    const insertQuery = `INSERT INTO viewable.report (title, contents, img) VALUES (?, ?, ?);`
    return await query(insertQuery,[title, contents, img]);
}
module.exports = { 
    insertBuildingReport 
}

