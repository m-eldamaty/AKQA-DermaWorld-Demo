const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');

const paths = {
  src: {
    root: './',
    components: './src/components/*.html',
    js: './src/js/*.js',
    scssRootFile: './src/scss/app.scss',
    scss: './src/scss/*/*.scss',
    img: './src/img/*',
    favicon: './src/favicon.ico',
    fonts: './src/fonts/*',

  },
  dest: {
    root: './build/',
    js: './build/assets/js/',
    scss: './build/assets/css/',
    img: './build/assets/img/',
    fonts: './build/assets/fonts/',
  }
};

// Clean assets
function clear() {
    return src(paths.dest.root, {
            read: false
        })
        .pipe(clean());
}

// Build and minify JS 
function js() {
    return src(paths.src.js)
        .pipe(changed(paths.src.js))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(paths.dest.js))
        .pipe(browsersync.stream());
}

// Build and minify SCSS 
function css() {
    return src(paths.src.scssRootFile)
        .pipe(changed(paths.src.scssRootFile))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(dest(paths.dest.scss))
        .pipe(browsersync.stream());
}

// Copy images
function img() {
    return src(paths.src.img)
        .pipe(dest(paths.dest.img));
}

// Copy favicon
function favicon() {
    return src(paths.src.favicon)
        .pipe(dest(paths.dest.root));
}

// Copy fonts
function fonts() {
    return src(paths.src.fonts)
        .pipe(dest(paths.dest.fonts));
}

// Build HTML
function html(){
    return src([
      '*.html',
      ])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(dest(paths.dest.root));
  }

// Watch files
function watchFiles() {
    watch(paths.src.scss, css);
    watch(paths.src.js, js);
    watch(paths.src.img, img);
    watch(paths.src.fonts, fonts);
    watch(paths.src.components, html);
}



// BrowserSync
function browserSync() {
    browsersync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    });
}

// Tasks to define the execution of the functions simultaneously or in series
exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(html, js, css, img, fonts, favicon));