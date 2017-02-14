import runRequest from './xhr';

const config = { baseUrl: '' };
const rootInstance = createInstance();
rootInstance.config = config;
export default rootInstance;

function createInstance() {
  return {
    get: get,
    bustCache: bustCache,
    headers: headers,
    queryParams: queryParams,
    send: send
  };
}


/**
  * @method get
  * @description
  * set method to `GET` and url
  *
  * @param {string} url - url
  * @example
  * requester.get('/locations');
  */
function get(url) {
  return setMethodUrl(this, 'GET', url);
}

/**
  * @method queryParams
  * @description
  * set url params
  *
  * @param {object} obj - object that will be converted into url params
  * @return {object} requester instance
  * @example
  * requester.queryParams({search: 'what'});
  */
function queryParams(obj) {
  var instance = getInstance(this);
  instance.requestqueryParams = Object.keys(obj).map(function (key) {
    return key+'='+obj[key];
  }).join('&');
  return instance;
}

/**
  * @method bustCache
  * @description
  * add cache bust queryParam
  *
  * @return {object} requester instance
  * @example
  * requester.bustCache();
  */
function bustCache(cb) {
  var instance = getInstance(this);
  instance.requestBustCache = cb || Date.now();
  return instance;
}

/**
  * @method headers
  * @description
  * set request headers
  *
  * @param {object} obj - object that contains the headers. this must be a 1 demensional object
  * @return {object} requester instance
  * @example
  * requester.headers({'Content-Type': 'text/plain'});
  */
function headers(obj) {
  var instance = getInstance(this);
  instance.requestHeaders = obj;
  return instance;
}


/**
  * @method send
  * @description
  * Send the request.
  *
  * @param {function} callback - callback function
  * @return {responseReturn} $q` for angular and `bluebird` for node
  * @example
  * requester.get('url').send().then().catch().finally();
  */
/**
 * Response object
 * $q` for angular and `bluebird` for node
 * @typedef {Object} responseReturn
 * @property {any} body - response body
 * @property {function} headers - header getter function
 * @property {int} status - status code
 */
function send(callback) {
  var instance = this;
  if (instance._created === undefined || instance.url === undefined) {
    throw Error('Cannot send call without setting method and url');
  }

  var requestConfig = {
    method: instance.method,
    url: config.baseUrl + instance.url,
    headers: instance.requestHeaders || {}
  };

  // add query params to url
  if (instance.requestqueryParams) {
    requestConfig.url += requestConfig.url.indexOf('?') === -1 ? '?'+instance.requestqueryParams : '&'+instance.requestqueryParams;
  }

  // add cacheBust query param
  if (instance.requestBustCache) {
    requestConfig.url += requestConfig.url.indexOf('?') === -1 ? '?'+instance.requestBustCache : '&'+instance.requestBustCache;
  }

  // this function exists in the modue file
  var result = runRequest(requestConfig, callback);
  // if (typeof callback !== 'function') { return result; } // for promises
}


function setMethodUrl(inst, method, url) {
  var instance = getInstance(inst);
  instance.method = method;
  instance.url = url;
  return instance;
}


function getInstance(self) {
  if (self._created) { return self; }
  var instance = createInstance();
  instance._created = true;
  return instance;
}
