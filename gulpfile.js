var gulp = require('gulp');

var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compile', function() {
  gulp.src('tests/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./tests'));
  gulp.src('*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('.'));
});

gulp.task('compress', function() {
  return gulp.src('*.coffee')
    .pipe(coffee())
    .pipe(uglify())
    .pipe(rename('areyousure.min.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
  gulp.watch('*/**/*.coffee', ['compile', 'compress']);
});

gulp.task('default', ['compile', 'compress']);
