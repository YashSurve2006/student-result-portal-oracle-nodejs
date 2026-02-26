const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getConnection() {
    return await oracledb.getConnection({
        user: "c##student",
        password: "student123",
        connectString: "localhost:1521/xepdb1"
    });
}

module.exports = { getConnection };
