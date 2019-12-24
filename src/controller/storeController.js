import { response } from "../utils/index.js";
import * as storeService from "../service/storeService.js";

export const getBuildingStoreList = async(req, res, next) => {
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

export const getStoreByStoreIdx = async(req, res, next) => {
  try {
    const store = await storeService.getStoreByStoreIdx(req.params.storeIdx);
    response(res, 200, store);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};