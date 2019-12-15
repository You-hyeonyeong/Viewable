import * as mysql from "promise-mysql";
import { env } from "./env";

let mysqlPool;
const mysqlConfig = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  connectionLimit: 20
};

async function getMysqlPool() {
  if (!mysqlPool) {
    mysqlPool = await mysql.createPool(mysqlConfig);
    return mysqlPool;
  }
  return mysqlPool;
}

async function query(...args) {
  const queryText = args[0];
  const data = args[1];

  await getMysqlPool();

  const connection = await mysqlPool.getConnection();
  const result = (await connection.query(queryText, data)) || null;

  connection.release();

  return result;
}

async function transaction(...args) {
  await getMysqlPool();

  const connection = await mysqlPool.getConnection();

  try {
    await connection.beginTransaction();

    await args[0](connection);
    await connection.commit();
  } catch (error) {
    console.log(error);
    await connection.rollback();
  } finally {
    connection.release();
  }
}

export { query, transaction };