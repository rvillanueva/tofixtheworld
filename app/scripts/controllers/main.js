'use strict';

/**
 * @ngdoc function
 * @name tofixtheworldApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tofixtheworldApp
 */
angular.module('tofixtheworldApp')
  .controller('MainCtrl', function ($scope, $firebase, ingredientFactory) {

// I'm really not sure how I got this part to work, honestly

    var ref = new Firebase("https://incandescent-torch-665.firebaseio.com/");
    var syncPrinciples = $firebase(ref.child('principles'));
    var syncChallenges = $firebase(ref.child('challenges'));
// I think these two lines are only here to trigger the first configuration
    $scope.principles = syncPrinciples.$asObject();
    $scope.challenges = syncChallenges.$asObject();
    var principles;
    var challenges;

    ref.child('challenges').on("value", function(snapshot) {
        challenges = snapshot.val();
         return challenges;
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
    ref.child('principles').on("value", function(snapshot) {
      principles = snapshot.val();
      return principles;
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

// Generate random set of values
// Need to add logic to check for a lock on each
    $scope.generateRandomSet = function(){
      $scope.currentPrinciple = ingredientFactory.random(principles);
      $scope.currentChallenge = ingredientFactory.random(challenges);
      console.log('Generate!');
      console.log(principles)
      console.log($scope.currentPrinciple)
    }

// Because asynchronous loading, wait until loaded to generate random set
// Something here is causing problems when returning to the page

    $scope.principles.$loaded().then(function() {
      console.log('activated');
      $scope.currentPrinciple = ingredientFactory.random(principles)
      console.log('Principles loaded')
    });
    $scope.challenges.$loaded().then(function() {
      $scope.currentChallenge = ingredientFactory.random(challenges)
    });
    console.log('Back!')
  });
