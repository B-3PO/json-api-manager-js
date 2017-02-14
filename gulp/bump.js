var gulp = require('gulp');
var gulpBump = require('gulp-bump');

module.export = {
  major: major,
  minor: minor,
  patch: patch,
  preRelease: preRelease
};



function major(){
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type:'major'}))
    .pipe(gulp.dest('./'));
}

function minor(){
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type:'minor'}))
    .pipe(gulp.dest('./'));
}

function patch(){
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type:'patch'}))
    .pipe(gulp.dest('./'));
}

function preRelease(){
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type:'prerelease'}))
    .pipe(gulp.dest('./'));
}
