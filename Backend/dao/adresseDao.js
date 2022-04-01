const helper = require("../helper.js");
const LandDao = require("./landDao.js");


class AdresseDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const landDao = new LandDao(this._conn);

        var sql = "SELECT * FROM Adresse WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        return result;
    }

    loadAll() {
        const landDao = new LandDao(this._conn);
        var country = landDao.loadAll();

        var sql = "SELECT * FROM Adresse";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        result = helper.arrayObjectKeysToLower(result);

        for (var i = 0; i < result.length; i++) {
            for (var element of country) {
                if (element.id == result[i].land_id) {
                    result[i].land = element;
                    break;
                }
            }
            delete result[i].land_id;
        }


        return result;
    }


    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Adresse WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1)
            return true;

        return false;
    }
    create(strasse = "", hausnummer = "", plz = "", ort = "", land_id = "") {
        var sql = "INSERT INTO Adresse (Strasse,Hausnummer,PLZ,Ort,Land_ID) VALUES (?,?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [strasse, hausnummer, plz, ort, land_id];
        var result = statement.run(params);

        if (result.changes != 1)
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }
    selectLastID() {
        var sql = "SELECT id FROM Adresse ORDER BY id DESC LIMIT 1";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        return helper.arrayObjectKeysToLower(result);
    }

    toString() {
        helper.log("AdresseDao [_conn=" + this._conn + "]");
    }
}

module.exports = AdresseDao;