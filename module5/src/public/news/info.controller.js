/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['DataService'];
function InfoController(DataService) {
  var infoCtrl = this;
  
  // get local data from service
  var userData = DataService.getData();
  
  // create nameStr and phoneStr to simplify template
  var nameStr = null, phoneStr = null;
  if (userData.firstName) {
    nameStr = userData.firstName + ' ';
  }
  if (userData.lastName) {
    nameStr += userData.lastName;
  }
  userData['nameStr'] = nameStr;
  
 if (userData.phone) {
    phoneStr = userData.phone.toString().replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  userData['phoneStr'] = phoneStr;
  
  console.info('userData: ', userData);
	infoCtrl.userData = userData;
}


}());
