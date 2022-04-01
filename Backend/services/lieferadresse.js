const helper = require("../helper.js");
const LieferadresseDao = require("../dao/lieferadresseDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/lieferadresse/gib/:id", function(request, response) {
    helper.log("Service Lieferadresse: Client requested one record, id=" + request.params.id);

    const lieferadresseDao = new LieferadresseDao(request.app.locals.dbConnection);
    try {
        var result = lieferadresseDao.loadById(request.params.id);
        helper.log("Service Lieferadresse: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Lieferadresse: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/lieferadresse/alle/", function(request, response) {
    helper.log("Service Lieferadresse: Client requested all records");

    const lieferadresseDao = new LieferadresseDao(request.app.locals.dbConnection);
    try {
        var result = lieferadresseDao.loadAll();
        helper.log("Service Lieferadresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Lieferadresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.get("/lieferadresse/existiert/:id", function(request, response) {
    helper.log("Service Lieferadresse: Client requested check, if record exists, id=" + request.params.id);

    const lieferadresseDao = new LieferadresseDao(request.app.locals.dbConnection);
    try {
        var result = lieferadresseDao.exists(request.params.id);
        helper.log("Service Lieferadresse: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Lieferadresse: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/lieferadresse", function(request, response) {
    helper.log("Service Lieferadresse: Client requested creation of new record");

    var errorMsgs=[];
    if (helper.isUndefined(request.body.adresse_id)) 
            errorMsgs.push("adresse fehlt");

    if (helper.isUndefined(request.body.person_id)) 
            errorMsgs.push("person fehlt");
     
    if (errorMsgs.length > 0) {
        helper.log("Service Lieferadresse: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const lieferadresseDao = new LieferadresseDao(request.app.locals.dbConnection);
    try {
        var result = lieferadresseDao.create(request.body.adresse_id, request.body.person_id);
        helper.log("Service Lieferadresse: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Lieferadresse: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.get("/lieferadresse/neuste", function(request, response) {
    helper.log("Service Lieferadresse: Client requested all records");

    const lieferadresseDao = new LieferadresseDao(request.app.locals.dbConnection);
    try {
        var result = lieferadresseDao.selectLastID();
        helper.log("Service Lieferadresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Lieferadresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


module.exports = serviceRouter;