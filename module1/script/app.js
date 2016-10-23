/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */;

(function () {
  'use strict';
  var tooMany = 4;

  function countListItems(strList, countEmpties) {
    /* Given a comma separated string, and a boolean as to whether to count empty elements, returns number of elements. */
    // test code: console.log('args: "'+strList+'" & '+countEmpties);
    // remove all spaces
    var str = strList.replace(/ +/g, '');
    // remove empty elements if not counted
    if (!countEmpties) {
      // replace all consecutive commas with single comma
      str = str.replace(/,+/g, ',');
      // remove any leading or trailing commas
      str = str.replace(/(^,)|(,$)/g, "");
    }
    // check for empty strList
    if (str.length === 0) {
      return 0;
    }
    // test code: console.log('results: ['+str.split(',')+'] -> ' + str.split(',').length);
    return str.split(',').length;
  }
  
  angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);
  
  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.count = 0;
    $scope.result = "";
    $scope.listItems = "";
    $scope.colorClass = "";
    $scope.empties = false;
    $scope.change = function () {
      /* clears results if input changes */
      $scope.result = "";
      $scope.colorClass = "";
    };
    $scope.compareCount = function () {
      /* set value of result message based on count */
      $scope.count = countListItems($scope.listItems,
                                    $scope.empties);
      // default message for zero items
      $scope.result = "Please enter data first";
      $scope.colorClass = "red";
      // change message if items are listed
      if ($scope.count > 0) {
        $scope.result = "Enjoy!";
        $scope.colorClass = "green";
      }
      // change message again if too many items
      if ($scope.count >= tooMany) {
        $scope.result = "Too much!";
      }
    };
  }
}());