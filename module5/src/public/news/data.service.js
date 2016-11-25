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
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    favorite: null
  }
  

  service.getData = function () {
    // Returns a one-way copy of the local data object
     return JSON.parse(JSON.stringify(service.data));

	};


	service.setData = function (dataObj) {
    // Sets local data object values
    console.info('submitted dataObj:', dataObj);// test code: 
    if (dataObj.firstName) {
      service.data.firstName = dataObj.firstName;
    }
    if (dataObj.lastName) {
      service.data.lastName = dataObj.lastName;
    }
    if (dataObj.email) {
      service.data.email = dataObj.email;
    }
    if (dataObj.phone) {
      service.data.phone = dataObj.phone;
    }
    if (dataObj.favorite) {
      service.data.favorite = dataObj.favorite;
    }
    console.log('modified data:', service.data);// test code: 
	};

}

}());
