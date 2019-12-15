import { config } from "dotenv";
config({ path: `${__dirname}/../.env` });

const NODE_ENV = process.env.NODE_ENV;

const DB_HOST = process.env.DB_HOST;

const DB_PORT = process.env.DB_HOST;

const DB_USER = process.env.DB_USER;

const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_NAME = process.env.DB_NAME;

const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const PORT = process.env.PORT;

const env = {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SECRET_ACCESS_KEY,
  PORT
};

export { env };