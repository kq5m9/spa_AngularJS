(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

	// Redirect to home page if no other URL matches
	$urlRouterProvider.otherwise('/');

	// *** Set up UI states ***
	$stateProvider

	// Home page
	.state('home', {
		url: '/',
		templateUrl: 'templates/home.template.html'
	})

	// Category list page
	.state('categories', {
		url: '/categories',
		templateUrl: 'templates/categories.template.html',
		controller: 'CategoriesController as categoryList',
		resolve: {
			categories: ['MenuDataService', function (MenuDataService) {
				return MenuDataService.getAllCategories();
			}]
		}
	})

	// Item list page
	.state('categories.items', {
		url: '/{catName}',
		templateUrl: 'templates/item.template.html',
		controller: "ItemsController as itemlist",
		resolve: {
			items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
				// test code: console.info('$stateParams.catName: ' + $stateParams.catName);
				return MenuDataService.getItemsForCategory($stateParams.catName);
				}]
		}
	 })

	// Item detail page (* not yet implemented - but hooked into item list page *)
	.state('categories.items.item', {
		/*
		url: '/{catName}',
		templateUrl: 'templates/item.template.html',
		controller: "ItemsController as itemlist",
		resolve: {
			items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
				// test code: console.info('$stateParams.catName: ' + $stateParams.catName);
				return MenuDataService.getItemsForCategory($stateParams.catName);
				}]
		}
		*/
	 });

 }

})();
