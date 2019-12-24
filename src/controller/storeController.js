import { response } from "../utils/response.js";
import storeService from "../service/storeService"
import facilityService from "../service/facilityService"

async function getStore(req, res, next) {
  const buildingIdx = req.params.buildingIdx
  try {
    const test = await storeService.getStore(buildingIdx)
    response(res, 200, "성공");
  } catch (e) {
    next(e);
    return false;
  }
}

async function getOneStore(req, res, next) {
  const storeIdx = req.params.storeIdx
  try {
    const test = await storeService.getStore(storeIdx)
    response(res, 200, "성공");
  } catch (e) {
    next(e);
    return false;
  }
}

async function getStoreByCategoryIdx(req, res, next) {
  const categoryIdx = req.params.categoryIdx
  try {
    if (categoryIdx > 7) response(res, 200, "범위다름");
    const test = await storeService.getStoreByCategoryIdx(categoryIdx)
    response(res, 200, "성공", test);
  } catch (e) {
    next(e);
    return false;
  }
}
//검색조건 keyword 와 [facilityIdx] 미완성
async function getStoreByFilter(req, res, next) {
  const faciltyIdx = req.query.faciltyIdx;
  const keyword = req.query.keyword;

  try {
    const test = await facilityService.getFacilityByStore(storeIdx)
    response(res, 200, "성공", test);
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = {
  getStore,
  getOneStore,
  getStoreByCategoryIdx,
  getStoreByFilter

}

