const helper = require("../helper.js");
const KategorieDao = require("./kategorieDao.js");
const MehrwertsteuerDao = require("./mehrwertsteuerDao.js");
const ProduktbildDao = require("./produktbildDao.js");
const PfandstufeDao = require("./pfandstufeDao.js");
const AngebotDao = require("./angebotDao.js");


class ProduktDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }
    readSale() {
        var sql = "select id from produkt p where p.id = (select produkt_id from angebot a where p.id = a.produkt_id)";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=");

        result = helper.objectKeysToLower(result);
        return result;
    }
    readTop() {
        var sql = "select id from produkt p where p.id=(select produkt_id from top10 t where p.id=t.produkt_id)";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=");

        result = helper.objectKeysToLower(result);
        return result;
    }
    readRecommendation() {
        var sql = "select id from produkt p where p.id=(select produkt_id from unsere_empfehlungen e where p.id=e.produkt_id)";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=");

        result = helper.objectKeysToLower(result);
        return result;
    }


    loadById(id) {
        const kategorieDao = new KategorieDao(this._conn);
        const mehrwertsteuerDao = new MehrwertsteuerDao(this._conn);
        const produktbildDao = new ProduktbildDao(this._conn);
        const pfandstufeDao = new PfandstufeDao(this._conn);
        const angebotDao = new AngebotDao(this._conn);

        var sql = "SELECT * FROM Produkt WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        var result_sale = this.readSale();
        var length = Object.keys(result_sale).length;
        var obj1 = [];


        for (var i = 0; i < length; i++) {
            obj1.push(Object.values(result_sale[i])[0])
        }

        if (helper.isUndefined(result))
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        //Zum aufsplitten der Daten 

        result.kategorie = kategorieDao.loadById(result.kategorie_id);
        delete result.kategorie_id;

        result.mehrwertsteuer = mehrwertsteuerDao.loadById(result.mehrwertsteuer_id);
        delete result.mehrwertsteuer_id;

        result.pfandstufe = pfandstufeDao.loadById(result.pfandstufe_id);
        delete result.pfandstufe_id;

        result.bilder = produktbildDao.loadById(result.id);
        delete result.bilder.produkt_id;
        delete result.bilder.produkt;


        if (obj1.includes(parseInt(id))) {
            result.angebot = angebotDao.loadByProduct(result.id);
            delete result.angebot.produkt_id;
            result.mehrwertsteueranteil = helper.round((result.nettopreis) * result.mehrwertsteuer.steuersatz);
            var preis = helper.round(result.nettopreis + result.mehrwertsteueranteil).toFixed(2);
            result.bruttopreis = helper.round(preis * result.angebot.rabatt.faktor).toFixed(2); //bruttopreis 

        }
        else {
            result.mehrwertsteueranteil = helper.round((result.nettopreis) * result.mehrwertsteuer.steuersatz);
            result.bruttopreis = helper.round(result.nettopreis + result.mehrwertsteueranteil).toFixed(2);
        }

        return result;
    }

    loadByKategorie(id) {
        const kategorieDao = new KategorieDao(this._conn);
        var categories = kategorieDao.loadAll();
        const mehrwertsteuerDao = new MehrwertsteuerDao(this._conn);
        var taxes = mehrwertsteuerDao.loadAll();
        const pfandstufeDao = new PfandstufeDao(this._conn);
        var pain = pfandstufeDao.loadAll();
        const produktbildDao = new ProduktbildDao(this._conn);
        var pictures = produktbildDao.loadAll();
        const angebotDao = new AngebotDao(this._conn);
        var sale = angebotDao.loadAll();


        var sql = "SELECT * FROM Produkt WHERE kategorie_id=?";
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);


        var result_sale = this.readSale();
        var length = Object.keys(result_sale).length;
        var obj1 = [];


        for (var i = 0; i < length; i++) {
            obj1.push(Object.values(result_sale[i])[0])
        }


        if (helper.isArrayEmpty(result))
            return [];

        result = helper.arrayObjectKeysToLower(result);

        for (var i = 0; i < result.length; i++) {
            for (var element of categories) {
                if (element.id == result[i].kategorie_id) {
                    result[i].kategorie = element;
                    break;
                }
            }
            delete result[i].kategorie_id;

            for (var element of taxes) {
                if (element.id == result[i].mehrwertsteuer_id) {
                    result[i].mehrwertsteuer = element;
                    break;
                }
            }
            delete result[i].mehrwertsteuer_id;

            for (var element of pain) {
                if (element.id == result[i].pfandstufe_id) {
                    result[i].pfandstufe = element;
                    break;
                }
            }
            delete result[i].pfandstufe_id;

            for (var element of pictures) {
                if (element.produkt_id == result[i].id) {
                    result[i].bilder = (element);

                }
            }
            delete result[i].bilder.produkt_id;
            delete result[i].bilder.produkt;


            if (obj1.includes(parseInt(result[i].id))) {
                for (var element of sale) {
                    if (element.produkt_id == result[i].id) {
                        result[i].angebot = (element);
                    }
                }
                delete result[i].angebot.produkt_id;
                result[i].mehrwertsteueranteil = helper.round((result[i].nettopreis) * result[i].mehrwertsteuer.steuersatz);
                var preis = helper.round(result[i].nettopreis + result[i].mehrwertsteueranteil).toFixed(2);
                result[i].bruttopreis = helper.round(preis * result[i].angebot.rabatt.faktor).toFixed(2); //bruttopreis 

            }
            else {
                result[i].mehrwertsteueranteil = helper.round((result[i].nettopreis) * result[i].mehrwertsteuer.steuersatz);
                result[i].bruttopreis = helper.round(result[i].nettopreis + result[i].mehrwertsteueranteil).toFixed(2);
            }
        }

        return result;
    }

    loadByAngebot() {
        var result_sale = this.readSale();
        var length = Object.keys(result_sale).length;
        var obj1 = [];
        var result = [];

        for (var i = 0; i < length; i++) {
            obj1.push(Object.values(result_sale[i])[0])
            result.push(this.loadById(obj1[i]))
        }
        return result;

    }

    loadByTop() {
        var result_top = this.readTop();
        var length = Object.keys(result_top).length;
        var obj1 = [];
        var result = [];

        for (var i = 0; i < length; i++) {
            obj1.push(Object.values(result_top[i])[0])
            result.push(this.loadById(obj1[i]))
        }

        return result;
    }

    loadByreadRecommendation() {
        var result_recommandation = this.readRecommendation();
        var length = Object.keys(result_recommandation).length;
        var obj1 = [];
        var result = [];

        for (var i = 0; i < length; i++) {
            obj1.push(Object.values(result_recommandation[i])[0])
            result.push(this.loadById(obj1[i]))
        }
        return result;
    }

    loadAll() {
        const kategorieDao = new KategorieDao(this._conn);
        var categories = kategorieDao.loadAll();
        const mehrwertsteuerDao = new MehrwertsteuerDao(this._conn);
        var taxes = mehrwertsteuerDao.loadAll();
        const pfandstufeDao = new PfandstufeDao(this._conn);
        var pain = pfandstufeDao.loadAll();
        const produktbildDao = new ProduktbildDao(this._conn);
        var pictures = produktbildDao.loadAll();
        const angebotDao = new AngebotDao(this._conn);
        var sale = angebotDao.loadAll();


        var sql = "SELECT * FROM Produkt";
        var statement = this._conn.prepare(sql);
        var result = statement.all();


        var result_sale = this.readSale();
        var length = Object.keys(result_sale).length;
        var obj1 = [];


        for (var i = 0; i < length; i++) {
            obj1.push(Object.values(result_sale[i])[0])
        }

        if (helper.isArrayEmpty(result))
            return [];

        result = helper.arrayObjectKeysToLower(result);

        for (var i = 0; i < result.length; i++) {
            for (var element of categories) {
                if (element.id == result[i].kategorie_id) {
                    result[i].kategorie = element;
                    break;
                }
            }
            delete result[i].kategorie_id;

            for (var element of taxes) {
                if (element.id == result[i].mehrwertsteuer_id) {
                    result[i].mehrwertsteuer = element;
                    break;
                }
            }
            delete result[i].mehrwertsteuer_id;

            for (var element of pain) {
                if (element.id == result[i].pfandstufe_id) {
                    result[i].pfandstufe = element;
                    break;
                }
            }
            delete result[i].pfandstufe_id;



            for (var element of pictures) {
                if (element.produkt_id == result[i].id) {
                    result[i].bilder = (element);

                }
            }
            delete result[i].bilder.produkt_id;
            delete result[i].bilder.produkt;

            if (obj1.includes(parseInt(result[i].id))) {
                for (var element of sale) {
                    if (element.produkt_id == result[i].id) {
                        result[i].angebot = (element);
                    }
                }
                delete result[i].angebot.produkt_id;
                result[i].mehrwertsteueranteil = helper.round((result[i].nettopreis) * result[i].mehrwertsteuer.steuersatz);
                var preis = helper.round(result[i].nettopreis + result[i].mehrwertsteueranteil).toFixed(2);
                result[i].bruttopreis = helper.round(preis * result[i].angebot.rabatt.faktor).toFixed(2); //bruttopreis 

            }
            else {
                result[i].mehrwertsteueranteil = helper.round((result[i].nettopreis) * result[i].mehrwertsteuer.steuersatz);
                result[i].bruttopreis = helper.round(result[i].nettopreis + result[i].mehrwertsteueranteil).toFixed(2);
            }


        }

        return result;
    }



    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Produkt WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1)
            return true;

        return false;
    }

    toString() {
        helper.log("ProduktDao [_conn=" + this._conn + "]");
    }
}

module.exports = ProduktDao;