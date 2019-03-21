Custom Web Component
====================

Forget angular, forget react, forget vue, lets start building raw custom web components!

Support down to IE11 with reflect-component polyfill, this class extends CustomHTMLElement (more to follow) to build a new HTML element based on the most basic.

using lit-html (render, html), an optional templating binder to offer super simple html templating and targetted updates to the dom with this.updateTemplate(), or simple embed your own raw HTML, your choice.

Look in the example folder for some basic concepts and use case, more docs to follow

DEVELOPMENT IN CHROME (native)

```html
    <!-- Polyfill missing methods -->
    <script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <!-- Native project entrypoint -->
    <script type="module" src="./index.mjs"></script>
```

PRODUCTION THROUGH BUILDS (compiled with babel)

```html
    <!-- Polyfill missing methods -->
    <script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <!-- Native project entrypoint -->
    <script type="module" src="./index.mjs"></script>
    <!-- Backup compiled endpoint for browsers that lack module loading -->
    <script nomodule src="./index.js"></script>
```

The above will give you modular JS loading for those browsers that support it and fallback to compiled build using babel should you wish to support IE11

YOUR ENTRY POINT

```js
import './node_modules/reflect-constructor/reflect-constructor.js'; // IE11 Reflect polyfill
import './node_modules/@webcomponents/custom-elements/custom-elements.min.js'; // custom element class polyfill
import './src/HelloWorldComponent.js'; // your entry component
```

INSTALLATION

```bash
npm install reflect-constructor lit-html custom-web-component --save
```

BUILDING

```js
// Typical Build script
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
```

COMPILATION (to build the index.js fall back using build.js)

```bash
# example in example folder
# build the IE11 fallback
npm run build
```

Will run the build.js script

SERVE USING EXPRESS

```bash
# example in example folder
# serve to localhost:XXXX
npm run serve
```

PACKAGE SETUP FOR BABEL

```json
{
  "version": "0.0.1",
  "name": "MyApp",
  "description": "My Application",
  "licence": "MIT",
  "author": "Paul Smith (ulsmith)",
  "scripts": {
    "start": "node server.js",
    "serve": "node server.js",
    "build": "node build.js"
  },
  "dependencies": {
    "@webcomponents/custom-elements": "^1.2.1",
    "@webcomponents/webcomponentsjs": "^2.2.1",
    "custom-web-component": "^1.2.0",
    "lit-html": "^0.14.0",
    "reflect-constructor": "^1.0.0"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-plugin-transform-custom-element-classes": "^0.1.0",
    "babel-plugin-transform-es2015-classes": "^6.24.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-es2015-loose": "^7.0.0",
    "babel-preset-es2016": "^6.24.1",
    "babel-preset-latest": "^6.24.1",
    "babelify": "^7.3.0",
    "browserify": "^16.2.3",
    "express": "^4.16.4",
    "fs-extra": "^7.0.1",
    "replace-in-file": "^3.4.2"
  },
  "babel": {
    "plugins": [
      "transform-custom-element-classes",
      "transform-es2015-classes"
    ],
    "presets": [
      "latest"
    ]
  },
  "browserify": {
    "transform": [
      [
        "babelify",
        {
          "plugins": [
            "transform-custom-element-classes",
            "transform-es2015-classes"
          ],
          "presets": [
            "latest"
          ]
        }
      ]
    ]
  }
}
```

YOUR FIRST WEB COMPONENT

```js
import { CustomHTMLElement, html } from "./node_modules/custom-web-component/index.js";

/**
 * HelloWorldComponent
 * A sample Custom HTML Element, to be used in any system that is capable of outputting HTML
 * Build on Web Standards and polyfilled for legacy browsers, using a simple clean lite HTML template rendering called lit-html
 */
class HelloWorldComponent extends CustomHTMLElement {
    
    /**
     * @public constructor()
     * Invoked when instantiation of class happens
     * NOTE: Call super() first!
     * NOTE: Declare local properties here... [this.__private, this._protected, this.public] 
     * NOTE: Declarations and kick starts only... no business logic here!
     */
    constructor() {
        super();

        this.foo = 'FOO!!';
        this.bar;
    }
    
    /**
     * template()
     * Return html TemplateResolver a list of observed properties, that will call propertyChanged() when mutated
     * @return {TemplateResult} Returns a HTML TemplateResult to be used for the basis of the elements DOM structure 
     */
    static template() {
        return html`
            <style>
                /* Style auto encapsulates in shadowDOM or shims for IE */
				:host { display: block; }
                #hello-world-component p { display: block; border: 2px solid red; padding: 20px; color: red; }
            </style>

			<div>
				<p>
					<slot name="main">Hello</slot>
					<br/>
					<br/>
					<strong>FOO:</strong> ${this.foo}
					<br/>
					<strong>BAR:</strong> ${this.bar}
					<br/>
					<br/>
					<slot name="footer">World</slot>
				</p>
			</div>
        `;
    }

    /**
     * @static @get observedProperties()
     * Return a list of observed properties, that will call propertyChanged() when mutated
     * @return {Array} List of properties that will promote the callback to be called on mutation 
     */
    static get observedProperties() { return ['foo', 'bar']; }

    /**
     * @public propertyChanged()
     * Invoked when an observed instantiated property has changed
     * @param {String} property The name of the property that changed 
     * @param {*} oldValue The old value before hte change 
     * @param {*} newValue The new value after the change
     */
    propertyChanged(property, oldValue, newValue) {
        console.log('propertyChanged', property, oldValue, newValue);

        this.updateTemplate();
    }

    /**
     * @static @get observedAttributes()
     * Return a list of observed attributes, that will call attributeChanged() when mutated
     * @return {Array} List of attributes that will promote the callback to be called on mutation 
     */
    static get observedAttributes() { return ['bar']; }
    
    /**
     * @public attributeChanged()
     * Invoked when an observed node attribute has changed
     * @param {String} attribute The name of the attribute that changed 
     * @param {*} oldValue The old value before hte change 
     * @param {*} newValue The new value after the change
     */
    attributeChanged(attribute, oldValue, newValue) {
        console.log('attributeChanged', attribute, oldValue, newValue);

        if (attribute === 'bar') this.bar = newValue;

        this.updateTemplate();
    }

    /**
     * @public connected()
     * Invoked when node is connected/added to the DOM
     */
    connected() {
        console.log('connected');
    }

    /**
     * @public disconnected()
     * Invoked when node is disconnected/removed from the DOM
     */
    disconnected() {
        console.log('disconnected');
    }

    /**
     * @public templateUpdated()
     * Invoked when the template is updated
     */
    templateUpdated() {
        // this.dom will return you the <div id="hello-world-component"></div> element instance of this specific instance of the web component 
        console.log('Template has been updated via this.update()');
    }
}

customElements.define('hello-world-component', HelloWorldComponent);
```

use it in your html

```html
<hello-world-component bar="bar!">
    <slot name="main">Hello</slot>
    <slot name="footer">World</slot>
</hello-world-component>
```