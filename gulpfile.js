"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var sprite = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var run = require("run-sequence");
var del = require("del");

gulp.task("style", function() {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]);
  gulp.watch("source/*.html", ["html"]);
});

gulp.task("images", function() {
  gulp.src("source/img/**/*.{png,svg,jpg}")
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function(){
  gulp.src("source/img/**/*.svg")
    .pipe(sprite({
      inlineSvg: true
  }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  gulp.src("source/*.html")
    .pipe(posthtml([
      include()
  ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
})

gulp.task("clean", function() {
  del("build");
})

gulp.task("build", function(done) {
  run("clean", "copy", "style", "images", "webp", "sprite", "html", done)
});
