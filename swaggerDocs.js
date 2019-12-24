import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import express from "express";
import { env } from "./src/utils/index.js";

const router = express.Router();

const host =
  env.NODE_ENV === "development" ?
  `localhost:${env.PORT}` :
  `15.164.90.221`;

const options = {
  swaggerDefinition: {
    info: {
      title: "Viewable API",
      version: "1.0.0",
      description: "Viewable API Spec"
    },
    schemes: ["http"],
    host: `${host}`,
    basePath: "/",
    tags: [{
        name: "사용자",
        description: "유저 정보"
      },
      {
        name: "건물",
        description: "건물 정보"
      },
      {
        name: "상점",
        description: "건물 내 상점 정보"
      },
      {
        name: "편의시설",
        description: "편의시설 i 정보"
      },{
        name: "마이페이지",
        description: "프로필 정보와 신고리스트"

      }
    ],
    securityDefinitions: {
      Token: {
        name: "Authorization",
        type: "apiKey",
        in: "header"
      }
    },
    security: [{ Token: [] }]
  },
  apis: ["apiDocs/*.yaml"]
};

const specs = swaggerJsdoc(options);

router.use(
  "/apis",
  swaggerUi.serve,
  swaggerUi.setup(specs, false, { docExpansion: "none" })
);

module.exports = router;