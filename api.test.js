import { expect } from "chai";
import request from "supertest";
import app from "./app.js";

describe("Viewable API Test", () => {
  const req = request(app);

  before(async() => {
    // API 테스트를 하기 전 전처리 과정을 적어주면 됨
    // (전처리 과정이 필요할 시)
  });

  describe("유저", () => {
    it("유저 테스트", async() => {
      await req
        .post("/user/kakao")
        .send({
          name: "genie"
        })
        .expect(200);
    });
  });

  describe("신고", () => {
    it("신고 작성 테스트", async() => {
      await req
        .post("/building/:buildingIdx/report")
        .field("title", "aaa")
        .field("contents", "babo")
        .attach("img", "./file.png")
        // .send({
        //   title: "genie",
        //   contents: "babo",
        //   img: "gini"
        // })
        .expect(200);
    });
    it("신고 조회 테스트", async() => {
      await req
        .get("/report")
        .expect(200);
    });
  });

  describe("시설", () => {
    it("시설 테스트", async() => {
      await req
        .get("/facility/info")
        .expect(200);
    });
  });

  describe("관광지", () => {
    it("전체 관광지 조회 테스트", async() => {
      await req
        .get("/tourSpot")
        .expect(200);
    });
    it("관광지 상세 조회 테스트", async() => {
      await req
        .get("/tourSpot/:tourSpotIdx")
        .expect(200);
    });
  });
});