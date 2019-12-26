const { query } = require("../utils/mysql");

async function selectUserProfile(userIdx) {
  const selectQuery = `SELECT username, userImg FROM viewable.user WHERE userIdx = ?;`;
  return await query(selectQuery, [userIdx]);
}
//내 프로필 + 신고리스트 보기
async function selectUserReport(userIdx) {
  const selectQuery = `SELECT r.title, r.contents, r.img, DATE_FORMAT(r.createdAt,'%Y.%m.%d') as date ,r.reception, b.name 
                        FROM viewable.report r
                        JOIN viewable.building b ON r.buildingIdx = b.buildingIdx
                        WHERE r.userIdx = ? ;`;
  return await query(selectQuery, [userIdx]);
}

const selectUserById = async id => {
  const selectSql = `
        SELECT *
        FROM user
        WHERE id = ${id}`;

  return await query(selectSql);
};

const insertUser = async(id, useremail, username, userImg) => {
  const insertSql = `
        INSERT INTO user (id, useremail, username, userImg, createdAt)
        VALUES (?, ?, ?, ?, NOW())`;

  return await query(insertSql, [id, useremail, username, userImg]);
};

module.exports = {
  selectUserProfile,
  selectUserReport,
  selectUserById,
  insertUser
};