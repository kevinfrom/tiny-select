const { src, dest, series, parallel, watch: watcher } = require('gulp')
const sass = require('gulp-sass')
const cleanCss = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const terser = require('gulp-terser')

const css = () => (
    src('src/scss/tiny-select.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(cleanCss())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest('dist'))
)

const js = () => (
    src('src/js/tiny-select.js')
        .pipe(terser())
        .pipe(dest('dist'))
)

const watch = () => {
    watcher('src/**/*.scss', css)
    watcher('src/**/*.js', js)
}

const build = parallel(css, js)

exports.css = css
exports.js = js
exports.watch = watch
exports.build = build
exports.default = series(build, watch)
