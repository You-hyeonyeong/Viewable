const facilityDao = require("../dao/facilityDao");

async function getAllFacility() {
  const facilityItem = await facilityDao.getAllFacility();
  for (var i = 0, facility;
    (facility = facilityItem[i]); i++) {
    const facilityImg = await facilityDao.getFacilityImg(
      facilityItem[i].facilityIdx
    );
    facility.img = facilityImg;
  }
  return facilityItem;
}
async function getFacilityByStore(storeIdx) {
  const facilityListByStore = await facilityDao.getFacilityByStore(storeIdx);
  return facilityListByStore;
}

module.exports = {
  getAllFacility,
  getFacilityByStore
};