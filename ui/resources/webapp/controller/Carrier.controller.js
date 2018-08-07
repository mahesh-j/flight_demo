sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ui.ui.controller.Carrier", {
		onInit : function() {
			/*this._odataModel = new sap.ui.model.odata.v2.ODataModel(
				"/service.xsodata", {
					annotationURI: "annotation/annotation.xml"
				}
			);
			this.getView().setModel(this._odataModel);*/
			console.log('This is onInit');
		},
		
		onBeforeRendering : function() {
			console.log('This is onBeforeRendering');
		}
	});
});