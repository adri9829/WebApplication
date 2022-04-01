const helper = require("../helper.js");

class LandDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = "SELECT * FROM Land WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=" + id);

        return helper.objectKeysToLower(result);
    }

    loadAll() {
        var sql = "SELECT * FROM Land";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        return helper.arrayObjectKeysToLower(result);
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Land WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1)
            return true;

        return false;
    }

    create(bezeichnung = "") {
        var sql = "INSERT INTO Land (Bezeichnung) VALUES (?)";
        var statement = this._conn.prepare(sql);
        var params = [bezeichnung];
        var result = statement.run(params);

        if (result.changes != 1)
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }
    selectLastID() {
        var sql = "SELECT id FROM Land ORDER BY id DESC LIMIT 1";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        return helper.arrayObjectKeysToLower(result);
    }


    toString() {
        helper.log("LandDao [_conn=" + this._conn + "]");
    }
}

module.exports = LandDao;