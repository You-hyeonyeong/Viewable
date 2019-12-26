const { response } = require("../utils/response");
const storeService = require("../service/storeService");
const facilityService = require("../service/facilityService");

const getBuildingStoreList = async(req, res, next) => {
  try {
    let { category, facility } = req.query;
    let store;
    if (category === undefined && facility === undefined) {
      store = await storeService.getBuildingStoreList(req.params.buildingIdx);
    } else {
      category = category === undefined ? "" : category;
      facility = facility === undefined ? "" : facility;
      store = await storeService.getFilteredStore(
        req.params.buildingIdx,
        category,
        facility
      );
    }
    response(res, 200, store);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const getStoreByStoreIdx = async(req, res, next) => {
  try {
    const store = await storeService.getStoreByStoreIdx(req.params.storeIdx);
    response(res, 200, store);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

// 혀녕이 수정 부분
async function getStore(req, res, next) {
  const buildingIdx = req.params.buildingIdx;
  try {
    const test = await storeService.getStore(buildingIdx);
    response(res, 200, "성공");
  } catch (e) {
    next(e);
    return false;
  }
}

async function getOneStore(req, res, next) {
  const storeIdx = req.params.storeIdx;
  try {
    const test = await storeService.getStore(storeIdx);
    response(res, 200, "성공");
  } catch (e) {
    next(e);
    return false;
  }
}

async function getStoreByCategoryIdx(req, res, next) {
  const categoryIdx = req.params.categoryIdx;
  try {
    if (categoryIdx > 7) response(res, 200, "범위다름");
    const test = await storeService.getStoreByCategoryIdx(categoryIdx);
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
    const test = await facilityService.getFacilityByStore(storeIdx);
    response(res, 200, "성공", test);
  } catch (e) {
    next(e);
    return false;
  }
}

module.exports = {
  getBuildingStoreList,
  getStoreByStoreIdx,
  getStore,
  getOneStore,
  getStoreByCategoryIdx,
  getStoreByFilter
};
