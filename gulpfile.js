const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const gulp = require('gulp')
const less = require('gulp-less')
const pug = require('gulp-pug')
const pump = require('pump')
const uglifyjs = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const webserver = require('gulp-webserver')

gulp.task('vendors', function () {
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./dist/vendors/jquery'))

  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/fonts/**/*'
  ]).pipe(gulp.dest('./dist/vendors/bootstrap/'))
})

gulp.task('css', function (cb) {
  pump([
    gulp.src('./src/css/*.less'),
    less(),
    autoprefixer(),
    uglifycss(),
    gulp.dest('./dist/assets/css')
  ], cb)
})

gulp.task('js', function (cb) {
  pump([
    gulp.src('./src/js/*.js'),
    babel(),
    uglifyjs(),
    gulp.dest('./dist/assets/js')
  ], cb)
})

gulp.task('views', function (cb) {
  pump([
    gulp.src('./src/views/*.pug'),
    pug(),
    gulp.dest('./dist')
  ], cb)
})

gulp.task('webserver', function () {
  gulp.src('./dist')
    .pipe(webserver({
      fallback: 'index.html',
      hostname: '127.0.0.1',
      livereload: true,
      open: true,
      port: '8080',
    }))
})

gulp.task('watch', function () {
  gulp.watch('./src/css/**/*.less', ['css'])
  gulp.watch('./src/js/*.js', ['js'])
  gulp.watch('./src/views/**/*.pug', ['views'])
})

gulp.task('development', ['webserver', 'watch'])
gulp.task('default', ['vendors', 'css', 'js', 'views'])