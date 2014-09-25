'use strict';

angular.module('liveInputApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
        //$scope.currencyValue = 10;

        $scope.onSubmit = function () {
          // do additional server side validation
          // ctrl.$setValidity('currencyValue', isValid);
        };
      }
    ]);
  