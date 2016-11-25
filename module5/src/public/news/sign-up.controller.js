/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['DataService'];
function SignUpController(DataService) {
	var signUpCtrl = this;
  
  // all input fields are valid
  signUpCtrl.valid = false;

  // get local data from service
  var userData = DataService.getData();
  
  if (!userData.email) {
    // if no email, clear all data
    Object.keys(userData).forEach(function(key) {
      userData[key] = null;
    });
  }
  
  if (userData.phone && userData.phone.length == 10) {
    // create phone1, phone2, and phone3 to simplify template
    userData['phone1'] = userData.phone.substr(0,3);
    userData['phone2'] = userData.phone.substr(3,3);
    userData['phone3'] = userData.phone.substr(6,4);
  }
  
  console.info('userData: ', userData);
  signUpCtrl.userData = userData


  signUpCtrl.submit = function() {
    var ud = signUpCtrl.userData;
    signUpCtrl.valid = true;
    
    if (ud.favorite) {
      ud.favorite = ud.favorite.toUpperCase();
    }
    
    ud['phone'] = ud.phone1 +
                  ud.phone2 +
                  ud.phone3;
    console.log('submitted...');
    DataService.setData(ud);
  }
}

}());
