/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

module.exports = {
    metadata: function(metadata) {
        var cheerio = require("cheerio");
        var fs = require("fs");
        var $ = cheerio.load(metadata, {
            xmlMode : true
        });

        // sap namespace
		$("edmx\\:Edmx").attr("xmlns:sap", "http://www.sap.com/Protocols/SAPData");

        var data = fs.readFileSync(global.__base + "utils/annotation.json", "utf8");
        var annotations = JSON.parse(data);
        for (var a in annotations) {
            if(a === "entityType") {
                for (var entityType in annotations[a]) {
                    for(var attribute in annotations[a][entityType]) {
                        if(attribute === "Property") {
                            for(var Property in annotations[a][entityType][attribute]) {
                                for(var PropertyAttr in annotations[a][entityType][attribute][Property]) {
                                    $("EntityType[Name='" + entityType + "'] Property[Name='" + Property + "']").attr("sap:"+PropertyAttr,annotations[a][entityType][attribute][Property][PropertyAttr]);
                                }
                            }
                        } else {
                            $("EntityType[Name='" + entityType + "']").attr("sap:" + attribute, annotations[a][entityType][attribute]);
                        }
                    }
                }
            } else if (a === "entitySet") {
                for (var entitySet in annotations[a]) {
                    for(attribute in annotations[a][entitySet]) {
                        $("EntitySet[Name='" + entitySet + "']").attr("sap:" + attribute, annotations[a][entitySet][attribute]);
                    }
                }
            }
        }
        return $.xml();
    }
};