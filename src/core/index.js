import * as constants from './constants';
import Deffered from './Deffered';
import * as request from './request';
export {
  clone,
  constants,
  Deffered,
  hashString,
  request
};



function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}


// Calculate a 32 bit FNV-1a hash and convert it to hex
function hashString(str) {
  /*jshint bitwise:false */
  var i = 0;
  var l = str.length;
  var hval = 0x811c9dc5;

  while (i < l) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    i++;
  }

  return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
}
