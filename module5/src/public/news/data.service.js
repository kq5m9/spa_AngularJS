/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function () {
"use strict";

angular.module('public')
.service('DataService', DataService);

DataService.$inject = [];
function DataService() {
	var service = this;


	// local data storage
	service.data = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		favorite: '',
		favData: null
	}
	

	service.getData = function () {
		// Returns a one-way copy of the local data object
		 return JSON.parse(JSON.stringify(service.data));

	};


	service.setData = function (dataObj) {
		// Sets local data object values
		// test code: console.info('submitted dataObj:', dataObj);
		if (dataObj.firstName && dataObj.firstName !== undefined) {
			service.data.firstName = dataObj.firstName;
		}
		if (dataObj.lastName && dataObj.lastName !== undefined) {
			service.data.lastName = dataObj.lastName;
		}
		if (dataObj.email && dataObj.email !== undefined) {
			service.data.email = dataObj.email;
		}
		if (dataObj.phone) {
			service.data.phone = dataObj.phone;
		}
		 if (dataObj.phone === undefined || dataObj.phone === '') {
			service.data.phone = '';
		}
		if (dataObj.favorite) {
			service.data.favorite = dataObj.favorite.toUpperCase();
		}
	 if (dataObj.favorite === undefined || dataObj.favorite === '') {
			service.data.favorite = '';
		}
	 if (dataObj.favData && typeof dataObj.favData === 'object') {
			service.data.favData = dataObj.favData;
		}
		// test code: console.log('modified data:', service.data);
	};

}

}());
