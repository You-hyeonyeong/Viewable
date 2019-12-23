import { query } from "../utils/mysql";

//빌딩 신고하기
async function insertBuildingReport(title, contents, img, userIdx, buildingIdx) {
    const insertQuery = `INSERT INTO viewable.report (title, contents, img, userIdx, buildingIdx) VALUES (?, ?, ?, ?, ?);`
    return await query(insertQuery,[title, contents, img, userIdx, buildingIdx]);
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

