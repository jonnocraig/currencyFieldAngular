'use strict';

describe('Directive: Currency Field', function () {

  // load the controller's module
  beforeEach(module('liveInputApp', []));

  var MainCtrl,
    formatUtil,
    currencyField,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $directive, $factory, $rootScope) {
    scope = $rootScope.$new();
    formatUtil = $factory('FormatUtil', {
      $scope: scope
    });

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
    currencyField = $directive('currencyFormat', {
      $scope: scope
    });
  }));

  it('should be able to load', function () {
    expect(true).toBe(true);
  });
});