import { Deffered, request } from '../core';
import parse from './parser';

export default function Manager(options) {
  var inited = false;
  var initPromise = new Deffered();

  var service = {
    get: get
  };
  Object.defineProperty(service, '$$init', {
    value: init,
    enumerable: false
  });
  return Object.freeze(service);


  function init() {
    // defualt the data and includes so bindings can run
    options.data = options.id ? {} : [];
    options.oldValue = options.id ? {} : [];
    options.included = {};
    initPromise.resolve();
    inited = true;
  }



  /**
   * @ngdoc method
   * @name Manager#get
   * @function
   *
   * @description
   * get data from server
   * if you call this more than once it will only get new data
   *
   * @param {function=} callback - function to be called when data is recieved. It will pass back any errors
   */
  function get(callback) {
    initPromise.then(function () {
      getData(callback);
    });
  }


  function getData(callback) {
    request
      .get(options.url)
      .bustCache()
      .send(function (error, response) {
        if (error !== undefined) {
          callback(error);
          options.errored = true;
          return;
        }

        options.originalResponse = response.body;
        options.data = parse(response.body);
        callback(undefined, options.data);
      });
  }
}
