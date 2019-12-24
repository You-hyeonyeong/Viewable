import { query } from "../utils/mysql";

//빌딩 신고하기
async function insertBuildingReport(title, contents, img, userIdx, buildingIdx) {
    const insertQuery = `INSERT INTO viewable.report (title, contents, img, userIdx, buildingIdx) VALUES (?, ?, ?, ?, ?);`
    return await query(insertQuery,[title, contents, img, userIdx, buildingIdx]);
}
module.exports = { 
    insertBuildingReport
}

