/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['infoData'];
function InfoController(infoData) {
	var $ctrl = this;
	$ctrl.infoData = infoData;
}


}());
