const helper = require("../helper.js");
const AdresseDao = require("./adresseDao.js");
const PersonDao = require("./personDao.js");


class LieferadresseDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }


    loadById(id) {
        const adresseDao = new AdresseDao(this._conn);
        const personDao = new PersonDao(this._conn);

        var sql = "SELECT * FROM Lieferadresse WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);


        if (helper.isUndefined(result))
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        //Zum aufsplitten der Daten 


        result.person = personDao.loadById(result.person_id);
        delete result.person_id;

        result.adresse = adresseDao.loadById(result.adresse_id);
        delete result.adresse_id;


        return result;
    }

    loadAll() {
        const adresseDao = new AdresseDao(this._conn);
        var ad = adresseDao.loadAll();
        const personDao = new PersonDao(this._conn);
        var person = personDao.loadAll();

        var sql = "SELECT * FROM Lieferadresse";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        result = helper.arrayObjectKeysToLower(result);

        for (var i = 0; i < result.length; i++) {
            for (var element of ad) {
                if (element.id == result[i].adresse_id) {
                    result[i].adresse = element;
                    break;
                }
            }
            delete result[i].adresse_id;
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
        var sql = "SELECT COUNT(ID) AS cnt FROM Lieferadresse WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1)
            return true;

        return false;
    }

    create(adresse_id = "", person_id = "") {
        var sql = "INSERT INTO Lieferadresse (Adresse_ID,Person_ID) VALUES (?,?)";
        var statement = this._conn.prepare(sql);
        var params = [adresse_id, person_id];
        var result = statement.run(params);

        if (result.changes != 1)
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }
    selectLastID() {
        var sql = "SELECT id FROM Lieferadresse ORDER BY id DESC LIMIT 1";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        return helper.arrayObjectKeysToLower(result);
    }


    toString() {
        helper.log("LieferadresseDao [_conn=" + this._conn + "]");
    }
}

module.exports = LieferadresseDao;