import * as express from "express";
const router = express.Router();

import fileSys from "fs";

import request from "request-promise";

router.get("/", async(req, res) => {
  try {
    let result = [];
    let start = 1;
    let end = 0;

    for (let i = 1; i <= 6; i++) {
      if (i != 1) {
        start = end + 1;
      }
      end = 1000 * i;
      if (i == 6) {
        end = 5990;
      }

      const options = {
        method: "GET",
        uri: `http://openapi.seoul.go.kr:8088/726b417967686a3933374363564b64/json/BuildingUseInfo/${start}/${end}/`
      };

      let requestOpenApi = await request(options);
      const resultRow = JSON.parse(requestOpenApi).BuildingUseInfo.row;

      for (let j = 0; j < resultRow.length; j++) {
        const ADDR_OLD = resultRow[j].ADDR_OLD;

        if (ADDR_OLD.includes("마포구 공덕동")) {
          result.push(resultRow[j]);
        }
      }
    }
    console.log(result);

    fileSys.writeFileSync("result.json", JSON.stringify(result), "UTF-8");

    res
      .status(200)
      .json({
        total: result.length,
        result: result
      })
      .end();
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;