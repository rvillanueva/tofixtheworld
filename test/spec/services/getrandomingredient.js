'use strict';

describe('Service: getRandomIngredient', function () {

  // load the service's module
  beforeEach(module('tofixtheworldApp'));

  // instantiate service
  var getRandomIngredient;
  beforeEach(inject(function (_getRandomIngredient_) {
    getRandomIngredient = _getRandomIngredient_;
  }));

  it('should do something', function () {
    expect(!!getRandomIngredient).toBe(true);
  });

});
