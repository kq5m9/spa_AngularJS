/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */;

//// SEE ASSIGNMENT NOTES - STEP 9 \\\\

(function () {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
         .controller('ToBuyController', ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController);
  
  ToBuyController.$inject = ['$scope', '$filter'];
  function ToBuyController($scope, $filter) {
    $scope.count = 0;
    $scope.change = function () {
      /* clears results if input changes */
      $scope.result = "";
      $scope.colorClass = "";
    };
  }
    
  AlreadyBoughtController.$inject = ['$scope', '$filter'];
  function AlreadyBoughtController($scope, $filter) {
    $scope.count = 0;
    $scope.change = function () {
      /* clears results if input changes */
      $scope.result = "";
      $scope.colorClass = "";
    };
  }
  
}());