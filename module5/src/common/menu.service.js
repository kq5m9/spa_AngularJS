/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
	var service = this;

	service.getCategories = function () {
		return $http.get(ApiPath + '/categories.json').then(function (response) {
			return response.data;
		}, function (error) {
			console.error("CATEGORY LIST RETRIEVAL ERROR:");
			console.error(error);
		});
	};


	service.getMenuItems = function (category) {
		var config = {};
		if (category) {
			config.params = {'category': category};
		}

		return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
			return response.data;
		}, function (error) {
			console.error("ITEM LIST RETRIEVAL ERROR:");
			console.error(error);
		});
	};

}



}());
