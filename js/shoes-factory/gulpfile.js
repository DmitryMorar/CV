var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('app/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});
//
//gulp.task('browser-sync', function () {
//    browserSync.init({
//        proxy: "cv/staff-factory/app/"
//    });
//});


gulp.task('browser-sync', function () {
    browserSync({
        server: {
        baseDir: 'app/'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/*.js', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
});
