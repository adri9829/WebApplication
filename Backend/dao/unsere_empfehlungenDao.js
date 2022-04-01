const helper = require("../helper.js");


class Unsere_EmpfehlungenDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = "SELECT * FROM Unsere_Empfehlungen WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);


        return result;

    }

    loadAll() {
        var sql = "SELECT * FROM Unsere_Empfehlungen";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        return helper.arrayObjectKeysToLower(result);
    }

    toString() {
        helper.log("Unsere_EmpfehlungenDao [_conn=" + this._conn + "]");
    }
}

module.exports = Unsere_EmpfehlungenDao;