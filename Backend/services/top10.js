const helper = require("../helper.js");
const Top10Dao = require("../dao/top10Dao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/top10/gib/:id", function(request, response) {
    helper.log("Service Top10: Client requested one record, id=" + request.params.id);

    const top10Dao = new Top10Dao(request.app.locals.dbConnection);
    try {
        var result = top10Dao.loadById(request.params.id);
        helper.log("Service Top10: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Top10: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/top10/alle", function(request, response) {
    helper.log("Service Top10: Client requested all records");

    const top10Dao = new Top10Dao(request.app.locals.dbConnection);
    try {
        var result = top10Dao.loadAll();
        helper.log("Service Top10: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Top10: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/top10/existiert/:id", function(request, response) {
    helper.log("Service Top10: Client requested check, if record exists, id=" + request.params.id);

    const top10Dao = new Top10Dao(request.app.locals.dbConnection);
    try {
        var result = top10Dao.exists(request.params.id);
        helper.log("Service Top10: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Top10: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/top10", function(request, response) {
    helper.log("Service Top10: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehlt");
    
    if (errorMsgs.length > 0) {
        helper.log("Service Top10: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const top10Dao = new Top10Dao(request.app.locals.dbConnection);
    try {
        var result = top10Dao.create(request.body.bezeichnung);
        helper.log("Service Top10: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Top10: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.put("/top10", function(request, response) {
    helper.log("Service Top10: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Top10: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const top10Dao = new Top10Dao(request.app.locals.dbConnection);
    try {
        var result = top10Dao.update(request.body.id, request.body.bezeichnung);
        helper.log("Service Top10: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Top10: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/top10/:id", function(request, response) {
    helper.log("Service Top10: Client requested deletion of record, id=" + request.params.id);

    const top10Dao = new Top10Dao(request.app.locals.dbConnection);
    try {
        var obj = top10Dao.loadById(request.params.id);
        top10Dao.delete(request.params.id);
        helper.log("Service Top10: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Top10: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;