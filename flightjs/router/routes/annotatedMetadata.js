/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
"use strict";

var express = require("express");

module.exports = function(app, server) {
  var router = express.Router();

  router.get("/", function(req, res) {

    var axios = require("axios");
    var annotate = require(global.__base + "utils/annotate");

    // set response content type
    res.type("application/xml;charset=utf-8");

    axios
      .get("/service.xsodata/$metadata", {
        proxy: {
        	host: "127.0.0.1",
        	port: process.env.PORT
        },
        headers: {
        	Authorization: req.get("authorization")
        }
      })
      .then(function(response) {
        var annotatedMetadata = annotate.metadata(response.data);
        res.send(annotatedMetadata);
      })
      .catch(function(error) {
        console.log("error", error);
        res.send("oppsie! something went wrong!");
      });
  });

  return router;
};
