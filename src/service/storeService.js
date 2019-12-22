import storeDao from "../dao/storeDao"

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
    getStoreByCategoryIdx
}