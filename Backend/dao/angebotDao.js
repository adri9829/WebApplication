const helper = require("../helper.js");
const RabattDao = require("./rabattDao");
class AngebotDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const rabattDao = new RabattDao(this._conn);

        var sql = "SELECT * FROM Angebot WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        result.rabatt = rabattDao.loadById(result.rabatt_id);
        delete result.rabatt_id;

        //result.angebotspreis = helper.round(result.produkt.bruttopreis*result.rabatt.faktor).toFixed(2);

        return result;
    }

    loadAll() {
        const rabattDao = new RabattDao(this._conn);
        var sale = rabattDao.loadAll();

        var sql = "SELECT * FROM Angebot";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result))
            return [];

        result = helper.arrayObjectKeysToLower(result);

        for (var i = 0; i < result.length; i++) {
            for (var element of sale) {
                if (element.id == result[i].rabatt_id) {
                    result[i].rabatt = element;
                    break;
                }
            }
            delete result[i].rabatt_id;

        }
        return result;
    }

    loadByProduct(id) {
        const rabattDao = new RabattDao(this._conn);

        var sql = "SELECT * FROM Angebot WHERE produkt_id=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        result.rabatt = rabattDao.loadById(result.rabatt_id);
        delete result.rabatt_id;

        //result.angebotspreis = helper.round(result.produkt.bruttopreis*result.rabatt.faktor).toFixed(2);

        return result;
    }



    toString() {
        helper.log("AngebotDao [_conn=" + this._conn + "]");
    }
}

module.exports = AngebotDao;