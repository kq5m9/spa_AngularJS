(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuCategoriesController', MenuCategoriesController);


MenuCategoriesController.$inject = ['MenuDataService', 'categories'];
function MenuCategoriesController(MenuDataService, categories) {
  var categoryList = this;
  categoryList.categories = categories;
  // test code: console.info(categoryList.categories);
}

})();
