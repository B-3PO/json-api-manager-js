'use strict';
import Deffered from '../../src/core/deffered';

describe('deffered', function () {
  it('should pass', function (done) {
    var value;
    var defer = new Deffered();
    var prom = defer.promise;
    prom.then(function () {
      value = true;
      expect(value).toEqual(true);
      done();
    });
    defer.resolve();
  });
});
