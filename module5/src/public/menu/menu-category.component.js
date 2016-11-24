/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function () {
"use strict";

angular.module('public')
.component('menuCategory', {
	templateUrl: 'src/public/menu/menu-category.html',
	bindings: {
		category: '<'
	}
});



}());
