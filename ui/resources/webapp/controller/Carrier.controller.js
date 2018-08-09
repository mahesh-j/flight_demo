sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/cnp/test/shellMock/UShellCAN"
], function(Controller,UShellCAN) {
	"use strict";

	return Controller.extend("com.cnp.test.controller.Carrier", {
		onInit : function() {
			/*this._odataModel = new sap.ui.model.odata.v2.ODataModel(
				"/service.xsodata", {
					annotationURI: "annotation/annotation.xml"
				}
			);
			this.getView().setModel(this._odataModel);*/
			console.log('This is onInit');
			
			UShellCAN.mockUShellServices({
				CONNID: {
					links: [
						{
							action: "sap_se",
							intent: "http://www.sap.com",
							text: "SAP SE"
						}, {
							action: "sap_sapphire",
							intent: "http://www.sap.com/sapphire",
							text: "SAP Sapphire"
						}, {
							action: "app3",
							intent: "http://www.sap.com/hana",
							text: "App3"
						}
					]
				}
			});
		},
		onNavigationTargetsObtained: function(oEvent) {
			console.log(oEvent);
		},
		onNavigate : function(oEvent) {
			console.log(oEvent);
		},
		onBeforeRendering : function() {
			console.log('This is onBeforeRendering');
		},
		onExit : function() {
			UShellCAN.unMockUShellServices();
		}
	});
});