'use strict';

/**
 * @ngdoc service
 * @name tofixtheworldApp.getRandomIngredient
 * @description
 * # getRandomIngredient
 * Factory in the tofixtheworldApp.
 */
angular.module('tofixtheworldApp')
  .factory('ingredientFactory', function ($firebase, $q) {
    return {
      // Returns random id from set
      random: function(ingredientObj) {
        // Put the keys in an array so they can be counted
        var keysObj = Object.keys(ingredientObj);
        // Choose a random key number
        var chosenKeyNum = Math.floor(Math.random()*keysObj.length)
        // Return key based on chosenKeyNu
        return keysObj[chosenKeyNum];
      },
      all: function() {
        return ingredientObj;
      },
      get: function(type){
        var ref = new Firebase("https://incandescent-torch-665.firebaseio.com/");
        return $q(function (resolve, reject) {
          function successCallback(snapshot) {
            resolve(snapshot.val());
          };

          function cancelCallback(error) {
            reject(error);  // pass along the error object
          };


        ref.child(type).on("value", successCallback, cancelCallback);
        });
      }
    }

  //end factory
  });
