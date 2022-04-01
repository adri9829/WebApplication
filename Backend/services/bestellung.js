const helper = require("../helper.js");
const BestellungDao = require("../dao/bestellungDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/bestellung/gib/:id", function(request, response) {
    helper.log("Service Bestellung: Client requested one record, id=" + request.params.id);

    const bestellungDao = new BestellungDao(request.app.locals.dbConnection);
    try {
        var result = bestellungDao.loadById(request.params.id);
        helper.log("Service Bestellung: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Bestellung: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/bestellung/alle/", function(request, response) {
    helper.log("Service Bestellung: Client requested all records");

    const bestellungDao = new BestellungDao(request.app.locals.dbConnection);
    try {
        var result = bestellungDao.loadAll();
        helper.log("Service Bestellung: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Bestellung: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.get("/bestellung/existiert/:id", function(request, response) {
    helper.log("Service Bestellung: Client requested check, if record exists, id=" + request.params.id);

    const bestellungDao = new BestellungDao(request.app.locals.dbConnection);
    try {
        var result = bestellungDao.exists(request.params.id);
        helper.log("Service Bestellung: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Bestellung: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/bestellung", function(request, response) {
    helper.log("Service Bestellung: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.bestellzeitpunkt)) 
        errorMsgs.push("bestellzeitpunkt fehlt");
    if (helper.isUndefined(request.body.zahlungsart_id)) 
        errorMsgs.push("zahlungsart fehlt");
    if (helper.isUndefined(request.body.lieferadresse_id)) 
        errorMsgs.push("lieferadresse fehlt");
    if (helper.isUndefined(request.body.rechnungsadresse_id)) 
        errorMsgs.push("rechnungsadresse fehlt");
    
    if (errorMsgs.length > 0) {
        helper.log("Service Bestellung: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }
    const bestellungDao = new BestellungDao(request.app.locals.dbConnection);
    try {
        var result = bestellungDao.create(request.body.bestellzeitpunkt,request.body.zahlungsart_id,request.body.lieferadresse_id,request.body.rechnungsadresse_id);
        helper.log("Service Bestellung: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Bestellung: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.get("/bestellung/neuste", function(request, response) {
    helper.log("Service Bestellung: Client requested all records");

    const bestellungDao = new BestellungDao(request.app.locals.dbConnection);
    try {
        var result = bestellungDao.selectLastID();
        helper.log("Service Bestellung: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Bestellung: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;