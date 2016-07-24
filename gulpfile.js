var gulp =             require('gulp')
    jade =             require('gulp-jade'),
    sass =             require('gulp-sass'),
    autoprefixer =     require('gulp-autoprefixer'),
    plumber =          require('gulp-plumber'),
    watch =            require('gulp-watch'),
    debug =            require('gulp-debug'),
    rename =           require("gulp-rename"),
    babel =            require('gulp-babel'),
    path =             require('path');

var destination = "build";


gulp.task('build', function(){
  gulp.src('src/sass/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(debug({title: 'BUILD CSS:'}))
    .pipe(gulp.dest(
      path.join(destination, 'static/css')
    ));

  gulp.src('src/**/*.php')
    .pipe(debug({title: 'BUILD PHP:'}))
    .pipe(gulp.dest(
      path.join(destination, '')
    ));

  gulp.src('src/templates/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(debug({title: 'BUILD JADE:'}))
    .pipe(gulp.dest(
      path.join(destination, 'templates')
    ));

  gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(debug({title: 'BUILD JS:'}))
    .pipe(gulp.dest(
      path.join(destination, 'static/js')
    ));
});

gulp.task('watch', ['build'], function() {

  watch('src/sass/*.scss', {ignoreInitial: false})
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(debug({title: 'CSS:'}))
    .pipe(gulp.dest(
      path.join(destination, 'static/css')
    ));

  watch('src/**/*.php', {ignoreInitial: false})
    .pipe(debug({title: 'PHP:'}))
    .pipe(gulp.dest(
      path.join(destination, '')
    ));

  watch('src/templates/*.jade', {ignoreInitial: false})
    .pipe(plumber())
    .pipe(jade())
    .pipe(debug({title: 'JADE:'}))
    .pipe(gulp.dest(
      path.join(destination, 'templates')
    ));

  watch('src/js/*.js', {ignoreInitial: false})
      .pipe(plumber())
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(debug({title: 'JS:'}))
      .pipe(gulp.dest(
        path.join(destination, 'static/js')
      ));
});
