import { query } from "../utils/mysql";

async function getFacility() {
    const getFacility = `SELECT * FROM facility`;
    return await query(getFacility);
}


module.exports = { 
    getFacility 
}

