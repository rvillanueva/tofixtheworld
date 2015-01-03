'use strict';

/**
 * @ngdoc service
 * @name tofixtheworldApp.getRandomIngredient
 * @description
 * # getRandomIngredient
 * Factory in the tofixtheworldApp.
 */
angular.module('tofixtheworldApp')
  .factory('ingredientFactory', function ($firebase) {
    return {
      random: function(ingredientObj) {
        // Put the keys in an array so they can be counted
        var keyArray = Object.keys(ingredientObj);
        // Choose a random key
        var chosenKey = keyArray[Math.floor(Math.random()*keyArray.length)]
        // Return object based on chosenKey
        return ingredientObj[chosenKey];
      },
      all: function() {
        return ingredientObj;
      }
    };
    console.log('Executed.')
  });
