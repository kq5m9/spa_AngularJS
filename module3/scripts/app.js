/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function () {
	'use strict';
	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.directive('foundItems',MenuSearchResultDirective)
		.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
	
	
	// directive to output array of matching menu objects
	function MenuSearchResultDirective(){
		var ddo = {
					restrict: 'E',
					templateUrl: 'templates/foundItems.html',
					scope: {
						found: '<',
						onRemove: '&'
					},
					controller: NarrowItDownController,
					controllerAs: 'search',
					bindToController: true
		};
		return ddo;
	}
	
	
	// controller to manage search interface       
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var search = this;
		
		// initial data
		// NOTE: search.found is initially a positive number to hide 'Nothing found' message
		search.found = 999;
		search.loading = false;
		search.searchTerm = '';
		
		// methods
		search.update = function (searchTerm) {
			/* call service to return array of matching menu objects wrapped in a promise */
			search.loading = true;
			MenuSearchService.getMatchedMenuItems(searchTerm).then(search.linkResults);    
		};
		
		search.linkResults = function (found) {
			/* search.found is now an array of returned matching menu objects */
			search.found = found;
			search.loading = false;
			// test code: console.log(search.found); 
		};
		
		search.removeItem = function (index) {
			// test code: console.log("removeItem index: ", index); 
			if (search.found && search.found[index] ) {
				// test code: console.log(search.found[index]); 
				search.found.splice(index, 1);
			}
		}
				
	}
	
	
	// service to retrieve and process menu items from api
	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this;
		
		service.getMatchedMenuItems = function (searchTerm) {
			/* given a searchTerm, retrieve menu items from api & return array of items wrapped in a promise whose description contains the searchTerm. If there is no match, the array will be empty. */
			return $http({
				url: (ApiBasePath + "/menu_items.json")
			}).then(function (response) {
				// test code: console.log('Sample Description:' + response.data.menu_items[0].description); 
				var dataArray = [];
				if (response && response.data && response.data.menu_items) {
					dataArray = response.data.menu_items;
				}
				// process result and only keep items that match
				var foundItems = [];
				if (dataArray.length > 0 && searchTerm.length > 0) {
					foundItems = dataArray.filter(
						function (eleObj) {
							return eleObj.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
						}
					);
				}
				return foundItems;
			}, function (error) {
				console.error("DATA RETRIEVAL ERROR:");
				console.error(error);
			});
		}
	};

}());
