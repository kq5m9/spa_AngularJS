(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['items'];
function ItemsController(items) {
	var itemlist = this;
	// test code: console.log('ItemController called. items:');
	// test code: console.log(items);
	itemlist.category = items.category.name;
	itemlist.items = items.menu_items;
}

})();
