// Require and load our packages
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha'),
    jade = require('gulp-jade'),
    del = require('del');

// Reference our app files for easy reference in out gulp tasks
var paths = {
    scripts: ['./routes'],  // you can use glob pattern
    server: {
        index: './bin/www',
        specs: ['./test/test.js']
    },
    dist: './dist/'
};

// The `default` task gets called when no task name is provided to Gulp
gulp.task('default', ['serve', 'test'], function (cb) {
    cb().pipe(process.exit());
});

gulp.task('build', ['jade', 'css']);

gulp.task('clean', function(cb) {
   del([paths.dist], cb);
});

// start your server with nodemon
gulp.task('serve', function () {
    nodemon({script: paths.server.index, ext: 'js', ignore: []})
        .on('restart', function () {
            console.log('Server has been restarted.')
        });
});

// run mocha specs
gulp.task('test', function (cb) {
    setTimeout(function () {
        gulp.src(paths.server.specs)
            .pipe(mocha({reporter: 'spec'}))
            .on('end', function () {
                cb();
            });
    }, 250);
});

gulp.task('css', function () {
    return gulp.src('./public/stylesheets/*.css')
        .pipe(gulp.dest(paths.dist + 'stylesheets'));
});

gulp.task('jade', function () {
    return gulp.src('views/index.jade')
        .pipe(jade({pretty: true, data: {title: 'GRNodeDev Brewster' }}))
        .pipe(gulp.dest(paths.dist));
});
