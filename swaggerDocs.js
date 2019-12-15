import * as swaggerUi from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";
import * as express from "express";
import { env } from "./src/utils/index.js";

const router = express.Router();

const host =
  env.NODE_ENV === "development" ?
  `localhost:${env.PORT}` :
  `도메인이나 EC2 IP`;

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
        name: "건물",
        description: "건물 정보"
      },
      {
        name: "상점",
        description: "건물 내 상점 정보"
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