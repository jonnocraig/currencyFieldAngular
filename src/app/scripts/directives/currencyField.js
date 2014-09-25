'use strict';

angular.module('liveInputApp')
  .directive('currencyFormat', ['FormatUtil', '$timeout', function (FormatUtil, $timeout) {
    return {
      require: '?ngModel',
      restrict: 'A',
      link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) {
          return;
        }

        elem.bind('keypress', function (evt) {
          FormatUtil.keyCheck(evt, elem);
          scope[attrs.ngModel] = elem.val();
        });

        elem.bind('blur', function (evt) {
          scope.$apply(function() {
            scope[attrs.ngModel] = FormatUtil.validate(scope[attrs.ngModel].toString());
          });
        });

        scope.$watch(attrs.ngModel, function (value) {
          elem[0].value = FormatUtil.currencyFormat(value.toString());
          return elem[0].value;
        });
      }
    };
  }]);

