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
fsx.remove('./build')
.then(() => console.log('Cleaned Build DONE'))
.catch((error) => console.log('Cleaned Build FAILED...', error))

// rebuild build structure
.then(() => console.log('Build Structure...'))
.then(() => fsx.ensureDir('./build/assets/images'))
.then(() => fsx.ensureDir('./build/assets/logic'))
.then(() => fsx.ensureDir('./build/assets/style'))
.then(() => console.log('Build Structure DONE'))
.catch((error) => console.log('Build Structure FAILED...', error))

// copy over src
.then(() => console.log('Copy Source...'))
.then(() => fsx.copy('./src', './build/src'))
.then(() => fsx.copy('./index.mjs', './build/index.mjs'))
.then(() => console.log('Copy Source DONE'))
.catch((error) => console.log('Copy Source FAILED...', error))

// copy over assets
.then(() => console.log('Copy Assets...'))
.then(() => fsx.copy('./assets', './build/assets'))
.then(() => console.log('Copy Assets DONE'))
.catch((error) => console.log('Copy Assets FAILED...', error))

// copy over service worker
.then(() => console.log('Service Worker...'))
.then(() => fsx.copy('./sw.js', './build/sw.js'))
.then(() => console.log('Service Worker DONE'))
.catch((error) => console.log('Service Worker FAILED...', error))

// copy over deps
.then(() => console.log('Copy Dependencies...'))
.then(() => fsx.copy('./node_modules/@webcomponents', './build/node_modules/@webcomponents'))
.then(() => fsx.copy('./node_modules/aws-sdk', './build/node_modules/aws-sdk'))
.then(() => fsx.copy('./node_modules/custom-web-component', './build/node_modules/custom-web-component'))
.then(() => fsx.copy('./node_modules/lit-html', './build/node_modules/lit-html'))
.then(() => fsx.copy('./node_modules/reflect-constructor', './build/node_modules/reflect-constructor'))
.then(() => console.log('Copy Dependencies DONE'))
.catch((error) => console.log('Copy Dependencies FAILED', error))

// copy over html root entry point
.then(() => console.log('Copy HTML Root...'))
.then(() => fsx.copy('./index.html', './build/index.html'))
.then(() => console.log('Copy HTML Root DONE'))
.catch((error) => console.log('Copy HTML Root FAILED', error))

// fix paths in html entry root
.then(() => console.log('HTML Add No Module Support...'))
.then(() => replace({ files: './build/index.html', from: '<script type="module" src="index.mjs"></script>', to: '<script type="module" src="index.mjs"></script>\n\t\t<script nomodule src="index.js"></script>'}))
.then(() => console.log('HTML Add No Module Support DONE'))
.catch((error) => console.log('HTML Add No Module Support FAILED', error))

// // copy src to temp folder
// .then(() => console.log('Copy src to temp...'))
// .then(() => fsx.copy('./src', './__src'))
// .then(() => fsx.copy('./index.mjs', './__index.mjs'))
// .then(() => console.log('Copy src to temp DONE'))
// .catch((error) => console.log('Copy src to temp FAILED', error))

// // alter temp files to encapsulate CSS will the real shadow dom please stand up! (shady)

// new Promise((resolve, reject) => {
// 	// glob("./__src/**/*.js", function (error, files) {
// 	// 	if (error) return reject(error);

// 	// 	var promises = [];
// 	// 	for (const file of files) {

// 	// 		console.log(file, file.split());
// 	// 		// replace({ files: file, from: /type="module"/g, to: '' })
// 	// 	}

// 	// 	return Promise.all(promises).then(resolve);

// 	// 	// files is an array of filenames.
// 	// 	// If the `nonull` option is set, and nothing
// 	// 	// was found, then files is ["**/*.js"]
// 	// 	// er is an error object or null.
// 	// 	// return resolve();
// 	// })

// 	return findInFiles.find(/customElements\.define\s?\(\s?[\'\"]{1}[a-z-]+[\'\"]{1}\s?,\s?[a-zA-Z]+\s?\)\s?\;/, './__src', '.js').then((results) => {

// 		for (const file in results) {
// 			var tag = results[file].matches[0].match(/\'\s?([a-zA-Z-]+)\s?\'/)[1];
// 			replace({ files: file, from: /:host/g, to: tag });
// 		}

// 		// return resolve;
// 	})


// }).then(() => {
// 	console.log(111)
// })

// build src into distributable
.then(() => console.log('Create distributable logic...'))
.then(() => new Promise((resolve, reject) => {
	browserify({ debug: true })
	.transform(babelify.configure({ extensions: [".mjs"] }))
	.require("./index.mjs", { entry: true })
	.bundle()
	.on("error", (err) => reject("Browserify/Babelify compile error: " + err.message))
	.pipe(fs.createWriteStream("./build/index.js"))
	.on("finish", () => resolve());
}))
.then(() => console.log('Create distributable logic DONE'))
.catch((error) => console.log('Create distributable logic FAILED', error))

// // remove temp
// .then(() => console.log('Remove temp...'))
// .then(() => fsx.remove('./__index.mjs'))
// .then(() => fsx.remove('./__src'))
// .then(() => console.log('Remove temp DONE'))
// .catch((error) => console.log('Remove temp FAILED', error))

.then(() => {
	console.log('');
	console.log('-------');
	console.log('- END -');
	console.log('-------');
	console.log('');
});