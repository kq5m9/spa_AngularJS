(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('baseURL', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http', 'baseURL']
function MenuDataService($http, baseURL) {
	var service = this;

	// Returns a promise, NOT category array directly
	service.getAllCategories = function () {
		// https://davids-restaurant.herokuapp.com/categories.json
		return $http({ url: (baseURL + "/categories.json")})
		  .then(function (response) {
				// test code: console.log(response.data); 
				var dataArray = [];
				if (response && response.data) {
					dataArray = response.data;
				}
				return dataArray;
			}, function (error) {
				console.error("CATEGORY LIST RETRIEVAL ERROR:");
				console.error(error);
			});
	};
	

	service.getItemsForCategory = function (categoryShortName) {
		// https://davids-restaurant.herokuapp.com/menu_items.json?category={short_name}
		// test code: console.log('categoryShortName:' + categoryShortName);
		categoryShortName = categoryShortName.toUpperCase();
		return $http({ url: (baseURL + "/menu_items.json?category=" + categoryShortName)})
		  .then(function (response) {
				// test code: console.log(response.data); 
				var dataArray = [];
				if (response && response.data) {
					dataArray = response.data;
				}
				return dataArray;
			}, function (error) {
				console.error("ITEM LIST RETRIEVAL ERROR:");
				console.error(error);
			});
	};

}

})();
