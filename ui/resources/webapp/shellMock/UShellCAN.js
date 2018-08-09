sap.ui.define([
	'sap/ui/base/Object', 'sap/ui/comp/navpopover/Factory'
], function(BaseObject, Factory) {
	"use strict";

	var UShellCAN = BaseObject.extend("com.cnp.test.shellMock.UShellCAN", /** @lends com.cnp.test.shellMock.UShellCAN */
	{});

	UShellCAN.getServiceReal = Factory.getService;

	UShellCAN.mockUShellServices = function(oSetting) {

		Factory.getService = function(sServiceName) {
			switch (sServiceName) {
				case "CrossApplicationNavigation":
					return {
						hrefForExternal: function(oTarget) {
							if (!oTarget || !oTarget.target || !oTarget.target.shellHash) {
								return null;
							}
							return oTarget.target.shellHash;
						},
						getDistinctSemanticObjects: function() {
							var aSemanticObjects = [];
							for ( var sSemanticObject in oSetting) {
								aSemanticObjects.push(sSemanticObject);
							}
							var oDeferred = jQuery.Deferred();
							setTimeout(function() {
								oDeferred.resolve(aSemanticObjects);
							}, 0);
							return oDeferred.promise();
						},
						getLinks: function(aParams) {
							var aLinks = [];
							if (!jQuery.isArray(aParams)) {
								oSetting[aParams.semanticObject] ? aLinks = oSetting[aParams.semanticObject].links : aLinks = [];
							} else {
								aParams.forEach(function(aParams_) {
									oSetting[aParams_[0].semanticObject] ? aLinks.push([
										oSetting[aParams_[0].semanticObject].links
									]) : aLinks.push([
										[]
									]);
								});
							}
							var oDeferred = jQuery.Deferred();
							setTimeout(function() {
								oDeferred.resolve(aLinks);
							}, 0);
							return oDeferred.promise();
						}
					};
				case "URLParsing":
					return {
						parseShellHash: function(sIntent) {
							var sAction;
							for ( var sSemanticObject in oSetting) {
								oSetting[sSemanticObject].links.some(function(oLink) {
									if (oLink.intent === sIntent) {
										sAction = oLink.action;
										return true;
									}
								});
								if (sAction) {
									return {
										semanticObject: sSemanticObject,
										action: sAction
									};
								}
							}
							return {
								semanticObject: null,
								action: null
							};
						}
					};
				default:
					return UShellCAN.getServiceReal(sServiceName);
			}
		};
	};

	UShellCAN.unMockUShellServices = function() {
		Factory.getService = UShellCAN.getServiceReal;
	};

	return UShellCAN;
}, /* bExport= */true);
