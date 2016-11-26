/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['DataService', 'MenuService'];
function SignUpController(DataService, MenuService) {
	var signUpCtrl = this;
	
	
	/* CONTROLLER INITIALZATION & DATA LOADING */
	// initialize controller variables
	signUpCtrl.submitted = false;
	signUpCtrl.firstNameError = false,
	signUpCtrl.lastNameError = false;
	signUpCtrl.nameError = false;
	signUpCtrl.phone0Error = false,
	signUpCtrl.phone1Error = false,
	signUpCtrl.phone2Error = false;
	signUpCtrl.phoneError = false;
	signUpCtrl.PhoneLengthError = false;
	signUpCtrl.favoriteError = false;
	signUpCtrl.FavURLError = false;
	signUpCtrl.invalidCount = 0;
	signUpCtrl.onlyNumbers = /^[0-9]*$/;
	signUpCtrl.noNumbers = /^[a-z \']*$/i;
	signUpCtrl.favPattern = /[a-z]+[0-9]{1,2}/i;
	// get local data from service
	var userData = DataService.getData();
	// if no email, clear all data
	if (!userData.email) {
		Object.keys(userData).forEach(function(key) {
			userData[key] = "";
		});
	}
	// create phone0, phone1, and phone2 to simplify template
	userData['phone0'] = userData.phone.substr(0,3);
	userData['phone1'] = userData.phone.substr(3,3);
	userData['phone2'] = userData.phone.substr(6,4);

	// test code: console.info('userData: ', userData);
	signUpCtrl.userData = userData;


	/* CUSTON VERIFICATION ROUTINES */
	
	var genericVerify = function (oldActiveError, newActiveError, 
																 OldCatError, otherError) {
		/*  Given old active field error, new active field error and old
				category error as booleans, return new category boolean and 
				adjust controller's invalid count
		*/
		var newCatError = newActiveError || OldCatError;
		if (oldActiveError && !newActiveError) {
			newCatError = otherError;
			signUpCtrl.invalidCount--;
		};
		if (newActiveError && !oldActiveError) {
			signUpCtrl.invalidCount++;
		}
		/*console.log('\n oldActiveError: ', oldActiveError, 
								'\n newActiveError: ', newActiveError, 
								'\n OldCatError: ', OldCatError, 
								'\n otherError: ', otherError, 
								'\n\n signUpCtrl.invalidCount: ',signUpCtrl.invalidCount,
								'\n\n RET_newActiveError: ', newActiveError, 
								'\n RET_newCatError: ', newCatError);*/
		return newCatError;
	};
		
	
	var verifyName = function(nameStr, otherNameStr) {
		// verify thisName, which is the active field
		// test code: console.log('nameStr: ', nameStr, '   otherNameStr: ', otherNameStr);
		var oldThisNameError = signUpCtrl[nameStr + 'Error'];
		var newThisNameError = !userData[nameStr];
		var oldNameError = signUpCtrl.nameError;
		var otherNameError = signUpCtrl[otherNameStr + 'Error'];
		var retError = genericVerify(oldThisNameError, 
																newThisNameError, 
																oldNameError, 
																otherNameError);
		signUpCtrl.nameError = retError;
		signUpCtrl[nameStr + 'Error'] = newThisNameError;
	};
	
		
	signUpCtrl.verifyName1 = function() {
		// verify firstname, which is the initial active field
		verifyName('firstName', 'lastName');
	};
	
	signUpCtrl.verifyName2 = function() {
		// verify lastname, which is a required field
		verifyName('lastName', 'firstName');
	};
	
	
	signUpCtrl.verifyPhone = function (activeIndex, formElement) {
		//signUpCtrl.phoneError  signUpCtrl.invalidCount
		// get current validity for each phone field
		// test code: console.info('formElement :', formElement);
		var otherPhoneErrors = false;
		var errors = [], len = [3, 3, 4]
		for (var index = 0; index < 3; index++) {
			var numStr = userData['phone'+ index];
			if (typeof numStr == 'undefined') {
				numStr = '';
			}
			var thisError = numStr.length > 0 && numStr.length != len[index];
			errors.push(thisError);
			if (index != activeIndex) {
				otherPhoneErrors = otherPhoneErrors || thisError;
				signUpCtrl['phone' + index + 'Error'] = thisError;
			}
		}
		var newActiveError = errors[activeIndex];
		var oldActiveError = signUpCtrl['phone' + activeIndex + 'Error'];
		var oldPhoneError = signUpCtrl.phoneError;
		var retError = genericVerify(oldActiveError, newActiveError,  
																 oldPhoneError, otherPhoneErrors);
		signUpCtrl['phone' + activeIndex + 'Error'] = newActiveError;
		signUpCtrl.phoneError = retError;
		// if all 3 sections touched, check entire number
		var allTouched = formElement.phone0.$touched 
										&& formElement.phone1.$touched 
										&& formElement.phone2.$touched;
		
		if (allTouched) {
			var entireLen = formElement.phone0.$viewValue.length + 
											formElement.phone1.$viewValue.length + 
											formElement.phone2.$viewValue.length;
			var oldPhoneLengthError = signUpCtrl.phoneLengthError;
			var desiredLen = len.reduce((a, b) => a + b, 0);
			var newPhoneLengthError = (entireLen > 0 
																	&& entireLen != desiredLen);
			var allOther = otherPhoneErrors || newActiveError;
			var retError2 = genericVerify(oldPhoneLengthError, 
																		newPhoneLengthError, 
																		retError, allOther);
			signUpCtrl.phoneError = retError2;
			signUpCtrl.phoneLengthError = newPhoneLengthError;
			/* test code: console.log('allTouched', 'entireLen', 'oldPhoneLengthError',
								 'desiredLen', 'newPhoneLengthError', 'allOther', 'retError2');
			console.log(allTouched, entireLen, oldPhoneLengthError,
								 desiredLen, newPhoneLengthError, allOther, retError2);*/
		}
	};
	
	signUpCtrl.verifyFavorite = function () {};
	

	/* DATA SUBMISSION */
	signUpCtrl.submit = function(form) {
		// Returns a one-way copy of the user data object
		var ud = JSON.parse(JSON.stringify(signUpCtrl.userData));
		// test code: console.info('form: ', form, '\n RET_ud:', ud);
	
		ud['phone'] = form.phone0.$viewValue +
									form.phone1.$viewValue +
									form.phone2.$viewValue;
		
		ud.favorite = ud.favorite.toUpperCase();
		
		if (ud.favorite) {
			var favDataPromise = MenuService.getMenuItem(ud.favorite);
			favDataPromise.then (function (favData) {
				// test code: console.log('favData: ', favData);
				ud['favData'] = favData;
				signUpCtrl.FavURLError = typeof favData === 'undefined' 
																			&&  ud.favorite.length > 0;
				// test code: console.error('UNSUCCESSFUL... FavURLError:',  signUpCtrl.FavURLError);
			}).finally (function () {
				if (!signUpCtrl.FavURLError) {
					// test code: console.log('submitting...', ud);// test code:
					DataService.setData(ud);
					signUpCtrl.submitted = true;
				}
			});
		} else {
			// test code: console.log('submitting...', ud);// test code:
			DataService.setData(ud);
			signUpCtrl.submitted = true;
		}
		
	 }
}

}());
