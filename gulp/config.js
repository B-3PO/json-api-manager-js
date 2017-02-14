var srcPath = 'src/';
var distPath = 'dist/';
var devPath = 'dev/';


exports.names = {
  file: 'json-api-manger',
  module: 'jsonpaiManger'
}

exports.paths = {
  src: srcPath,
  dist: {
    root: distPath
  },
  dev: {
    root: devPath
  },
  scripts: {
    root: srcPath,
    all: srcPath + '**/*.js',
    entry: srcPath + 'index.js'
  }
};
