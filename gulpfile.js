var gulp = require('gulp');

var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var qunit = require('gulp-qunit');


gulp.task('compile', function() {
  gulp.src('tests/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./tests'));
  gulp.src('*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('.'));
});

gulp.task('test', function() {
  gulp.src('./tests/index.html')
    .pipe(qunit());
});

gulp.task('compress', function() {
  return gulp.src('*.coffee')
    .pipe(coffee())
    .pipe(uglify())
    .pipe(rename('areyousure.min.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
  gulp.watch('*/**/*.coffee', ['compile', 'compress', 'test']);
});

gulp.task('default', ['compile', 'compress', 'test']);
