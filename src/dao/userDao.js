import { query } from "../utils/index.js";

export const selectUserById = async id => {
  const selectSql = `
        SELECT *
        FROM user
        WHERE id = ${id}`;

  return await query(selectSql);
};

export const insertUser = async(id, useremail, username, userImg) => {
  const insertSql = `
        INSERT INTO user (id, useremail, username, userImg, createdAt)
        VALUES (?, ?, ?, ?, NOW())`;

  return await query(insertSql, [id, useremail, username, userImg]);
};