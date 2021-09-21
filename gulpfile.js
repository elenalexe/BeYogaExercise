const { src, dest, parallel, series, watch } = require("gulp");
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const sasslint = require("gulp-sass-lint");
const pugGulp = require("gulp-pug");
const kitGulp = require("gulp-kit-2");
const phpGulp = require("gulp-php2html");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const prettier = require("gulp-pretty-html");
const jsimport = require("gulp-js-import-file");
const browsersync = require("browser-sync");
const del = require("del");
const paths = {};

paths.assets = "./dist/";

/* HTML Task */
function html() {
  return src("./*.html").pipe(dest(paths.assets));
}

/* PUG Task */
function pug() {
  return src("src/templates-pug/*.pug")
    .pipe(pugGulp())
    .pipe(prettier(
      {
        indent_size: 2,
        preserve_newlines: 2
      }
    ))
    .pipe(rename({ extname: ".php" }))
    .pipe(dest("./src/templates-php/components"));
}

/* KIT Task */
function kit() {
  return src("src/templates-kit/*.kit")
    .pipe(kitGulp())
    .pipe(dest(paths.assets));
}

/* PHP Task */
function php() {
  return src(["src/templates-php/*.php"])
    .pipe(phpGulp())
    .pipe(dest(paths.assets));
}

/* LINTSASS Task */
function lintsass() {
  return src(["src/scss/*.scss", "!src/scss/vendors/*.scss"])
    .pipe(
      sasslint({configFile: "src/scss/.sasslintrc"})
    )
    .pipe(sasslint.format())
}

/* SCSS bundled into compressed CSS */
function css() {
  return src("src/scss/**/*.scss", del(paths.assets + "assets/css/**"))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(prefix())
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("maps"))
    .pipe(dest(paths.assets + "css"));
}

/* Copy Assets */
function copyAssets() {
  return src("src/assets/**/*.*", del(paths.assets + "assets/**")).pipe(dest(paths.assets + "assets"));
}

/* JS bundled into min.js task */
function js() {
  return src(
    ["src/js/**/*.js", "!src/js/vendors/**/*.js"],
    del(paths.assets + "assets/js/**")
  )
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("maps"))
    .pipe(dest(paths.assets + "js"));
}

/*  Copy JS components */
function copyJsComponents() {
  return src(["src/js/components/**/*.*","!src/js/components/write.php"], del(paths.assets + "js/components/**"))
    .pipe(babel())
    .pipe(dest(paths.assets + "js/components/"));
}

/* Copy JS vendors */
function copyJsVendors() {
  return src(
    ["src/js/vendors/**/*.*", "!src/js/vendors/vendors-bundle.js"],
    del(paths.assets + "js/vendors/**")
  ).pipe(dest(paths.assets + "js/vendors/"));
}

/* JS vendors bundled */
function vendorsBundle() {
  return src("src/js/vendors/*.js")
    .pipe(
      jsimport({
        hideConsole: true,
        es6import: true
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(paths.assets + "js"));
}

/* Server Start */
function browserSync() {
  browsersync({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
}

/* Server Reload */
function browserReload() {
  return browsersync.reload;
}

/* Watch files on change */
function watchFiles() {
  /* Watch all design changes */
  watch("src/scss/**/*.*", css).on("change", browserReload());

  /* Watch javascript changes */
  watch("src/js/**/*.js", series(js, copyJsComponents)).on("change", browserReload());
  watch("src/js/vendors/**/*.js", series(copyJsVendors, vendorsBundle)).on("change", browserReload());

  /* Watch templates changes */
  watch("./*.html", html).on("change", browserReload());
  watch("src/templates-kit/**/*.kit", kit).on("change", browserReload());
  watch("src/templates-pug/**/*.pug", pug);
  watch("src/templates-php/**/*.php", php).on("change", browserReload());
}

const watching = parallel(watchFiles, browserSync);
exports.html = html;
exports.kit = kit;
exports.pug = pug;
exports.php = php;
exports.lintsass = lintsass;
exports.css = css;
exports.js = js;
exports.copyAssets = copyAssets;
exports.copyJsVendors = copyJsVendors;
exports.vendorsBundle = vendorsBundle;
exports.copyJsComponents = copyJsComponents;
exports.prod = series(html, kit, pug, php, lintsass, css, js, vendorsBundle, copyAssets);
exports.default = series(html, kit, pug, php, lintsass, css, js, copyJsComponents, copyJsVendors, vendorsBundle, copyAssets, watching);