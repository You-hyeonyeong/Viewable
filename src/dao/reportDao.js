import { query } from "../utils/mysql";

async function insertBuildingReport(title, contents, img) {
    const insertQuery = `INSERT INTO viewable.report (title, contents, img) VALUES (?, ?, ?);`
    return await query(insertQuery,[title, contents, img]);
}

async function selectBuildingReport(userIdx) {
    const selectQuery = `SELECT title, contents, img, CASE WHEN reception = "Y" THEN "읽음" ELSE "읽지 않음" END as reception
                         FROM viewable.report WHERE userIdx = ?;`
    return await query(selectQuery,[userIdx]);
}
module.exports = { 
    insertBuildingReport,
    selectBuildingReport
}

