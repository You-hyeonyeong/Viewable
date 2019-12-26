import * as storeDao from "../dao/storeDao.js";

export const getBuildingStoreList = async buildingIdx => {
  try {
    const store = await storeDao.selectStoresBuBuildingIdx(buildingIdx);
    const storeList = makeUpStoreList(store);

    return storeList;
  } catch (e) {
    throw e;
  }
};

export const getFilteredStore = async(buildingIdx, category, facility) => {
  try {
    const categoryList = category.split(",");
    const facilityList = facility.split(",");

    let categoryWhere = ``;
    if (categoryList[0] !== "") {
      categoryWhere = `WHERE categoryIdx IN (`;
      for (let i = 0; i < categoryList.length; i++) {
        if (i != categoryList.length - 1) {
          categoryWhere += `${categoryList[i]},`;
        } else {
          categoryWhere += `${categoryList[i]})`;
        }
      }
    }

    let facilityWhere = ``;
    if (facilityList[0] !== "") {
      facilityWhere = ` AND facilityIdx IN (`;
      for (let i = 0; i < facilityList.length; i++) {
        if (i != facilityList.length - 1) {
          facilityWhere += `${facilityList[i]},`;
        } else {
          facilityWhere += `${facilityList[i]}) `;
        }
      }
    }

    const store = await storeDao.selectFilteredStore(
      buildingIdx,
      facilityWhere,
      categoryWhere
    );
    const storeList = makeUpStoreList(store);
    return { storeList };
  } catch (e) {
    throw e;
  }
};

export const getStoreByStoreIdx = async storeIdx => {
  try {
    const store = await storeDao.selectStoreInfo(storeIdx);
    console.log(store)
    const info = store[0];
    info["facilities"] = [];

    store.map(store => {
      info.facilities.push(store.facilityIdx);
    });
    delete info.facilityIdx;

    return info;
  } catch (e) {
    throw e;
  }
};

const makeUpStoreList = store => {
  const storeList = [{
    storeIdx: 0
  }];
  let listIdx = 0;
  for (let i = 0; i < store.length; i++) {
    if (storeList[listIdx].storeIdx === store[i].storeIdx) {
      storeList[listIdx].facility.push(store[i].facilityIdx);
    } else {
      storeList.push({
        ...store[i]
      });
      listIdx += 1;
      storeList[listIdx].facility = [store[i].facilityIdx];
      delete storeList[listIdx].facilityIdx;
    }
  }
  storeList.splice(0, 1);
  return storeList;
};

// 혀녕이 수정 
async function getStore(buildingIdx) {
    const storeQuery = await storeDao.selectStoreByBuildingIdx(buildingIdx)
    return storeQuery
}
async function getOneStore(storeIdx) {
    const storeQuery = await storeDao.selectStoreByStoreIdx(storeIdx)
    return storeQuery
}
async function getStoreByCategoryIdx(categoryIdx) {
    const storeQuery = await storeDao.selectStoreByCategoryIdx(categoryIdx)
    return storeQuery
}

module.exports = {
    getStore,
    getOneStore,
    getStoreByCategoryIdx,
    getStoreByStoreIdx
}
