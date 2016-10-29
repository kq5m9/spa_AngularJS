/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */;

(function () {
	'use strict';
	angular.module('NarrowItDownApp', [])
				 .controller('NarrowItDownController', NarrowItDownController)
				 .service('MenuSearchService', MenuSearchService);
	
	
	// controller to manage to buy shopping list       
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var toBuyList = this;
		toBuyList.items = MenuSearchService.getUnboughtItems();
		toBuyList.buyItem = function (itemIndex) {
			MenuSearchService.buyItem(itemIndex);
		};
	 }
	
	
	function MenuSearchService() {
		var service = this;
		
		// initial data
		var bought = [], tobuy = [];
		
		//Methods
		service.getMatchedMenuItems(searchTerm) = function () {
			/*
			return $http(...).then(function (result) {
			// process result and only keep items that match
			var foundItems...

			// return processed items
			return foundItems;
			*/ return searchTerm; // temp line
		});
 
		/*
		service.getBoughtItems = function () {
			return bought;
		};
		service.buyItem = function (itemIndex) {
			/* moves item at index in shopping list from tobuy to bought. 
					if index is invalid, no change is made. &/
			if (itemIndex > -1 && itemIndex < tobuy.length) {
				// valid index
				var boughtItem = tobuy[itemIndex];
				tobuy.splice(itemIndex, 1);
				bought.push(boughtItem);
			}
		};
		*/

		// Local Routines
		/*
		function _itemToString(itemObj) {
			/* builds a user friendly string representation of an item object &/
			// if not valid item object, return empty string
			if (!itemObj || !itemObj.name || !itemObj.quantity || itemObj.quantity < 1) {
				return '';
			}
			// get item components
			var name = itemObj.name, unit = itemObj.unit, quantity = itemObj.quantity;
			var noUnit = (unit == '');
			// pluralize unit, or name if no unit, if quantity > 1
			if (quantity > 1) {
				unit += 's';
				if (noUnit) {
					name += 's';
				}
			}
			// build outstr as either: num unit(s) of name _or_ num name(s), if no units
			var outstr = quantity + ' ' + unit + ' of ' + name;
			if (noUnit) {
				outstr = quantity + ' ' + name;
			}
			return outstr;
		};
		*/
	};
	
	
}());