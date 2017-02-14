'use strict';
import runRequest from '../../../src/core/request/xhr';
import * as jasmineAjax from 'jasmine-ajax';

describe('xhr', function () {
  beforeEach(function () {
    jasmine.Ajax.install();
  });
  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should open and send', function () {
    var requestConfig = {
      method: 'GET',
      url: '',
      headers: {}
    };

    spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
    spyOn(XMLHttpRequest.prototype, 'send');
    runRequest(requestConfig, function () {});
    expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
    expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
  });


  it('should error', function (done) {
    var requestConfig = {
      method: 'GET',
      url: 'http://test.test/test',
      headers: {}
    };
    jasmine.Ajax.stubRequest('http://test.test/test').andReturn({
      status: 401,
    });
    runRequest(requestConfig, function (error) {
      if (!error) {
        fail('error');
      }
      done();
    });
  });
});
