const helper = require("../helper.js");
const KundeDao = require("../dao/kundeDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/kunde/gib/:id", function(request, response) {
    helper.log("Service Kunde: Client requested one record, id=" + request.params.id);

    const kundeDao = new KundeDao(request.app.locals.dbConnection);
    try {
        var result = kundeDao.loadById(request.params.id);
        helper.log("Service Kunde: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Kunde: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/kunde/alle/", function(request, response) {
    helper.log("Service Kunde: Client requested all records");

    const kundeDao = new KundeDao(request.app.locals.dbConnection);
    try {
        var result = kundeDao.loadAll();
        helper.log("Service Kunde: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Kunde: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/kunde/existiert/:id", function(request, response) {
    helper.log("Service Kunde: Client requested check, if record exists, id=" + request.params.id);

    const kundeDao = new KundeDao(request.app.locals.dbConnection);
    try {
        var result = kundeDao.exists(request.params.id);
        helper.log("Service Kunde: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Kunde: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/kunde", function(request, response) {
    helper.log("Service Kunde: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push("email fehlt");
    if (helper.isUndefined(request.body.geburtsdatum)) 
        errorMsgs.push("geburtsdatum fehlt");
    if (helper.isUndefined(request.body.person_id)) 
        errorMsgs.push("person_id fehlt");
    
    
    if (errorMsgs.length > 0) {
        helper.log("Service Kunde: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const kundeDao = new KundeDao(request.app.locals.dbConnection);
    try {
        var result = kundeDao.create(request.body.email, request.body.geburtsdatum, request.body.person_id);
        helper.log("Service Kunde: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Kunde: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});
serviceRouter.get("/kunde/neuste", function(request, response) {
    helper.log("Service Land: Client requested all records");

    const kundeDao = new KundeDao(request.app.locals.dbConnection);
    try {
        var result = kundeDao.selectLastID();
        helper.log("Service Kunde: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Kunde: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;