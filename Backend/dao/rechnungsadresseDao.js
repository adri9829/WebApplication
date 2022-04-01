const helper = require("../helper.js");
const KundeDao = require("./kundeDao.js");
const AdresseDao = require("./adresseDao.js");


class RechnungsadresseDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const adresseDao = new AdresseDao(this._conn);
        const kundeDao = new KundeDao(this._conn);

        var sql = "SELECT * FROM Rechnungsadresse WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);


        if (helper.isUndefined(result))
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        //Zum aufsplitten der Daten 


        result.kunde = kundeDao.loadById(result.kunde_id);
        delete result.kunde_id;

        result.adresse = adresseDao.loadById(result.adresse_id);
        delete result.adresse_id;


        return result;
    }

    loadAll() {
        const adresseDao = new AdresseDao(this._conn);
        var ad = adresseDao.loadAll();
        const kundeDao = new KundeDao(this._conn);
        var cu = kundeDao.loadAll();

        var sql = "SELECT * FROM Rechnungsadresse";
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
            for (var element of cu) {
                if (element.id == result[i].kunde_id) {
                    result[i].kunde = element;
                    break;
                }
            }
            delete result[i].kunde_id;
        }


        return result;
    }


    create(adresse_id = "", kunde_id = "") {
        var sql = "INSERT INTO Rechnungsadresse (Adresse_ID,Kunde_ID) VALUES (?,?)";
        var statement = this._conn.prepare(sql);
        var params = [adresse_id, kunde_id];
        var result = statement.run(params);

        if (result.changes != 1)
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }


    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Rechnungsadresse WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1)
            return true;

        return false;
    }
    selectLastID() {
        var sql = "SELECT id FROM Rechnungsadresse ORDER BY id DESC LIMIT 1";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        return helper.arrayObjectKeysToLower(result);
    }

    toString() {
        helper.log("RechnungsadresseDao [_conn=" + this._conn + "]");
    }
}

module.exports = RechnungsadresseDao;