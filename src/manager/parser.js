import { clone } from '../core';

export default function (payload) {
  payload = clone(payload);
  var types = {};
  var data = parse(payload.data, payload.included, types);

  return {
    root: data,
    types: types
  };
}


function parse(data, included, types) {
  function parseRouter(data, func) {
    if (data instanceof Array) { return data.map(func); }
    else { return func(data); }
  }

  function parseObject(item) {
    if (item === null) { return null; }
    if (!types[item.type]) { types[item.type] = {}; }
    if (!types[item.type][item.id]) {
      item.attributes.id = item.id;
      // Object.defineProperty(item.attributes, '$$type', {
      //   enumerable: false,
      //   value: item.type
      // });
      types[item.type][item.id] = item.attributes;
    }
    Object.keys(item.relationships || {}).forEach(function (key) {
      types[item.type][item.id][key] = parseRouter(item.relationships[key].data, getIncluded);
    });
    return types[item.type][item.id];
  }

  function getIncluded(item) {
    if (!types[item.type]) { types[item.type] = {}; }
    if (types[item.type][item.id]) { return types[item.type][item.id]; }
    var i = 0;
    var length = included.length;
    while (i < length) {
      if (included[i].id === item.id) {
        return types[item.type][item.id] = parseRouter(included[i], parseObject);
      }
      i += 1;
    }
  }

  return parseRouter(data, parseObject);
}
