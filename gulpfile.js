global.$ = require('gulp-load-plugins')({ renameFn(name) {
  return name.replace('gulp-', '').replace(/-/g, '_');
} });

global.errorHandler = (err) => {
  const { $ } = global;

  $.notify.onError({
    title: `Gulp error in ${err.plugin}`,
    message: err.toString(),
  })(err);
};

global.taskPath = require('./config').path;

const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp-tasks', { recurse: true });

gulp.task(
  'clean',
  gulp.parallel(
    'clean:image',
    'clean:icon',
    'clean:font',
    'clean:style',
  ),
);

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('build:image', 'build:icon', 'build:font'),
    'build:style',
  ),
);

gulp.task(
  'watch',
  gulp.parallel(
    'watch:image',
    'watch:icon',
    'watch:font',
    'watch:style',
  ),
);

gulp.task(
  'dev',
  gulp.series(
    gulp.parallel('dev:image', 'dev:icon', 'dev:font'),
    'dev:style',
  ),
);

gulp.task('default', gulp.series('dev', gulp.parallel('server:init', 'watch')));
