const helper = require("../helper.js");
const Unsere_EmpfehlungenDao = require("../dao/unsere_EmpfehlungenDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/unsere_Empfehlungen/gib/:id", function(request, response) {
    helper.log("Service Unsere_Empfehlungen: Client requested one record, id=" + request.params.id);

    const unsere_EmpfehlungenDao = new Unsere_EmpfehlungenDao(request.app.locals.dbConnection);
    try {
        var result = unsere_EmpfehlungenDao.loadById(request.params.id);
        helper.log("Service Unsere_Empfehlungen: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Unsere_Empfehlungen: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/unsere_Empfehlungen/alle", function(request, response) {
    helper.log("Service Unsere_Empfehlungen: Client requested all records");

    const unsere_EmpfehlungenDao = new Unsere_EmpfehlungenDao(request.app.locals.dbConnection);
    try {
        var result = unsere_EmpfehlungenDao.loadAll();
        helper.log("Service Unsere_Empfehlungen: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Unsere_Empfehlungen: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/unsere_Empfehlungen/existiert/:id", function(request, response) {
    helper.log("Service Unsere_Empfehlungen: Client requested check, if record exists, id=" + request.params.id);

    const unsere_EmpfehlungenDao = new Unsere_EmpfehlungenDao(request.app.locals.dbConnection);
    try {
        var result = unsere_EmpfehlungenDao.exists(request.params.id);
        helper.log("Service Unsere_Empfehlungen: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Unsere_Empfehlungen: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/unsere_Empfehlungen", function(request, response) {
    helper.log("Service Unsere_Empfehlungen: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehlt");
    
    if (errorMsgs.length > 0) {
        helper.log("Service Unsere_Empfehlungen: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const unsere_EmpfehlungenDao = new Unsere_EmpfehlungenDao(request.app.locals.dbConnection);
    try {
        var result = unsere_EmpfehlungenDao.create(request.body.bezeichnung);
        helper.log("Service Unsere_Empfehlungen: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Unsere_Empfehlungen: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.put("/unsere_Empfehlungen", function(request, response) {
    helper.log("Service Unsere_Empfehlungen: Client requested update of existing record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push("bezeichnung fehlt");

    if (errorMsgs.length > 0) {
        helper.log("Service Unsere_Empfehlungen: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const unsere_EmpfehlungenDao = new Unsere_EmpfehlungenDao(request.app.locals.dbConnection);
    try {
        var result = unsere_EmpfehlungenDao.update(request.body.id, request.body.bezeichnung);
        helper.log("Service Unsere_Empfehlungen: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Unsere_Empfehlungen: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/unsere_Empfehlungen/:id", function(request, response) {
    helper.log("Service Unsere_Empfehlungen: Client requested deletion of record, id=" + request.params.id);

    const unsere_EmpfehlungenDao = new Unsere_EmpfehlungenDao(request.app.locals.dbConnection);
    try {
        var obj = unsere_EmpfehlungenDao.loadById(request.params.id);
        unsere_EmpfehlungenDao.delete(request.params.id);
        helper.log("Service Unsere_Empfehlungen: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Unsere_Empfehlungen: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;