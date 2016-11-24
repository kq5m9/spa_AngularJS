/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function () {
"use strict";

angular.module('public')
.component('menuItem', {
	templateUrl: 'src/public/menu-items/menu-item.html',
	bindings: {
		menuItem: '<'
	},
	controller: MenuItemController
});


MenuItemController.$inject = ['ApiPath'];
function MenuItemController(ApiPath) {
	var $ctrl = this;
	$ctrl.basePath = ApiPath;
}

}());
