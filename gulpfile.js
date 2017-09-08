var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var banner = require('gulp-banner');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var comment = ['/*!\n',
    ' * Els den Engelse - <%= pkg.title %> v<%= pkg.version %>\n',
    ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    ''
].join('');

// Compile SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('styles/scss/styles.scss')
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(gulp.dest('styles/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('styles/css/styles.css')
        .pipe(autoprefixer())
        .pipe(banner(comment, { pkg: pkg }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('styles/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('scripts/main.js')
        .pipe(uglify())
        .pipe(banner(comment, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('scripts'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'));
});

// Run everything
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        }
    })
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js'], function() {
    gulp.watch('styles/scss/*.scss', ['sass']);
    gulp.watch('styles/css/*.css', ['minify-css']);
    gulp.watch('scripts/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('scripts/**/*.js', browserSync.reload);
});
