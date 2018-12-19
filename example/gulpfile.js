var gulp = require('gulp');
var rename = require("gulp-rename");
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

/**************************************************/
/* Build into distributable, development versions */
/**************************************************/

gulp.task('build', ['build-js']);

gulp.task('build-js', function() {
	gulp.src('./index.mjs')
		.pipe(browserify({transform: ['babelify']}))
		.on('error', function(err) { console.log(err); util.beep(); this.emit('end'); })
		.pipe(rename('index.js'))
		.pipe(gulp.dest('./build/'))
		.pipe(rename('index.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/'));
});

/********************************************/
/* Build then Watch for changes and rebuild */
/********************************************/

gulp.task('watch', ['build'], function() {
	gulp.watch([
		'./src/**/*.*'
	], ['build-js']);
});

/*************************/
/* Testing Using Jasmine */
/*************************/

// var Server = require('karma').Server;

// gulp.task('test-once', function (done) {
//   new Server({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
// });

// gulp.task('test', function (done) {
//   new Server({
//     configFile: __dirname + '/karma.conf.js'
//   }, done).start();
// });
