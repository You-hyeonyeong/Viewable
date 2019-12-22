import { query } from "../utils/mysql";

async function selectUserProfile(userIdx) {
    const selectQuery = `SELECT username, userImg FROM viewable.user WHERE userIdx = ?;`
    return await query(selectQuery,[userIdx]);
}
async function selectUserReport(userIdx) {
    const selectQuery = `SELECT title, contents, img, DATE_FORMAT(createdAt,'%Y.%m.%d') as date ,reception FROM viewable.report WHERE userIdx = ?;`
    return await query(selectQuery,[userIdx]);
}

module.exports = { 
    selectUserProfile,
    selectUserReport
}
