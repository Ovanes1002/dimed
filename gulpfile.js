import gulp from "gulp";
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";
import gulpSass from "gulp-sass";
// import sass from "sass";
import * as sass from "sass";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";

const sassCompiler = gulpSass(sass);

export const html = () => {
    return gulp
        .src("src/index.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
};

export const styles = () => {
    return (
        gulp
            .src("src/scss/**/*.+(scss|sass)")
            .pipe(sassCompiler(/*{ outputStyle: "compressed" }*/).on("error", sassCompiler.logError))
            // .pipe(rename({ suffix: ".min", prefix: "" }))
            .pipe(autoprefixer())
            // .pipe(cleanCSS({ compatibility: "ie8" }))
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream())
    );
};

export const scripts = () => {
    return gulp
        .src("src/js/*.js")
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            }),
        )
        .pipe(uglify())
        .on("error", function (err) {
            console.error("Ошибка при объединении или транспиляции:", err.toString());
        })
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
};

export const images = () => {
    return gulp.src(`src/images/**/*`, { encoding: false }).pipe(imagemin()).pipe(gulp.dest(`dist/images`));
};

export const copy = () => {
    return gulp
        .src(["src/fonts/**/*", "src/icons/**/*"], {
            base: "src",
        })
        .pipe(gulp.dest("dist"))
        .pipe(
            browserSync.stream({
                once: true,
            }),
        );
};

export const server = () => {
    browserSync.init({
        server: "./dist",
        port: 3000,
    });

    gulp.watch("src/index.html").on("change", function () {
        browserSync.reload();
    });
    gulp.watch("src/scss/**/*.+(scss|sass)").on("change", function () {
        browserSync.reload();
    });
    gulp.watch("src/js/*.js").on("change", function () {
        browserSync.reload();
    });
};

export const watch = () => {
    gulp.watch("src/index.html").on("change", gulp.series(html));
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.series(styles));
    gulp.watch("src/js/*.js").on("change", gulp.series(scripts));
    gulp.watch("src/js/*.js").on("change", gulp.series(images));
    gulp.watch(["src/fonts/**/*", "src/icons/**/*"], gulp.series(copy));
};

export default gulp.series(gulp.parallel(html, styles, scripts, images, copy), gulp.parallel(watch, server));
