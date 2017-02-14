var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var rollupBetter = require('gulp-better-rollup');
var buble = require('rollup-plugin-buble');
var nodeResolve = require('rollup-plugin-node-resolve');

var paths = require('./config').paths;
var names = require('./config').names;


module.exports = {
  debug: debug
};


function debug() {
  return function () {
    return gulp.src(paths.scripts.entry)
      .pipe(jshint({esversion: 6}))
      .pipe(jshint.reporter('default'))
      .pipe(sourcemaps.init())
      .pipe(rollupBetter({
        moduleName: names.module,
        moduleId: true,
        plugins: [
          nodeResolve(),
          buble()
        ]
      }, 'iife'))
      .pipe(sourcemaps.write(''))
      .pipe(gulp.dest(paths.dev.root));
  }
}
