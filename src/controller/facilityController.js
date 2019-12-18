import { response } from "../utils/response.js";
import facilityService from "../service/facilityService"

async function getAllFacility(req, res, next) {
    try {
    const test = await facilityService.getAllFacility()
    console.log(test)
    response(res, 200, "성공", test);
  } catch (e) {
    next(e);
    return false;
  }
}
module.exports = { 
    getAllFacility
}

