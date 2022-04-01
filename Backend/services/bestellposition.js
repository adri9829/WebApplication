const helper = require("../helper.js");
const BestellpositionDao = require("../dao/bestellpositionDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/bestellposition/gib/:id", function(request, response) {
    helper.log("Service Bestellposition: Client requested one record, id=" + request.params.id);

    const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);
    try {
        var result = bestellpositionDao.loadById(request.params.id);
        helper.log("Service Bestellposition: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Bestellposition: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/bestellposition/produkt/:id", function(request, response) {
    helper.log("Service Bestellposition: Client requested one record, id=" + request.params.id);

    const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);
    try {
        var result = bestellpositionDao.loadByBestellung(request.params.id);
        helper.log("Service Bestellposition: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Bestellposition: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});




serviceRouter.get("/bestellposition/existiert/:id", function(request, response) {
    helper.log("Service Bestellposition: Client requested check, if record exists, id=" + request.params.id);

    const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);
    try {
        var result = bestellpositionDao.exists(request.params.id);
        helper.log("Service Bestellposition: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Bestellposition: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/bestellposition", function(request, response) {
    helper.log("Service Bestellposition: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.menge)) 
        errorMsgs.push("menge fehlt");
    if (helper.isUndefined(request.body.produkt_id)) 
        errorMsgs.push("produkt fehlt");
    if (helper.isUndefined(request.body.bestellung_id)) 
        errorMsgs.push("bestellung fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Bestellposition: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);
    try {
        var result = bestellpositionDao.create(request.body.menge, request.body.produkt_id, request.body.bestellung_id);
        helper.log("Service Bestellposition: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Bestellposition: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;