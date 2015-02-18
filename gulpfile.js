// Gulp and plugins
var gulp = require("gulp"),
	// concat = require("gulp-concat"),
	plumber = require("gulp-plumber"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify"),
	jshint = require("gulp-jshint"),
	jscs = require('gulp-jscs');

var paths = {
	source: "src/",
	dist: "dist/"
};

gulp.task('js', function(){
	return gulp.src(paths.source + '*.js')
		.pipe(jshint(".jshintrc"))
		.pipe(plumber())
		.pipe(jscs())
		.pipe(plumber())
		.pipe(gulp.dest(paths.dist))
	    .pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(uglify())
	    .pipe(gulp.dest(paths.dist));
});


//-----------------------------------------
//
//	Main gulp tasks
//
//-----------------------------------------

// Production Build Task
gulp.task('default', ['js'], function(){
	// Done!
});