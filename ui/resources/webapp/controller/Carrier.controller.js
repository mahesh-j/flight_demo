sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui.ui.controller.Carrier", {
		init : function() {
			console.log('This is onInit');
		},
		
		onBeforeRendering : function() {
			console.log('This is onBeforeRendering');
		}
	});
});