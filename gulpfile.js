var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "./public/js/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main-min.js"))
        .pipe(gulp.dest("./public/js/"));
});