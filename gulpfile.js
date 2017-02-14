var paths = require('./gulp/config').paths;
var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var jsDebugTask = require('./gulp/buildJS').debug;
var karmaTests = require('./gulp/karma-test');
var bump = require('./gulp/bump');

gulp.task('build', ['build:dev:clean', 'build:dev:js']);
gulp.task('build:dev:clean', cleanTask(paths.dev.root));
gulp.task('build:dev:js', jsDebugTask());
gulp.task('test:karma', karmaTests.runKarma);
gulp.task('major', bump.major);
gulp.task('minor', bump.minor);
gulp.task('patch', bump.patch);
gulp.task('release', bump.release);


function cleanTask(src) {
  return function () {
    gulp.src(src, { read: false }).pipe(gulpClean(null));
  }
}
