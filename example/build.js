var fs = require('fs');
var fsx = require('fs-extra');
var replace = require('replace-in-file');
var browserify = require("browserify");
var babelify = require("babelify");

/*************************************************/
/* Build into distributable, production versions */
/*************************************************/

// CUSTOM WEB COMPONENT -- BUILD //
console.log('--------------------------------');
console.log('- Custom Web Component - BUILD -');
console.log('--------------------------------');
console.log('');

// clean up build
console.log('Cleaned Build...');
fsx.remove('./index.js')
.then(() => console.log('Cleaned Build DONE'))
.catch((error) => console.log('Cleaned Build FAILED...', error))

// build src into distributable
.then(() => console.log('Create distributable logic...'))
.then(() => new Promise((resolve, reject) => {
	browserify({ debug: true })
	.transform(babelify.configure({ extensions: [".mjs"] }))
	.require("./index.mjs", { entry: true })
	.bundle()
	.on("error", (err) => reject("Browserify/Babelify compile error: " + err.message))
	.pipe(fs.createWriteStream("./index.js"))
	.on("finish", () => resolve());
}))
.then(() => console.log('Create distributable logic DONE'))
.catch((error) => console.log('Create distributable logic FAILED', error))

.then(() => {
	console.log('');
	console.log('-------');
	console.log('- END -');
	console.log('-------');
	console.log('');
});