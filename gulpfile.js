var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');

const svgFiles = ['./public/weather-icons/*.svg'];


function spriteCompile(cb) {
	cb();

	svgFiles.forEach(function (srcLoc) {
		let stream = gulp.src(srcLoc)
			.pipe(svgSprite({
				shape: {
					id: {
						generator: "icon-%s"
					}
				},
				svg: {
					xmlDeclaration: false
				},
				mode: {
					symbol: {
						dest: '.',
						inline: true,
						prefix: 'icon-%s',
						bust: false,
						sprite: 'icon-sprite.svg'
					}
				}
			}))
			.pipe(gulp.dest('./src/assets'));

		return stream

	});

}


exports.default = gulp.series(spriteCompile);