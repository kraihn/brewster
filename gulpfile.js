// Require and load our packages
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha');

// Reference our app files for easy reference in out gulp tasks
var paths = {
    scripts: ['./routes'],  // you can use glob pattern
    server: {
        index: './bin/www',
        specs: ['./test/test.js']
    }
};

// The `default` task gets called when no task name is provided to Gulp
gulp.task('default', ['serve', 'test'], function (cb) {
    cb().pipe(process.exit());
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
