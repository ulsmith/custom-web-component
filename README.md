Custom Web Component
=======================

Forget angular, forget react, forget vue, lets start building raw custom web components!

Support down to IE11 with reflect-component polyfill, this class extends CustomHTMLElement (more to follow) to build a new HTML element based on the most basic.

using lit-html (render, html) to offer super simple html templating and targetted updates to the dom with this.update()

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
    <!-- Production project entrypoint -->
    <script src="./build/index.js"></script>
```

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

COMPILATION

```js
// using gulp file
var gulp = require('gulp');
var rename = require("gulp-rename");
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

/**************************************************/
/* Build into distributable, development versions */
/**************************************************/

gulp.task('build', ['build-js']);

gulp.task('build-js', function() {
	gulp.src('./index.mjs')
		.pipe(browserify({transform: ['babelify']}))
		.on('error', function(err) { console.log(err); util.beep(); this.emit('end'); })
		.pipe(rename('index.js'))
		.pipe(gulp.dest('./build/'))
		.pipe(rename('index.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/'));
});

/********************************************/
/* Build then Watch for changes and rebuild */
/********************************************/

gulp.task('watch', ['build'], function() {
	gulp.watch([
		'./src/**/*.*'
	], ['build-js']);
});
```

PACKAGE SETUP FOR BABEL

```json
{
  "version": "0.0.1",
  "name": "...",
  "description": "...",
  "license": "...",
  "author": "...",
  "dependencies": {
    "@webcomponents/custom-elements": "^1.2.1",
    "@webcomponents/webcomponentsjs": "^2.2.1",
    "lit-html": "^0.14.0",
    "reflect-constructor": "^1.0.0",
    "custom-web-component": "^1.0.0",
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
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-plugin-transform-custom-element-classes": "^0.1.0",
    "babel-plugin-transform-es2015-classes": "^6.24.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-es2015-loose": "^7.0.0",
    "babel-preset-latest": "^6.24.1",
    "babelify": "^7.3.0",
    "express": "^4.16.4",
    "gulp": "^3.9.1",
    "gulp-browserify": "^0.5.1",
    "gulp-rename": "^1.4.0",
    "gulp-sourcemaps": "^1.12.1",
    "gulp-uglify": "^1.5.4",
    "gulp-util": "^3.0.8",
    "gulp-watch": "^4.3.11"
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
     * template()
     * Return html TemplateResolver a list of observed properties, that will call propertyChanged() when mutated
     * @return {TemplateResult} Returns a HTML TemplateResult to be used for the basis of the elements DOM structure 
     */
    template() {
        return html`
            <style>
                p { display: block; border: 2px solid red; padding: 20px; color: red; }
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
     * @static @get observedAttributes()
     * Return a list of observed attributes, that will call attributeChanged() when mutated
     * @return {Array} List of attributes that will promote the callback to be called on mutation 
     */
    static get observedAttributes() { return ['bar']; }
    
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
     * @public propertyChanged()
     * Invoked when an observed instantiated property has changed
     * @param {String} property The name of the property that changed 
     * @param {*} oldValue The old value before hte change 
     * @param {*} newValue The new value after the change
     */
    propertyChanged(property, oldValue, newValue) {
        console.log('propertyChanged', property, oldValue, newValue);
    }
    
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

        this.update();
    }

    /**
     * @public update() [parent class]
     * Update the view, pushing only changes for update in shadow DOM
     */
    // update()
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