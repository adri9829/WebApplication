const helper = require("../helper.js");
const PfandstufeDao = require("../dao/pfandstufeDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/pfandstufe/gib/:id", function(request, response) {
    helper.log("Service Pfandstufe: Client requested one record, id=" + request.params.id);

    const pfandstufeDao = new PfandstufeDao(request.app.locals.dbConnection);
    try {
        var result = pfandstufeDao.loadById(request.params.id);
        helper.log("Service Pfandstufe: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Pfandstufe: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/pfandstufe/alle", function(request, response) {
    helper.log("Service Pfandstufe: Client requested all records");

    const pfandstufeDao = new PfandstufeDao(request.app.locals.dbConnection);
    try {
        var result = pfandstufeDao.loadAll();
        helper.log("Service Pfandstufe: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Pfandstufe: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/pfandstufe/existiert/:id", function(request, response) {
    helper.log("Service Pfandstufe: Client requested check, if record exists, id=" + request.params.id);

    const pfandstufeDao = new PfandstufeDao(request.app.locals.dbConnection);
    try {
        var result = pfandstufeDao.exists(request.params.id);
        helper.log("Service Pfandstufe: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Pfandstufe: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/pfandstufe", function(request, response) {
    helper.log("Service Pfandstufe: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehlt");
    
    if (errorMsgs.length > 0) {
        helper.log("Service Pfandstufe: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const pfandstufeDao = new PfandstufeDao(request.app.locals.dbConnection);
    try {
        var result = pfandstufeDao.create(request.body.bezeichnung);
        helper.log("Service Pfandstufe: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Pfandstufe: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.put("/pfandstufe", function(request, response) {
    helper.log("Service Pfandstufe: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Pfandstufe: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const pfandstufeDao = new PfandstufeDao(request.app.locals.dbConnection);
    try {
        var result = pfandstufeDao.update(request.body.id, request.body.bezeichnung);
        helper.log("Service Pfandstufe: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Pfandstufe: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/pfandstufe/:id", function(request, response) {
    helper.log("Service Pfandstufe: Client requested deletion of record, id=" + request.params.id);

    const pfandstufeDao = new PfandstufeDao(request.app.locals.dbConnection);
    try {
        var obj = pfandstufeDao.loadById(request.params.id);
        pfandstufeDao.delete(request.params.id);
        helper.log("Service Pfandstufe: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Pfandstufe: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;