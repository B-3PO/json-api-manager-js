import Manager from './Manager';
import { hashString } from '../core';

export default function Create(options) {
  validate(options);
  options = copyOptions(options);
  options.url = buildGetUrl(options.url, options.id, options.include);
  // create hex hash; used to refernce this manger
  options.managerId = hashString(options.getUrl);
  return Manager(options);
}


function buildGetUrl(url, id, include) {
  var getUrl = url;
  if (id !== undefined) { getUrl += '/' + id; }
  if (include instanceof Array && include.length > 0) {
    getUrl += '?include=' + include.join(',');
  }

  return getUrl;
}

function copyOptions(options) {
  return {
    url: options.url,
    id: options.id,
    include: options.include
  };
}

function validateOptions(options) {
  if (typeof options !== 'object' || options === null) {
    throw Error('You must pass in options');
  }

  if (options.url === undefined) {
    throw Error('requires a "url" options prameter');
  }
}
