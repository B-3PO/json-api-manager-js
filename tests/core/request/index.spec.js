'use strict';
import request from '../../../src/core/request';
import * as jasmineAjax from 'jasmine-ajax';

describe('xhr', function () {
  beforeEach(function () {
    jasmine.Ajax.install();
  });
  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should open and send', function () {
    spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
    spyOn(XMLHttpRequest.prototype, 'send');
    request
      .get('')
      .send();
    expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
    expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
  });


  it('should error', function (done) {
    jasmine.Ajax.stubRequest('http://test.test/test').andReturn({
      status: 401,
    });
    request
      .get('http://test.test/test')
      .send(function (error) {
        if (!error) {
          fail('error');
        }
        done();
      });
  });

  it('should add headers', function () {
    var instance = request.headers({ test: 'test' });
    expect(instance.requestHeaders.test).toEqual('test');
  });

  it('should add headers', function () {
    var instance = request.queryParams({ test: 'test' });
    expect(instance.requestqueryParams).toEqual('test=test');
  });
});
