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

const getStoreByStoreIdx = async storeIdx => {
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

async function getStoreByCategoryIdx(categoryIdx) {
  const storeQuery = await storeDao.selectStoreByCategoryIdx(categoryIdx);
  return storeQuery;
}

//키워드 + 편의시설 선택
async function getStoreSearch(keyword, facilityIdx) {
  const searchQuery = await storeDao.selectStoreByFilter(keyword, facilityIdx)
  let storeArray = [];
  let storeList = [];
  let facilityList = [];
  //일단 매장리스트 넘겨주기
  for(var key in searchQuery) {
    const storeIdx = searchQuery[key]['storeIdx'];
    storeArray.push(storeIdx)
  }
  console.log("매장리스트" + storeArray)
  //매장리스트별 편의시설 불러오기
   for(let value of storeArray){
    const storeList = await getFacilityByStoreIdx(value)
    console.log("길이" + storeList.length)
    for(var i in storeList) {
      console.log(storeList[i].facilityIdx);
      facilityList.push(storeList[i].facilityIdx)
    }
    console.log("들어간 배욜" + facilityList)
    console.log("한매장 끝")
   }
  //  for (var i=0, storeFacility; storeFacility =  searchQuery[i]; i++ ){
  //    const 
  //  }


  const sum = {
    "searchQuery" : searchQuery,
    "storeList" : storeList
  }
  console.log(sum)
  return sum;
}
//검색어
async function getStoreSearchWord(keyword) {
  const searchQuery = await storeDao.selectStoreByKeyword(keyword)
  return searchQuery;
}
//selectFacilityByStoreIdx
async function getFacilityByStoreIdx(storeIdx) {
  const searchQuery = await storeDao.selectFacilityByStoreIdx(storeIdx)
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
