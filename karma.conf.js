// karma.conf.js
var buble = require('rollup-plugin-buble');
var nodeResolve = require('rollup-plugin-node-resolve');
var names = require('./gulp/config').names;

module.exports = function(config) {
  config.set({
      autoWatch: true,
      singleRun: true,
      browsers: ['PhantomJS'],
  		frameworks: ['jasmine'],


  		// list of files / patterns to load in the browser
      files: [
        'node_modules/babel-polyfill/dist/polyfill.js',
        { pattern: 'src/**/*.js', included: false },
        'tests/**/*.spec.js'
      ],

      // add a preprocessor for the main test file
      preprocessors: {
        'src/**/*.js': ['rollup'],
        'tests/**/*.spec.js': ['rollup']
      },

      plugins: [
        'karma-jasmine',
        'karma-rollup-preprocessor',
        'karma-phantomjs-launcher'
      ],

      rollupPreprocessor: {
        plugins: [
          nodeResolve(),
          buble()
        ],
        format: 'iife',
        moduleName: names.module,
        moduleId: true,
        sourceMap: 'inline'
      },

      reporters: [ 'progress']
    });
};
