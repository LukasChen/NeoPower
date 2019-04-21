const { src, watch, dest } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require('gulp-sourcemaps');
const tildeImporter = require('node-sass-tilde-importer');

function buildSass() {
  return src("./assets/main.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
        importer: tildeImporter,
        includePaths: ["./_sass/"]
      })
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(dest("./assets"));
}

function watchSass() {
  watch("./_sass/**/**.scss",buildSass);
  watch("./assets/main.scss",buildSass);
}

exports.watch = watchSass;

exports.sass = buildSass;