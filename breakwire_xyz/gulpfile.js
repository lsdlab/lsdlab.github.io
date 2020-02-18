var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


// minify-all-css
gulp.task('minify-all-css', function() {
    return gulp.src('static/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(concat('all-in-one.min.css'))
        .pipe(gulp.dest('./static/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// minify-all-js
gulp.task('minify-all-js', function() {
    return gulp.src('static/js/*.js')
        .pipe(uglify())
        .pipe(concat('all-in-one.min.js'))
        .pipe(gulp.dest('./static/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', function() {
    return gulp.src('static/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./static/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('static/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./static/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


// Run everything
gulp.task('default', ['minify-all-css', 'minify-all-js']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// minify-all
gulp.task('minify-all', ['browserSync', 'minify-all-css', 'minify-all-js'], function() {
    gulp.watch('css/*.css', ['minify-all-css']);
    gulp.watch('js/*.js', ['minify-all-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
