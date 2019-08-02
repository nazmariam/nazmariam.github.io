const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    styles: {
        src: './sass/',
        dest: './css/'
    },
    scripts: {
        src: './js/',
        dest: './js/',
    }
};

/**
 *  Compile css
 */
function styles() {
    return gulp.src(paths.styles.src + 'main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(livereload({ start: true }));
}

/**
 * Check errors in js
 */
function lint() {
    return gulp.src([
        paths.scripts.src + '*.js',
        `!${paths.scripts.src}*.min.js`,
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
}

/**
 *  Minify and concat all JS files
 */
function scripts() {
    return gulp.src([paths.scripts.src + '*.js', `!${paths.scripts.src}*.min.js`])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest))
}

/**
 *  Watch changes
 */
function watch() {
    livereload.listen();
    gulp.watch(paths.styles.src + '**/*.scss', styles);
    gulp.watch([
        paths.scripts.src + '*.js',
        `!${paths.scripts.src}*.min.js`,
    ], gulp.series(lint, scripts));
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
let development = gulp.parallel(styles, scripts);

/*
 * Define development task to build our js and css for Development
 */
gulp.task('development', development);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', gulp.series(development, watch));