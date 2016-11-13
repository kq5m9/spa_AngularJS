(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemController', ItemController);


ItemController.$inject = ['$stateParams', 'items'];
function ItemController($stateParams, items) {
	var itemlist = this;
	// test code: console.log('ItemController called. items:');
	// test code: console.log(items);
	itemlist.category = items.category.name;
	itemlist.items = items.menu_items;
}

})();
