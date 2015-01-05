'use strict';

/**
 * @ngdoc service
 * @name tofixtheworldApp.ideaFactory
 * @description
 * # ideaFactory
 * Factory in the tofixtheworldApp.
 */
angular.module('tofixtheworldApp')
  .factory('ideaFactory', function ($q, $firebase) {

    return {
      getTop: function(){
        return $q(function (resolve, reject) {
          var ref = new Firebase("https://incandescent-torch-665.firebaseio.com/");
          function successCallback(snapshot) {
            resolve(snapshot.val());
          };

          function cancelCallback(error) {
            reject(error);  // pass along the error object
          };


          ref.child('ideas').queryOrderedByKey('score').on("value", successCallback, cancelCallback);
        });
      },
      getNew: function(){


//        return $q(function (resolve, reject) {
          var ref = new Firebase("https://incandescent-torch-665.firebaseio.com/");
          var sync = $firebase(ref.child("ideas"));
          // download the data into a local object
          var ideaData = sync.$asObject();
          return ideaData;
          console.log(ideaData);
//          function successCallback(snapshot) {
//            resolve(snapshot.val());
//          };
//
//          function cancelCallback(error) {
//            reject(error);  // pass along the error object
//          };


//          ref.child('ideas').on("value", successCallback, cancelCallback);
//        });
      }
    };
  });
