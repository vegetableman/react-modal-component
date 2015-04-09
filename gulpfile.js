var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('build', function () {
    return gulp.src('./src/**')
        .pipe(react({
            harmony: true
        }))
        .pipe(gulp.dest('./lib'));
});

gulp.task('default', ['build']);
