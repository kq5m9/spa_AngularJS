/*jslint node: true, plusplus: true*/
/* For explanation of leading semicolon: https://github.com/airbnb/javascript/issues/21 */;

//// SEE ASSIGNMENT NOTES - STEP 9 \\\\
// Unfortunately this assignment requires the use of 2 arrays. A better solution would be to have a single array and have the objects within the array contain a bought flag. The lists can then filter the objects based on the value of that flag. Buying the item would simply be a matter of setting the flag.

(function () {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
         .controller('ToBuyController', ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController)
         .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
  
  // controller to manage to_buy shopping list       
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getUnboughtItems();
    toBuyList.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
   }

  
  // controller to manage already_bought shopping list       
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var doneList = this;
    doneList.items = ShoppingListCheckOffService.getBoughtItems();
  }
  


  
  function ShoppingListCheckOffService() {
    var service = this;
    
    // initial data
    var initbuy = [
          {name:'apple', unit:'', quantity:3},
          {name:'rice', unit:'bag', quantity:1},
          {name:'tomato soup', unit:'can', quantity:5},
          {name:'lettuce', unit:'head', quantity:2},
          {name:'beer', unit:'case', quantity:4}
    ];
    // hide internal structure by using string representations
    var bought = [], tobuy = [];
    for (var i=0; i < initbuy.length; i++) {
      var item = initbuy[i];
      var str = _itemToString(initbuy[i]);
      tobuy.push(str);
    }
    
    //Methods
    service.getUnboughtItems = function () {
      return tobuy;
    };
    service.getBoughtItems = function () {
      return bought;
    };
    service.buyItem = function (itemIndex) {
      /* moves item at index in shopping list from tobuy to bought. 
          if index is invalid, no change is made. */
      if (itemIndex > -1 && itemIndex < tobuy.length) {
        // valid index
        var boughtItem = tobuy[itemIndex];
        tobuy.splice(itemIndex, 1);
        bought.push(boughtItem);
      }
    };

    // Local Routines
    function _itemToString(itemObj) {
      /* builds a user friendly string representation of an item object */
      // if not valid item object, return empty string
      if (!itemObj || !itemObj.name || !itemObj.quantity || itemObj.quantity < 1) {
        return '';
      }
      // get item components
      var name = itemObj.name, unit = itemObj.unit, quantity = itemObj.quantity;
      var noUnit = (unit == '');
      // pluralize unit, or name if no unit, if quantity > 1
      if (quantity > 1) {
        unit += 's';
        if (noUnit) {
          name += 's';
        }
      }
      // build outstr as either: num unit(s) of name _or_ num name(s), if no units
      var outstr = quantity + ' ' + unit + ' of ' + name;
      if (noUnit) {
        outstr = quantity + ' ' + name;
      }
      return outstr;
    };

  };
  
  
}());
