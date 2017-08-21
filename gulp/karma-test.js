var gulp = require('gulp');
var KarmaServer = require('karma').Server;

module.export = {
  runKarma: runKarma
};

function runKarma(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, function (errorCode) {
    if (errorCode !== 0) {
      console.log('Karma exited with error code ' + errorCode);
      done();
      return process.exit(errorCode);
    }
    done();
  }).start();
}
