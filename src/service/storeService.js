const storeDao = require("../dao/storeDao");

const getBuildingStoreList = async buildingIdx => {
  try {
    const store = await storeDao.selectStoresByBuildingIdx(buildingIdx);
    const storeList = makeUpStoreList(store);

    return storeList;
  } catch (e) {
    throw e;
  }
};

const getFilteredStore = async(buildingIdx, category, facility) => {
  try {
    const categoryList = category.split(",");
    const facilityList = facility.split(",");

    let categoryWhere = ``;
    if (categoryList[0] !== "") {
      categoryWhere = `WHERE categoryIdx IN (`;
      for (let i = 0; i < categoryList.length; i++) {
        if (i != categoryList.length - 1) {
          categoryWhere += `${Number(categoryList[i]) + 1},`;
        } else {
          categoryWhere += `${Number(categoryList[i]) + 1})`;
        }
      }
    }

    let facilityWhere = ``;
    if (facilityList[0] !== "") {
      facilityWhere = ` AND facilityIdx IN (`;
      for (let i = 0; i < facilityList.length; i++) {
        if (i != facilityList.length - 1) {
          facilityWhere += `${Number(facilityList[i]) + 1},`;
        } else {
          facilityWhere += `${Number(facilityList[i]) + 1}) `;
        }
      }
    }

    const store = await storeDao.selectFilteredStore(
      buildingIdx,
      facilityWhere,
      categoryWhere
    );
    const storeList = makeUpStoreList(store);
    return storeList;
  } catch (e) {
    throw e;
  }
};

const getStoreByStoreIdx = async storeIdx => {
  try {
    const store = await storeDao.selectStoreInfo(storeIdx);
    console.log(store);
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

//카테고리별 검색
async function getStoreByCategoryIdx(categoryIdx) {
  const store = await storeDao.selectStoreByCategoryIdx(categoryIdx);
  const storeList = makeUpStoreList(store);

  storeList.map(store => {
    if (store.facility.length >= 4) {
      store["light"] = 3; // 초록불
    } else if (store.facility.length >= 2) {
      store["light"] = 2; // 노란불
    } else {
      store["light"] = 1; // 빨간불
    }
  });
  return { storeList };
}

// 검색
async function getStoreSearch(keyword, facility) {
  try {
    const facilityList = facility.split(",");
    let facilityWhere = ``;
    if (facilityList[0] !== "") {
      facilityWhere = ` WHERE facilityIdx IN (`;
      for (let i = 0; i < facilityList.length; i++) {
        if (i != facilityList.length - 1) {
          facilityWhere += `${facilityList[i]},`;
        } else {
          facilityWhere += `${facilityList[i]}) `;
        }
      }
    }

    const store = await storeDao.selectStoreByKeywordAndFilter(
      keyword,
      facilityWhere
    );
    const storeList = makeUpStoreList(store);

    storeList.map(store => {
      if (store.facility.length >= 4) {
        store["light"] = 3; // 초록불
      } else if (store.facility.length >= 2) {
        store["light"] = 2; // 노란불
      } else {
        store["light"] = 1; // 빨간불
      }
    });
    return { storeList };
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}
//검색어
async function getStoreSearchWord(keyword) {
  const searchQuery = await storeDao.selectStoreByKeyword(keyword);
  return searchQuery;
}
//selectFacilityByStoreIdx
async function getFacilityByStoreIdx(storeIdx) {
  const searchQuery = await storeDao.selectFacilityByStoreIdx(storeIdx);
  return searchQuery;
}
module.exports = {
  getBuildingStoreList,
  getFilteredStore,
  getStoreByStoreIdx,
  getStoreByCategoryIdx,
  getStoreSearch,
  getStoreSearchWord,
  getFacilityByStoreIdx
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