'use strict';
import CreateManager from '../../src/manager';

describe('Manager', function () {
  it('should parse', function () {
    var manger = CreateManager({
      url: '/'
    });
    expect(true).toEqual(true);
  });
});
