
const paths = {
    styles: {
        input: 'src/styles/main.scss',
        src: 'src/styles/**/*.scss',
        dest: 'dist/styles/'
    },
    scripts: {
        input: 'src/scripts/app.js',
        src: 'src/scripts/**/*.js',
        dest: 'dist/scripts/'
    }
};


// gulp.js file in the root folder

var gulp = require('gulp');

var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rollup = require('@rollup/stream');

var sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

// *Optional* Depends on what JS features you want vs what browsers you need to support
// *Not needed* for basic ES6 module import syntax support
var babel = require('@rollup/plugin-babel');

// Add support for require() syntax
var commonjs = require('@rollup/plugin-commonjs');

// Add support for importing from node_modules folder like import x from 'module-name'
var nodeResolve = require('@rollup/plugin-node-resolve');

// Cache needs to be initialized outside of the Gulp task
var cache;

gulp.task('js', function () {
    return rollup({
        // Point to the entry file
        input: paths.scripts.input, //'./app.js',
        // Apply plugins
        plugins: [babel(), commonjs(), nodeResolve()],
        // Use cache for better performance
        cache: cache,
        // Note: these options are placed at the root level in older versions of Rollup
        output: {
            // Output bundle is intended for use in browsers
            // (iife = "Immediately Invoked Function Expression")
            format: 'iife',
            // Show source code when debugging in browser
            sourcemap: false,
        }
    })
        .on('bundle', function (bundle) {
            // Update cache data after every bundle is created
            cache = bundle;
        })
        // Name of the output file.
        .pipe(source('main.min.js'))
        .pipe(buffer())

        // The use of sourcemaps here might not be necessary,
        // Gulp 4 has some native sourcemap support built in
        // .pipe(sourcemaps.init({loadMaps: true}))
        // .pipe(sourcemaps.write('.'))

        // Where to send the output file
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('js:watch', function (done) {
    gulp.watch([paths.scripts.src], gulp.series('js'));
    done();
})

gulp.task('css', function() {
    return gulp.src(paths.styles.input)
        .pipe(sass())
        .pipe(cleanCSS())
        // pass in options to the stream
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest));

});

gulp.task('css:watch', function(done) {
    gulp.watch([paths.styles.src], gulp.series('css'));
    done();
});

gulp.task('watch', gulp.series('js', 'js:watch', 'css', 'css:watch'));

