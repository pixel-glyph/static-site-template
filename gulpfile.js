const gulp        = require('gulp');
const bSync       = require('browser-sync').create();
const harp        = require('harp');

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

gulp.task('default', ['serve']);