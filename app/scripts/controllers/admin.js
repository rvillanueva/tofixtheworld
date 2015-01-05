'use strict';

/**
 * @ngdoc function
 * @name tofixtheworldApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the tofixtheworldApp
 */
angular.module('tofixtheworldApp')
  .controller('AdminCtrl', function ($scope) {
    $scope.ingredient = {
      type: 'principles',
      name: null,
      hints: {
        0: {
          desc: null,
          link: null
        },
        1: {
          desc: null,
          link: null
        },
        2: {
          desc: null,
          link: null
        },
        3: {
          desc: null,
          link: null
        },
        4: {
          desc: null,
          link: null
        },
      }
    };

    var blankIngredient = angular.copy($scope.ingredient);

    $scope.resetForm = function ()
  {
    var ingredientSave = $scope.ingredient.type;
    $scope.ingredient = angular.copy(blankIngredient);
    $scope.ingredient.type = ingredientSave;
    $scope.ingredientForm.$setPristine();
  };

  $scope.submitData = function ($firebase)
    {
      var messageListRef = new Firebase('https://incandescent-torch-665.firebaseio.com/' + $scope.ingredient.type);
      messageListRef.push({
        'active': false,
        'name' : $scope.ingredient.name,
        'hints': $scope.ingredient.hints
      });
      $scope.resetForm();
    };
  });
