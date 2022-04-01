const helper = require("../helper.js");
const AngebotDao = require("../dao/angebotDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/angebot/gib/:id", function(request, response) {
    helper.log("Service Angebot: Client requested one record, id=" + request.params.id);

    const angebotDao = new AngebotDao(request.app.locals.dbConnection);
    try {
        var result = angebotDao.loadById(request.params.id);
        helper.log("Service Angebot: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Angebot: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/angebot/alle", function(request, response) {
    helper.log("Service Angebot: Client requested all records");

    const angebotDao = new AngebotDao(request.app.locals.dbConnection);
    try {
        var result = angebotDao.loadAll();
        helper.log("Service Angebot: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Angebot: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/angebot/existiert/:id", function(request, response) {
    helper.log("Service Angebot: Client requested check, if record exists, id=" + request.params.id);

    const angebotDao = new AngebotDao(request.app.locals.dbConnection);
    try {
        var result = angebotDao.exists(request.params.id);
        helper.log("Service Angebot: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Angebot: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/angebot", function(request, response) {
    helper.log("Service Angebot: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehlt");
    
    if (errorMsgs.length > 0) {
        helper.log("Service Angebot: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const angebotDao = new AngebotDao(request.app.locals.dbConnection);
    try {
        var result = angebotDao.create(request.body.bezeichnung);
        helper.log("Service Angebot: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Angebot: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.put("/angebot", function(request, response) {
    helper.log("Service Angebot: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Angebot: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const angebotDao = new AngebotDao(request.app.locals.dbConnection);
    try {
        var result = angebotDao.update(request.body.id, request.body.bezeichnung);
        helper.log("Service Angebot: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Angebot: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/angebot/:id", function(request, response) {
    helper.log("Service Angebot: Client requested deletion of record, id=" + request.params.id);

    const angebotDao = new AngebotDao(request.app.locals.dbConnection);
    try {
        var obj = angebotDao.loadById(request.params.id);
        angebotDao.delete(request.params.id);
        helper.log("Service Angebot: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Angebot: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;