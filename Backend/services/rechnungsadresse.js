const helper = require("../helper.js");
const RechnungsadresseDao = require("../dao/rechnungsadresseDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/rechnungsadresse/gib/:id", function(request, response) {
    helper.log("Service Rechnungsadresse: Client requested one record, id=" + request.params.id);

    const rechnungsadresseDao = new RechnungsadresseDao(request.app.locals.dbConnection);
    try {
        var result = rechnungsadresseDao.loadById(request.params.id);
        helper.log("Service Rechnungsadresse: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Rechnungsadresse: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/rechnungsadresse/alle/", function(request, response) {
    helper.log("Service Rechnungsadresse: Client requested all records");

    const rechnungsadresseDao = new RechnungsadresseDao(request.app.locals.dbConnection);
    try {
        var result = rechnungsadresseDao.loadAll();
        helper.log("Service Rechnungsadresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Rechnungsadresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/rechnungsadresse/existiert/:id", function(request, response) {
    helper.log("Service Rechnungsadresse: Client requested check, if record exists, id=" + request.params.id);

    const rechnungsadresseDao = new RechnungsadresseDao(request.app.locals.dbConnection);
    try {
        var result = rechnungsadresseDao.exists(request.params.id);
        helper.log("Service Rechnungsadresse: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Rechnungsadresse: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/rechnungsadresse", function(request, response) {
    helper.log("Service Rechnungsadresse: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.adresse_id)) 
            errorMsgs.push("adresse fehlt");

    if (helper.isUndefined(request.body.kunde_id)) 
            errorMsgs.push("kunde fehlt");
     
    if (errorMsgs.length > 0) {
        helper.log("Service Rechnungsadresse: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const rechnungsadresseDao = new RechnungsadresseDao(request.app.locals.dbConnection);
    try {
        var result = rechnungsadresseDao.create(request.body.adresse_id, request.body.kunde_id);
        helper.log("Service Rechnungsadresse: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Rechnungsadresse: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});


serviceRouter.get("/rechnungsadresse/neuste", function(request, response) {
    helper.log("Service Lieferadresse: Client requested all records");

    const rechnungsadresseDao = new RechnungsadresseDao(request.app.locals.dbConnection);
    try {
        var result = rechnungsadresseDao.selectLastID();
        helper.log("Service Rechnungsadresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Rechnungsadresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;