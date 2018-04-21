const gulp        = require('gulp');
const bSync       = require('browser-sync').create();
const harp        = require('harp');
const imagemin    = require('gulp-imagemin');
const svgMin      = require('gulp-svgmin');

/**
 * Serve up Harp from src
 */
gulp.task('serve', function () {
  harp.server(__dirname + '/public', {
    port: 9000
  }, function () {
    bSync.init({
      proxy: "localhost:9000",
      notify: false
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch("src/**/*.scss", function () {
      bSync.reload("public/main.css", {stream: true});
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch("src/**/*.jade", function () {
      bSync.reload();
    });
  })
});

gulp.task('svg', function() {
  return gulp.src('src/src-img/svg/**/*.svg')
    .pipe(svgMin())
    .pipe(gulp.dest('src/svg'));
});

gulp.task('imagemin', function() {
  return gulp.src('src/src-img/img/*')
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('public/img'));
});

gulp.task('opt-svgs', ['svg']);
gulp.task('opt-imgs', ['imagemin']);
gulp.task('default', ['serve']);