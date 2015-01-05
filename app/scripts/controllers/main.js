'use strict';

/**
 * @ngdoc function
 * @name tofixtheworldApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tofixtheworldApp
 */
angular.module('tofixtheworldApp')
  .controller('MainCtrl', function ($scope, $firebase, ingredientFactory, ideaFactory) {

// I'm really not sure how I got this part to work, honestly

    var ref = new Firebase("https://incandescent-torch-665.firebaseio.com/");
    var principles;
    var challenges;
    $scope.cHintNum = 0;
    $scope.pHintNum = 0;

    // Set up idea obj
    $scope.ideas = ideaFactory.getNew();
    console.log($scope.ideas);

//can I replace with factory function?

    $scope.getIngredients = function(){
      ref.child('challenges').on("value", function(snapshot) {
          challenges = snapshot.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
//useless bit--need to fix
//      ingredientFactory.get('challenges').then(function(data){
//        challenges = data;
//      });

      ref.child('principles').on("value", function(snapshot) {
        principles = snapshot.val();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }

    $scope.getIngredients();

    $scope.selectPrinciple = function(principle){
      $scope.currentPrincipleKey = principle;
      $scope.currentPrinciple = principles[$scope.currentPrincipleKey];
      $scope.pHintNum = 0;
    }

    $scope.selectChallenge = function(challenge){
      $scope.currentChallengeKey = challenge;
      $scope.currentChallenge = challenges[$scope.currentChallengeKey];
      $scope.cHintNum = 0;
    }

// Generate random set of values
// Need to add logic to check for a lock on each
    $scope.generateRandomSet = function(){
      $scope.selectPrinciple(ingredientFactory.random(principles));
      $scope.selectChallenge(ingredientFactory.random(challenges));
      console.log('Generated!');
    }

    $scope.addHint = function(type){
      if (type == 'principle'){
        $scope.pHintNum ++;
      };
      if (type == 'challenge'){
        $scope.cHintNum ++;
      };
    };

// Because asynchronous loading, wait until loaded to generate random set
// Something here is causing problems when returning to the page

    $scope.initIngredients = function(){
        $scope.generateRandomSet();
        console.log('Ingredients initialized');
        $scope.challenges = challenges;
        $scope.principles = principles;
    }



// Need to get rid of the principles loaded somehow...

    ingredientFactory.get('principles').then(function(){
      ingredientFactory.get('challenges').then(function(){
        $scope.initIngredients();
      });
    });

// Form functions

    $scope.resetForm = function (){
      $scope.ideaText = "";
      $scope.ideaForm.$setPristine();
    };

    $scope.submitIdea = function (){
      var ideaRef = new Firebase('https://incandescent-torch-665.firebaseio.com/ideas/');
      ideaRef.push({
        'desc': $scope.ideaText,
        'principle' : $scope.currentPrincipleKey,
        'challenge': $scope.currentChallengeKey,
        'score': 1
      });
      $scope.resetForm();
    };

// Orders dropdown items
//  $scope.orderProp = 'name';

  // end controller
  });
