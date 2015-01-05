'use strict';

describe('Service: ideaFactory', function () {

  // load the service's module
  beforeEach(module('tofixtheworldApp'));

  // instantiate service
  var ideaFactory;
  beforeEach(inject(function (_ideaFactory_) {
    ideaFactory = _ideaFactory_;
  }));

  it('should do something', function () {
    expect(!!ideaFactory).toBe(true);
  });

});
