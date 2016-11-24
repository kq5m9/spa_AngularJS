/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */
;
(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://kq5m9-spa-angularjs.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
	$httpProvider.interceptors.push('loadingHttpInterceptor');
}

}());
