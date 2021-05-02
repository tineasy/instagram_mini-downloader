const { dest, parallel, series, src, watch } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const del = require("del");
const gulp_sass = require("gulp-sass");
const uglify = require("gulp-uglify-es").default;

function cleanDist() {
  return del("dist");
}

function scripts() {
  return src(["app/js/main.js", "app/js/**/*.js", "!app/js/main.min.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"));
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(concat("style.min.css"))
    .pipe(gulp_sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("app/css"));
}

function build() {
  return src(
    [
      "app/css/bootstrap-reboot.min.css",
      "app/css/style.min.css",
      "app/css/**/*.css",
      "app/js/main.min.js",
      "app/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.scripts = scripts;
exports.styles = styles;
exports.watching = watching;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);
