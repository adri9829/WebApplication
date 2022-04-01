const helper = require("../helper.js");
const ZahlungsartDao = require("./zahlungsartDao.js");
const LieferadresseDao = require("./lieferadresseDao.js");
const RechnungsadresseDao = require("./rechnungsadresseDao.js");

class BestellungDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const zahlungsartDao = new ZahlungsartDao(this._conn);
        const lieferadresseDao = new LieferadresseDao(this._conn);
        const rechnungsadresseDao = new RechnungsadresseDao(this._conn);


        var sql = "SELECT * FROM Bestellung WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);


        result = helper.objectKeysToLower(result);

        //Zum aufsplitten der Daten 


        result.zahlungsart = zahlungsartDao.loadById(result.zahlungsart_id);
        delete result.zahlungsart_id;

        result.lieferadresse = lieferadresseDao.loadById(result.lieferadresse_id);
        delete result.lieferadresse_id;

        result.rechnungsadresse = rechnungsadresseDao.loadById(result.rechnungsadresse_id);
        delete result.rechnungsadresse_id;


        return result;
    }

    loadAll() {
        const zahlungsartDao = new ZahlungsartDao(this._conn);
        var pay = zahlungsartDao.loadAll();
        const lieferadresseDao = new LieferadresseDao(this._conn);
        var lf = lieferadresseDao.loadAll();
        const rechnungsadresseDao = new RechnungsadresseDao(this._conn);
        var rf = rechnungsadresseDao.loadAll();

        var sql = "SELECT * FROM Bestellung";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        result = helper.arrayObjectKeysToLower(result);

        for (var i = 0; i < result.length; i++) {
            for (var element of pay) {
                if (element.id == result[i].zahlungsart_id) {
                    result[i].zahlungsart = element;
                    break;
                }
            }
            delete result[i].zahlungsart_id;
            for (var element of lf) {
                if (element.id == result[i].lieferadresse_id) {
                    result[i].lieferadresse = element;
                    break;
                }
            }
            delete result[i].lieferadresse_id;

            for (var element of rf) {
                if (element.id == result[i].rechnungsadresse_id) {
                    result[i].rechnungsadresse = element;
                    break;
                }
            }
            delete result[i].rechnungsadresse_id;

        }


        return result;
    }


    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Bestellung WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1)
            return true;

        return false;
    }

    create(bestellzeitpunkt = "", zahlungsart_id = "", lieferadresse_id = "", rechnungsadresse_id = "") {
        var sql = "INSERT INTO Bestellung (Bestellzeitpunkt, Zahlungsart_ID, Lieferadresse_ID, Rechnungsadresse_ID) VALUES (?,?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [bestellzeitpunkt, zahlungsart_id, lieferadresse_id, rechnungsadresse_id];
        var result = statement.run(params);

        if (result.changes != 1)
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }
    selectLastID() {
        var sql = "SELECT id FROM Bestellung ORDER BY id DESC LIMIT 1";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        return helper.arrayObjectKeysToLower(result);
    }

    toString() {
        helper.log("BestellungDao [_conn=" + this._conn + "]");
    }
}

module.exports = BestellungDao;