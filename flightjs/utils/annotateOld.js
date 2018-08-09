/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

module.exports = {
	metadata: function(metadata) {
		var cheerio = require("cheerio");
		var entitySet = "FlightCarrier";
		var entityType = "FlightCarrierType";
		var measures = ["PRICE", "SEATSMAX", "SEATSOCC", "PAYMENTSUM", "SEATSMAX_B", "SEATSOCC_B", "SEATSMAX_F", "SEATSOCC_F"];
		var dimensions = ["CONNID", "FLDATE", "CURRENCY", "PLANETYPE", "CURRCODE", "URL", "CARRNAME", "CARRID"];
		var fixedValuesDD = ["CARRID"]; //For fixed value value list dropdowns control
		var hidden = ["ID"];
		var labels = {
			"CONNID": "Connection Id",
			"FLDATE": "Flight Date",
			"CURRENCY": "Currency",
			"PLANETYPE": "Plane Type",
			"CURRCODE": "Currency Code",
			"URL": "URL",
			"CARRNAME": "Carrier Name",
			"CARRID" : "Carrier Id",
			"PRICE" : "Price",
			"SEATSMAX" : "SEATSMAX",
			"SEATSOCC" : "SEATSOCC",
			"PAYMENTSUM" : "PAYMENTSUM",
			"SEATSMAX_B" : "SEATSMAX_B",
			"SEATSOCC_B" : "SEATSOCC_B",
			"SEATSMAX_F" : "SEATSMAX_F",
			"SEATSOCC_F" : "SEATSOCC_F"
		};
		var $ = cheerio.load(metadata, {
			xmlMode: true
		});
		
		// sap namespace
		$("edmx\\:Edmx").attr("xmlns:sap", "http://www.sap.com/Protocols/SAPData");
		
		// handle EntityType and EntitySet
		$("EntityType[Name='" + entityType + "']").attr("sap:semantics", "aggregate");
		$("EntitySet[Name='" + entitySet + "']")
			.attr("sap:addressable", "false")
			.attr("sap:creatable", "false")
			.attr("sap:updatable", "false")
			.attr("sap:deletable", "false");
		
		// add measure, dimension and label to properties
		$("EntityType[Name='" + entityType + "'] Property").map(function (index, elem) {
			var propertyNmae = $(elem).attr("Name");
			
			// add label
			$(elem).attr("sap:label", labels[propertyNmae]);
			
			// add measures
			if (measures.indexOf(propertyNmae) >= 0) {
				 $(elem).attr("sap:aggregation-role", "measure");
				 $(elem).attr("sap:filterable", "false");
			}
			
			// add dimensions
			if (dimensions.indexOf(propertyNmae) >= 0) {
				$(elem).attr("sap:aggregation-role", "dimension");
			}
			
			// if (hidden.indexOf(propertyNmae) >= 0) {
			// 	$(elem).attr("sap:visible", "false");
			// }
		});
		
		$("EntitySet[Name='Scarr']").attr("sap:semantics", "fixed-values");
		// $("EntityType[Name='ScarrType']").attr("sap:filter-restriction", "single-value");
		$("EntityType[Name='ScarrType'] Property").map(function (index, elem) { 
			var propertyName = $(elem).attr("Name");
			if(fixedValuesDD.indexOf(propertyName) >= 0) {
				$(elem).attr("sap:value-list","fixed-values");
				$(elem).attr("sap:text","CARRNAME");
				$(elem).attr("sap:filter-restriction", "single-value");
			}
		});
		
		return $.xml();
	}
};
