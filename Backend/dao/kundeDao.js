const helper = require("../helper.js");
const PersonDao = require("./personDao.js");


class KundeDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const personDao = new PersonDao(this._conn);

        var sql = "SELECT * FROM Kunde WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        result.person = personDao.loadById(result.person_id);
        delete result.person_id;

        return result;
    }

    loadAll() {
        const personDao = new PersonDao(this._conn);
        var person = personDao.loadAll();

        var sql = "SELECT * FROM Kunde";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        result = helper.arrayObjectKeysToLower(result);

        for (var i = 0; i < result.length; i++) {
            for (var element of person) {
                if (element.id == result[i].person_id) {
                    result[i].person = element;
                    break;
                }
            }
            delete result[i].person_id;
        }


        return result;
    }


    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Kunde WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1)
            return true;

        return false;
    }
    create(email = "", geburtsdatum = "", person_id = "") {
        var sql = "INSERT INTO Kunde (Email,Geburtsdatum,Person_id) VALUES (?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [email, geburtsdatum, person_id];
        var result = statement.run(params);

        if (result.changes != 1)
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }



    selectLastID() {
        var sql = "SELECT id FROM Kunde ORDER BY id DESC LIMIT 1";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        return helper.arrayObjectKeysToLower(result);
    }


    toString() {
        helper.log("KundeDao [_conn=" + this._conn + "]");
    }
}

module.exports = KundeDao;