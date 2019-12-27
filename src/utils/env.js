const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/.env` });

const NODE_ENV = process.env.NODE_ENV;

const DB_HOST = process.env.DB_HOST;

const DB_PORT = process.env.DB_PORT;

const DB_USER = process.env.DB_USER;

const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_NAME = process.env.DB_NAME;

const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const PORT = process.env.PORT;

const AWS_ACCESSKEYID = process.env.AWS_ACCESSKEYID;

const AWS_SECRETACCESSKEY = process.env.AWS_SECRETACCESSKEY;

const AWS_REGION = process.env.AWS_REGION;

const KAKAO_APP_KEY = process.env.KAKAO_APP_KEY;

const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

const EC2_HOST = process.env.EC2_HOST;

const env = {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SECRET_ACCESS_KEY,
  PORT,
  AWS_ACCESSKEYID,
  AWS_SECRETACCESSKEY,
  AWS_REGION,
  KAKAO_APP_KEY,
  KAKAO_REDIRECT_URI,
  EC2_HOST
};

module.exports = env;