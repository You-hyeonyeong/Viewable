import { response } from "../utils/response.js";
import storeService from "../service/storeService"

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
    if(categoryIdx > 7)  response(res, 200, "범위다름");
    const test = await storeService.getStoreByCategoryIdx(categoryIdx)
    response(res, 200, "성공", test);
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = {
  getStore,
  getOneStore,
  getStoreByCategoryIdx

}

