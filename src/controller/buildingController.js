import { response } from "../utils/response.js";

export function getAllBuilding(req, res, next) {
  try {
    const building1 = [{
      id: "asdf",
      name: "test"
    }];
    response(res, 200, "성공", building1);
  } catch (e) {
    next(e);
    return false;
  }
}