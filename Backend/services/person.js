const helper = require("../helper.js");
const PersonDao = require("../dao/personDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/person/gib/:id", function(request, response) {
    helper.log("Service Person: Client requested one record, id=" + request.params.id);

    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
        var result = personDao.loadById(request.params.id);
        helper.log("Service Person: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Person: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/person/alle", function(request, response) {
    helper.log("Service Person: Client requested all records");

    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
        var result = personDao.loadAll();
        helper.log("Service Person: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Person: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/person/existiert/:id", function(request, response) {
    helper.log("Service Person: Client requested check, if record exists, id=" + request.params.id);

    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
        var result = personDao.exists(request.params.id);
        helper.log("Service Person: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Person: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/person", function(request, response) {
    helper.log("Service Person: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.anrede)) 
        errorMsgs.push("anrede fehlt");
    if (helper.isUndefined(request.body.vorname)) 
        errorMsgs.push("vorname fehlt");
    if (helper.isUndefined(request.body.name)) 
        errorMsgs.push("name fehlt");
    
    if (errorMsgs.length > 0) {
        helper.log("Service Person: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
        var result = personDao.create(request.body.anrede, request.body.vorname, request.body.name);
        helper.log("Service Person: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Person: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.get("/person/neuste", function(request, response) {
    helper.log("Service Land: Client requested all records");

    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
        var result = personDao.selectLastID();
        helper.log("Service Person: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Person: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


module.exports = serviceRouter;