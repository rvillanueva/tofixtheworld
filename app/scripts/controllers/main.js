'use strict';

/**
 * @ngdoc function
 * @name tofixtheworldApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tofixtheworldApp
 */
angular.module('tofixtheworldApp')
  .controller('MainCtrl', function ($scope, $firebase) {

// I'm really not sure how I got this part to work, honestly

    var ref = new Firebase("https://incandescent-torch-665.firebaseio.com/");
    var sync = $firebase(ref);
    $scope.principles = sync.$asObject();
    $scope.challenges = sync.$asObject();


    ref.child("principles").on("value", function(snapshot) {
      $scope.principles = snapshot.val();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    ref.child("challenges").on("value", function(snapshot) {
      $scope.challenges = snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

// Function to call if you need a new Principle
    $scope.getRandomIngredient = function(ingredientType){
      // Put the keys in an array so they can be counted
      var keyArray = Object.keys($scope[ingredientType]);
      // Choose a random key
      var chosenKey = keyArray[Math.floor(Math.random()*keyArray.length)]
      // Retrieve object based on chosenKey
      $scope['current' + ingredientType] = $scope[ingredientType][chosenKey];
    };


// Generate random set of values
// Need to add logic to check for a lock on each
    $scope.generateRandomSet = function(){
      $scope.getRandomIngredient('principles');
      $scope.getRandomIngredient('challenges');
      console.log('Generate!')
    }

// Because asynchronous loading, wait until loaded to generate random set
// Something here is causing problems when returning to the page

    $scope.principles.$loaded().then(function () {
        $scope.getRandomIngredient('principles');
        console.log('Principles loaded')
    });
    $scope.challenges.$loaded().then(function () {
      $scope.getRandomIngredient('challenges');
    });
    console.log('Back!')
  });
