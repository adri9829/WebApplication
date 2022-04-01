const helper = require("../helper.js");
const SearchDao = require("../dao/searchDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/search/gib/:id", function(request, response) {
    helper.log("Service Search: Client requested all records with this tag, tag=" + request.params.id);

    const searchDao = new SearchDao(request.app.locals.dbConnection);
    try {
        var result = searchDao.loadProductsByTags(request.params.id);
        helper.log("Service Search: Records by tag loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Search: Error loading all records by tag. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;