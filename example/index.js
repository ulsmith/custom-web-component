(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./node_modules/reflect-constructor/reflect-constructor.js');

require('./src/HelloWorldComponent.js');

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');

},{"./node_modules/reflect-constructor/reflect-constructor.js":15,"./src/HelloWorldComponent.js":16}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.html = exports.CustomHTMLElement = undefined;

var _CustomHTMLElement = require('./src/CustomHTMLElement.js');

var _CustomHTMLElement2 = _interopRequireDefault(_CustomHTMLElement);

var _litHtml = require('../lit-html/lit-html.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CustomHTMLElement = _CustomHTMLElement2.default;
exports.html = _litHtml.html;

},{"../lit-html/lit-html.js":14,"./src/CustomHTMLElement.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _litHtml = require('../../lit-html/lit-html.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
	return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);

/**
 * CustomHTMLElement
 * A sample extension to the basic HTML Element class, providing templating for web components through the lit-html library
 * Build on Web Standards, polyfilled for legacy browsers, using a simple clean lite HTML template rendering called lit-html
 * Extend this class to create a simple HTML Custome Element
 */
var CustomHTMLElement = function (_CustomElement2) {
	_inherits(CustomHTMLElement, _CustomElement2);

	/**
 * constructor()
 * Create a simple HTML element and observe changes to properties
 */
	function CustomHTMLElement() {
		_classCallCheck(this, CustomHTMLElement);

		var _this = _possibleConstructorReturn(this, (CustomHTMLElement.__proto__ || Object.getPrototypeOf(CustomHTMLElement)).call(this));

		_this.__bindProperties();
		return _this;
	}

	/**
  * connectedCallback()
  * Catch the standard connected callback, rendering the template on instantiation
  * follows up by bubbling the callback up to connected() on child
  */


	_createClass(CustomHTMLElement, [{
		key: 'connectedCallback',
		value: function connectedCallback() {
			if (!this.isConnected) return;
			this.update();
			if (typeof this.connected === 'function') this.connected.call();
		}

		/**
   * disconnectedCallback()
   * Catch the standard disconnected callback
   * follows up by bubbling the callback up to disconnected() on child
   */

	}, {
		key: 'disconnectedCallback',
		value: function disconnectedCallback() {
			if (this.isConnected) return;
			if (typeof this.disconnected === 'function') this.disconnected.call();
		}

		/**
   * attributeChangedCallback()
   * Catch the standard attributeChanged callback
   * follows up by bubbling the callback up to attributeChanged() on child for attributes subscribed too
   */

	}, {
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(attribute, oldValue, newValue) {
			if (typeof this.attributeChanged === 'function') this.attributeChanged.call(this, attribute, oldValue, newValue);
		}

		/**
   * __bindProperties()
   * Internal method to bind properties and create a propertyChanged callback, also exposing an event of the same name
   * use this callback or watch the event to be notified of property changes that are subscribed too
   */

	}, {
		key: '__bindProperties',
		value: function __bindProperties() {
			var _this2 = this;

			if (!this.constructor.observedProperties || !this.constructor.observedProperties.length) return;

			this.__properties = {};

			var _loop = function _loop(idx) {
				Object.defineProperty(_this2, _this2.constructor.observedProperties[idx], {
					get: function get() {
						return this.__properties[this.constructor.observedProperties[idx]];
					},
					set: function set(value) {
						var oldValue = this.__properties[this.constructor.observedProperties[idx]];
						this.__properties[this.constructor.observedProperties[idx]] = value;
						if (typeof this.propertyChanged === 'function') this.propertyChanged.call(this, this.constructor.observedProperties[idx], value);
						this.dispatchEvent(new CustomEvent('propertychanged', { 'detail': { 'property': this.constructor.observedProperties[idx], 'oldValue': oldValue, 'newValue': value } }));
					}
				});
			};

			for (var idx in this.constructor.observedProperties) {
				_loop(idx);
			}
		}

		/**
   * update()
   * Inform the template of changes to properties by telling it to update
   * uses lit-html to actively render a DOM template and only change stuff that needs changing!
   */

	}, {
		key: 'update',
		value: function update() {
			if (!this.isConnected) return;
			(0, _litHtml.render)(this.template(), this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' }));
		}
	}]);

	return CustomHTMLElement;
}(_CustomElement);

exports.default = CustomHTMLElement;

},{"../../lit-html/lit-html.js":14}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This code may only be used under the BSD style license found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/LICENSE.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The complete set of authors may be found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/AUTHORS.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The complete set of contributors may be found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/CONTRIBUTORS.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Code distributed by Google as part of the polymer project is also
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * subject to an additional IP rights grant found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/PATENTS.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _parts = require('./parts.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates Parts when a template is instantiated.
 */
var DefaultTemplateProcessor = exports.DefaultTemplateProcessor = function () {
    function DefaultTemplateProcessor() {
        _classCallCheck(this, DefaultTemplateProcessor);
    }

    _createClass(DefaultTemplateProcessor, [{
        key: 'handleAttributeExpressions',

        /**
         * Create parts for an attribute-position binding, given the event, attribute
         * name, and string literals.
         *
         * @param element The element containing the binding
         * @param name  The attribute name
         * @param strings The string literals. There are always at least two strings,
         *   event for fully-controlled bindings with a single expression.
         */
        value: function handleAttributeExpressions(element, name, strings, options) {
            var prefix = name[0];
            if (prefix === '.') {
                var _comitter = new _parts.PropertyCommitter(element, name.slice(1), strings);
                return _comitter.parts;
            }
            if (prefix === '@') {
                return [new _parts.EventPart(element, name.slice(1), options.eventContext)];
            }
            if (prefix === '?') {
                return [new _parts.BooleanAttributePart(element, name.slice(1), strings)];
            }
            var comitter = new _parts.AttributeCommitter(element, name, strings);
            return comitter.parts;
        }
        /**
         * Create parts for a text-position binding.
         * @param templateFactory
         */

    }, {
        key: 'handleTextExpression',
        value: function handleTextExpression(options) {
            return new _parts.NodePart(options);
        }
    }]);

    return DefaultTemplateProcessor;
}();

var defaultTemplateProcessor = exports.defaultTemplateProcessor = new DefaultTemplateProcessor();


},{"./parts.js":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var directives = new WeakMap();
/**
 * Brands a function as a directive so that lit-html will call the function
 * during template rendering, rather than passing as a value.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object
 *
 * @example
 *
 * ```
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 * ```
 */
var directive = exports.directive = function directive(f) {
  return function () {
    var d = f.apply(undefined, arguments);
    directives.set(d, true);
    return d;
  };
};
var isDirective = exports.isDirective = function isDirective(o) {
  return typeof o === 'function' && directives.has(o);
};


},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var isCEPolyfill = exports.isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), into another container (could be the same container), before
 * `beforeNode`. If `beforeNode` is null, it appends the nodes to the
 * container.
 */
var reparentNodes = exports.reparentNodes = function reparentNodes(container, start) {
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var before = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var node = start;
    while (node !== end) {
        var n = node.nextSibling;
        container.insertBefore(node, before);
        node = n;
    }
};
/**
 * Removes nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), from `container`.
 */
var removeNodes = exports.removeNodes = function removeNodes(container, startNode) {
    var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var node = startNode;
    while (node !== endNode) {
        var n = node.nextSibling;
        container.removeChild(node);
        node = n;
    }
};


},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
var noChange = exports.noChange = {};


},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isPrimitive = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * @license
                                                                                                                                                                                                                                                                               * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
                                                                                                                                                                                                                                                                               * This code may only be used under the BSD style license found at
                                                                                                                                                                                                                                                                               * http://polymer.github.io/LICENSE.txt
                                                                                                                                                                                                                                                                               * The complete set of authors may be found at
                                                                                                                                                                                                                                                                               * http://polymer.github.io/AUTHORS.txt
                                                                                                                                                                                                                                                                               * The complete set of contributors may be found at
                                                                                                                                                                                                                                                                               * http://polymer.github.io/CONTRIBUTORS.txt
                                                                                                                                                                                                                                                                               * Code distributed by Google as part of the polymer project is also
                                                                                                                                                                                                                                                                               * subject to an additional IP rights grant found at
                                                                                                                                                                                                                                                                               * http://polymer.github.io/PATENTS.txt
                                                                                                                                                                                                                                                                               */


var _directive = require('./directive.js');

var _dom = require('./dom.js');

var _part = require('./part.js');

var _templateInstance = require('./template-instance.js');

var _templateResult = require('./template-result.js');

var _template = require('./template.js');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isPrimitive = exports.isPrimitive = function isPrimitive(value) {
    return value === null || !((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'function');
};
/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */

var AttributeCommitter = exports.AttributeCommitter = function () {
    function AttributeCommitter(element, name, strings) {
        _classCallCheck(this, AttributeCommitter);

        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (var i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */


    _createClass(AttributeCommitter, [{
        key: '_createPart',
        value: function _createPart() {
            return new AttributePart(this);
        }
    }, {
        key: '_getValue',
        value: function _getValue() {
            var strings = this.strings;
            var l = strings.length - 1;
            var text = '';
            for (var i = 0; i < l; i++) {
                text += strings[i];
                var part = this.parts[i];
                if (part !== undefined) {
                    var v = part.value;
                    if (v != null && (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = v[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var t = _step.value;

                                text += typeof t === 'string' ? t : String(t);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    } else {
                        text += typeof v === 'string' ? v : String(v);
                    }
                }
            }
            text += strings[l];
            return text;
        }
    }, {
        key: 'commit',
        value: function commit() {
            if (this.dirty) {
                this.dirty = false;
                this.element.setAttribute(this.name, this._getValue());
            }
        }
    }]);

    return AttributeCommitter;
}();

var AttributePart = exports.AttributePart = function () {
    function AttributePart(comitter) {
        _classCallCheck(this, AttributePart);

        this.value = undefined;
        this.committer = comitter;
    }

    _createClass(AttributePart, [{
        key: 'setValue',
        value: function setValue(value) {
            if (value !== _part.noChange && (!isPrimitive(value) || value !== this.value)) {
                this.value = value;
                // If the value is a not a directive, dirty the committer so that it'll
                // call setAttribute. If the value is a directive, it'll dirty the
                // committer if it calls setValue().
                if (!(0, _directive.isDirective)(value)) {
                    this.committer.dirty = true;
                }
            }
        }
    }, {
        key: 'commit',
        value: function commit() {
            while ((0, _directive.isDirective)(this.value)) {
                var directive = this.value;
                this.value = _part.noChange;
                directive(this);
            }
            if (this.value === _part.noChange) {
                return;
            }
            this.committer.commit();
        }
    }]);

    return AttributePart;
}();

var NodePart = exports.NodePart = function () {
    function NodePart(options) {
        _classCallCheck(this, NodePart);

        this.value = undefined;
        this._pendingValue = undefined;
        this.options = options;
    }
    /**
     * Inserts this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    _createClass(NodePart, [{
        key: 'appendInto',
        value: function appendInto(container) {
            this.startNode = container.appendChild((0, _template.createMarker)());
            this.endNode = container.appendChild((0, _template.createMarker)());
        }
        /**
         * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
         * its next sibling must be static, unchanging nodes such as those that appear
         * in a literal section of a template.
         *
         * This part must be empty, as its contents are not automatically moved.
         */

    }, {
        key: 'insertAfterNode',
        value: function insertAfterNode(ref) {
            this.startNode = ref;
            this.endNode = ref.nextSibling;
        }
        /**
         * Appends this part into a parent part.
         *
         * This part must be empty, as its contents are not automatically moved.
         */

    }, {
        key: 'appendIntoPart',
        value: function appendIntoPart(part) {
            part._insert(this.startNode = (0, _template.createMarker)());
            part._insert(this.endNode = (0, _template.createMarker)());
        }
        /**
         * Appends this part after `ref`
         *
         * This part must be empty, as its contents are not automatically moved.
         */

    }, {
        key: 'insertAfterPart',
        value: function insertAfterPart(ref) {
            ref._insert(this.startNode = (0, _template.createMarker)());
            this.endNode = ref.endNode;
            ref.endNode = this.startNode;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            this._pendingValue = value;
        }
    }, {
        key: 'commit',
        value: function commit() {
            while ((0, _directive.isDirective)(this._pendingValue)) {
                var directive = this._pendingValue;
                this._pendingValue = _part.noChange;
                directive(this);
            }
            var value = this._pendingValue;
            if (value === _part.noChange) {
                return;
            }
            if (isPrimitive(value)) {
                if (value !== this.value) {
                    this._commitText(value);
                }
            } else if (value instanceof _templateResult.TemplateResult) {
                this._commitTemplateResult(value);
            } else if (value instanceof Node) {
                this._commitNode(value);
            } else if (Array.isArray(value) || value[Symbol.iterator]) {
                this._commitIterable(value);
            } else {
                // Fallback, will render the string representation
                this._commitText(value);
            }
        }
    }, {
        key: '_insert',
        value: function _insert(node) {
            this.endNode.parentNode.insertBefore(node, this.endNode);
        }
    }, {
        key: '_commitNode',
        value: function _commitNode(value) {
            if (this.value === value) {
                return;
            }
            this.clear();
            this._insert(value);
            this.value = value;
        }
    }, {
        key: '_commitText',
        value: function _commitText(value) {
            var node = this.startNode.nextSibling;
            value = value == null ? '' : value;
            if (node === this.endNode.previousSibling && node.nodeType === Node.TEXT_NODE) {
                // If we only have a single text node between the markers, we can just
                // set its value, rather than replacing it.
                // TODO(justinfagnani): Can we just check if this.value is primitive?
                node.textContent = value;
            } else {
                this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
            }
            this.value = value;
        }
    }, {
        key: '_commitTemplateResult',
        value: function _commitTemplateResult(value) {
            var template = this.options.templateFactory(value);
            if (this.value && this.value.template === template) {
                this.value.update(value.values);
            } else {
                // Make sure we propagate the template processor from the TemplateResult
                // so that we use its syntax extension, etc. The template factory comes
                // from the render function options so that it can control template
                // caching and preprocessing.
                var instance = new _templateInstance.TemplateInstance(template, value.processor, this.options);
                var fragment = instance._clone();
                instance.update(value.values);
                this._commitNode(fragment);
                this.value = instance;
            }
        }
    }, {
        key: '_commitIterable',
        value: function _commitIterable(value) {
            // For an Iterable, we create a new InstancePart per item, then set its
            // value to the item. This is a little bit of overhead for every item in
            // an Iterable, but it lets us recurse easily and efficiently update Arrays
            // of TemplateResults that will be commonly returned from expressions like:
            // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
            // If _value is an array, then the previous render was of an
            // iterable and _value will contain the NodeParts from the previous
            // render. If _value is not an array, clear this part and make a new
            // array for NodeParts.
            if (!Array.isArray(this.value)) {
                this.value = [];
                this.clear();
            }
            // Lets us keep track of how many items we stamped so we can clear leftover
            // items from a previous render
            var itemParts = this.value;
            var partIndex = 0;
            var itemPart = void 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    // Try to reuse an existing part
                    itemPart = itemParts[partIndex];
                    // If no existing part, create a new one
                    if (itemPart === undefined) {
                        itemPart = new NodePart(this.options);
                        itemParts.push(itemPart);
                        if (partIndex === 0) {
                            itemPart.appendIntoPart(this);
                        } else {
                            itemPart.insertAfterPart(itemParts[partIndex - 1]);
                        }
                    }
                    itemPart.setValue(item);
                    itemPart.commit();
                    partIndex++;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (partIndex < itemParts.length) {
                // Truncate the parts array so _value reflects the current state
                itemParts.length = partIndex;
                this.clear(itemPart && itemPart.endNode);
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            var startNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;

            (0, _dom.removeNodes)(this.startNode.parentNode, startNode.nextSibling, this.endNode);
        }
    }]);

    return NodePart;
}();
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */


var BooleanAttributePart = exports.BooleanAttributePart = function () {
    function BooleanAttributePart(element, name, strings) {
        _classCallCheck(this, BooleanAttributePart);

        this.value = undefined;
        this._pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }

    _createClass(BooleanAttributePart, [{
        key: 'setValue',
        value: function setValue(value) {
            this._pendingValue = value;
        }
    }, {
        key: 'commit',
        value: function commit() {
            while ((0, _directive.isDirective)(this._pendingValue)) {
                var directive = this._pendingValue;
                this._pendingValue = _part.noChange;
                directive(this);
            }
            if (this._pendingValue === _part.noChange) {
                return;
            }
            var value = !!this._pendingValue;
            if (this.value !== value) {
                if (value) {
                    this.element.setAttribute(this.name, '');
                } else {
                    this.element.removeAttribute(this.name);
                }
            }
            this.value = value;
            this._pendingValue = _part.noChange;
        }
    }]);

    return BooleanAttributePart;
}();
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */


var PropertyCommitter = exports.PropertyCommitter = function (_AttributeCommitter) {
    _inherits(PropertyCommitter, _AttributeCommitter);

    function PropertyCommitter(element, name, strings) {
        _classCallCheck(this, PropertyCommitter);

        var _this = _possibleConstructorReturn(this, (PropertyCommitter.__proto__ || Object.getPrototypeOf(PropertyCommitter)).call(this, element, name, strings));

        _this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
        return _this;
    }

    _createClass(PropertyCommitter, [{
        key: '_createPart',
        value: function _createPart() {
            return new PropertyPart(this);
        }
    }, {
        key: '_getValue',
        value: function _getValue() {
            if (this.single) {
                return this.parts[0].value;
            }
            return _get(PropertyCommitter.prototype.__proto__ || Object.getPrototypeOf(PropertyCommitter.prototype), '_getValue', this).call(this);
        }
    }, {
        key: 'commit',
        value: function commit() {
            if (this.dirty) {
                this.dirty = false;
                this.element[this.name] = this._getValue();
            }
        }
    }]);

    return PropertyCommitter;
}(AttributeCommitter);

var PropertyPart = exports.PropertyPart = function (_AttributePart) {
    _inherits(PropertyPart, _AttributePart);

    function PropertyPart() {
        _classCallCheck(this, PropertyPart);

        return _possibleConstructorReturn(this, (PropertyPart.__proto__ || Object.getPrototypeOf(PropertyPart)).apply(this, arguments));
    }

    return PropertyPart;
}(AttributePart);
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.


var eventOptionsSupported = false;
try {
    var options = {
        get capture() {
            eventOptionsSupported = true;
            return false;
        }
    };
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
} catch (_e) {}

var EventPart = exports.EventPart = function () {
    function EventPart(element, eventName, eventContext) {
        var _this3 = this;

        _classCallCheck(this, EventPart);

        this.value = undefined;
        this._pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this._boundHandleEvent = function (e) {
            return _this3.handleEvent(e);
        };
    }

    _createClass(EventPart, [{
        key: 'setValue',
        value: function setValue(value) {
            this._pendingValue = value;
        }
    }, {
        key: 'commit',
        value: function commit() {
            while ((0, _directive.isDirective)(this._pendingValue)) {
                var directive = this._pendingValue;
                this._pendingValue = _part.noChange;
                directive(this);
            }
            if (this._pendingValue === _part.noChange) {
                return;
            }
            var newListener = this._pendingValue;
            var oldListener = this.value;
            var shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
            var shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
            if (shouldRemoveListener) {
                this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
            }
            if (shouldAddListener) {
                this._options = getOptions(newListener);
                this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
            }
            this.value = newListener;
            this._pendingValue = _part.noChange;
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(event) {
            if (typeof this.value === 'function') {
                this.value.call(this.eventContext || this.element, event);
            } else {
                this.value.handleEvent(event);
            }
        }
    }]);

    return EventPart;
}();
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.


var getOptions = function getOptions(o) {
    return o && (eventOptionsSupported ? { capture: o.capture, passive: o.passive, once: o.once } : o.capture);
};


},{"./directive.js":5,"./dom.js":6,"./part.js":7,"./template-instance.js":11,"./template-result.js":12,"./template.js":13}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.parts = undefined;

var _dom = require('./dom.js');

var _parts = require('./parts.js');

var _templateFactory = require('./template-factory.js');

var parts = exports.parts = new WeakMap();
/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result a TemplateResult created by evaluating a template tag like
 *     `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var render = exports.render = function render(result, container, options) {
  var part = parts.get(container);
  if (part === undefined) {
    (0, _dom.removeNodes)(container, container.firstChild);
    parts.set(container, part = new _parts.NodePart(Object.assign({ templateFactory: _templateFactory.templateFactory }, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};


},{"./dom.js":6,"./parts.js":8,"./template-factory.js":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.templateCaches = undefined;
exports.templateFactory = templateFactory;

var _template = require('./template.js');

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    var templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    var template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    var key = result.strings.join(_template.marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new _template.Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
} /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
var templateCaches = exports.templateCaches = new Map();


},{"./template.js":13}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TemplateInstance = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This code may only be used under the BSD style license found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/LICENSE.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The complete set of authors may be found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/AUTHORS.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The complete set of contributors may be found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/CONTRIBUTORS.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Code distributed by Google as part of the polymer project is also
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * subject to an additional IP rights grant found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/PATENTS.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _dom = require('./dom.js');

var _template = require('./template.js');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
var TemplateInstance = exports.TemplateInstance = function () {
    function TemplateInstance(template, processor, options) {
        _classCallCheck(this, TemplateInstance);

        this._parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }

    _createClass(TemplateInstance, [{
        key: 'update',
        value: function update(values) {
            var i = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var part = _step.value;

                    if (part !== undefined) {
                        part.setValue(values[i]);
                    }
                    i++;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._parts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _part = _step2.value;

                    if (_part !== undefined) {
                        _part.commit();
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: '_clone',
        value: function _clone() {
            var _this = this;

            // When using the Custom Elements polyfill, clone the node, rather than
            // importing it, to keep the fragment in the template's document. This
            // leaves the fragment inert so custom elements won't upgrade and
            // potentially modify their contents by creating a polyfilled ShadowRoot
            // while we traverse the tree.
            var fragment = _dom.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
            var parts = this.template.parts;
            var partIndex = 0;
            var nodeIndex = 0;
            var _prepareInstance = function _prepareInstance(fragment) {
                // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
                // null
                var walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
                var node = walker.nextNode();
                // Loop through all the nodes and parts of a template
                while (partIndex < parts.length && node !== null) {
                    var part = parts[partIndex];
                    // Consecutive Parts may have the same node index, in the case of
                    // multiple bound attributes on an element. So each iteration we either
                    // increment the nodeIndex, if we aren't on a node with a part, or the
                    // partIndex if we are. By not incrementing the nodeIndex when we find a
                    // part, we allow for the next part to be associated with the current
                    // node if neccessasry.
                    if (!(0, _template.isTemplatePartActive)(part)) {
                        _this._parts.push(undefined);
                        partIndex++;
                    } else if (nodeIndex === part.index) {
                        if (part.type === 'node') {
                            var _part2 = _this.processor.handleTextExpression(_this.options);
                            _part2.insertAfterNode(node);
                            _this._parts.push(_part2);
                        } else {
                            var _parts;

                            (_parts = _this._parts).push.apply(_parts, _toConsumableArray(_this.processor.handleAttributeExpressions(node, part.name, part.strings, _this.options)));
                        }
                        partIndex++;
                    } else {
                        nodeIndex++;
                        if (node.nodeName === 'TEMPLATE') {
                            _prepareInstance(node.content);
                        }
                        node = walker.nextNode();
                    }
                }
            };
            _prepareInstance(fragment);
            if (_dom.isCEPolyfill) {
                document.adoptNode(fragment);
                customElements.upgrade(fragment);
            }
            return fragment;
        }
    }]);

    return TemplateInstance;
}();


},{"./dom.js":6,"./template.js":13}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SVGTemplateResult = exports.TemplateResult = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This code may only be used under the BSD style license found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/LICENSE.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The complete set of authors may be found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/AUTHORS.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The complete set of contributors may be found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/CONTRIBUTORS.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Code distributed by Google as part of the polymer project is also
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * subject to an additional IP rights grant found at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * http://polymer.github.io/PATENTS.txt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _dom = require('./dom.js');

var _template = require('./template.js');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
var TemplateResult = exports.TemplateResult = function () {
    function TemplateResult(strings, values, type, processor) {
        _classCallCheck(this, TemplateResult);

        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */


    _createClass(TemplateResult, [{
        key: 'getHTML',
        value: function getHTML() {
            var endIndex = this.strings.length - 1;
            var html = '';
            for (var i = 0; i < endIndex; i++) {
                var s = this.strings[i];
                // This replace() call does two things:
                // 1) Appends a suffix to all bound attribute names to opt out of special
                // attribute value parsing that IE11 and Edge do, like for style and
                // many SVG attributes. The Template class also appends the same suffix
                // when looking up attributes to creat Parts.
                // 2) Adds an unquoted-attribute-safe marker for the first expression in
                // an attribute. Subsequent attribute expressions will use node markers,
                // and this is safe since attributes with multiple expressions are
                // guaranteed to be quoted.
                var addedMarker = false;
                html += s.replace(_template.lastAttributeNameRegex, function (_match, whitespace, name, value) {
                    addedMarker = true;
                    return whitespace + name + _template.boundAttributeSuffix + value + _template.marker;
                });
                if (!addedMarker) {
                    html += _template.nodeMarker;
                }
            }
            return html + this.strings[endIndex];
        }
    }, {
        key: 'getTemplateElement',
        value: function getTemplateElement() {
            var template = document.createElement('template');
            template.innerHTML = this.getHTML();
            return template;
        }
    }]);

    return TemplateResult;
}();
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTMl in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */


var SVGTemplateResult = exports.SVGTemplateResult = function (_TemplateResult) {
    _inherits(SVGTemplateResult, _TemplateResult);

    function SVGTemplateResult() {
        _classCallCheck(this, SVGTemplateResult);

        return _possibleConstructorReturn(this, (SVGTemplateResult.__proto__ || Object.getPrototypeOf(SVGTemplateResult)).apply(this, arguments));
    }

    _createClass(SVGTemplateResult, [{
        key: 'getHTML',
        value: function getHTML() {
            return '<svg>' + _get(SVGTemplateResult.prototype.__proto__ || Object.getPrototypeOf(SVGTemplateResult.prototype), 'getHTML', this).call(this) + '</svg>';
        }
    }, {
        key: 'getTemplateElement',
        value: function getTemplateElement() {
            var template = _get(SVGTemplateResult.prototype.__proto__ || Object.getPrototypeOf(SVGTemplateResult.prototype), 'getTemplateElement', this).call(this);
            var content = template.content;
            var svgElement = content.firstChild;
            content.removeChild(svgElement);
            (0, _dom.reparentNodes)(content, svgElement.firstChild);
            return template;
        }
    }]);

    return SVGTemplateResult;
}(TemplateResult);


},{"./dom.js":6,"./template.js":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
var marker = exports.marker = '{{lit-' + String(Math.random()).slice(2) + '}}';
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
var nodeMarker = exports.nodeMarker = '<!--' + marker + '-->';
var markerRegex = exports.markerRegex = new RegExp(marker + '|' + nodeMarker);
/**
 * Suffix appended to all bound attribute names.
 */
var boundAttributeSuffix = exports.boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */

var Template = exports.Template = function Template(result, element) {
    var _this = this;

    _classCallCheck(this, Template);

    this.parts = [];
    this.element = element;
    var index = -1;
    var partIndex = 0;
    var nodesToRemove = [];
    var _prepareTemplate = function _prepareTemplate(template) {
        var content = template.content;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
        // null
        var walker = document.createTreeWalker(content, 133 /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT |
                                                            NodeFilter.SHOW_TEXT */, null, false);
        // The actual previous node, accounting for removals: if a node is removed
        // it will never be the previousNode.
        var previousNode = void 0;
        // Used to set previousNode at the top of the loop.
        var currentNode = void 0;
        while (walker.nextNode()) {
            index++;
            previousNode = currentNode;
            var node = currentNode = walker.currentNode;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                    if (node.hasAttributes()) {
                        var attributes = node.attributes;
                        // Per
                        // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                        // attributes are not guaranteed to be returned in document order.
                        // In particular, Edge/IE can return them out of order, so we cannot
                        // assume a correspondance between part index and attribute index.
                        var count = 0;
                        for (var i = 0; i < attributes.length; i++) {
                            if (attributes[i].value.indexOf(marker) >= 0) {
                                count++;
                            }
                        }
                        while (count-- > 0) {
                            // Get the template literal section leading up to the first
                            // expression in this attribute
                            var stringForPart = result.strings[partIndex];
                            // Find the attribute name
                            var name = lastAttributeNameRegex.exec(stringForPart)[2];
                            // Find the corresponding attribute
                            // All bound attributes have had a suffix added in
                            // TemplateResult#getHTML to opt out of special attribute
                            // handling. To look up the attribute value we also need to add
                            // the suffix.
                            var attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                            var attributeValue = node.getAttribute(attributeLookupName);
                            var strings = attributeValue.split(markerRegex);
                            _this.parts.push({ type: 'attribute', index: index, name: name, strings: strings });
                            node.removeAttribute(attributeLookupName);
                            partIndex += strings.length - 1;
                        }
                    }
                    if (node.tagName === 'TEMPLATE') {
                        _prepareTemplate(node);
                    }
                } else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                    var nodeValue = node.nodeValue;
                    if (nodeValue.indexOf(marker) < 0) {
                        continue;
                    }
                    var parent = node.parentNode;
                    var _strings = nodeValue.split(markerRegex);
                    var lastIndex = _strings.length - 1;
                    // We have a part for each match found
                    partIndex += lastIndex;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (var _i = 0; _i < lastIndex; _i++) {
                        parent.insertBefore(_strings[_i] === '' ? createMarker() : document.createTextNode(_strings[_i]), node);
                        _this.parts.push({ type: 'node', index: index++ });
                    }
                    parent.insertBefore(_strings[lastIndex] === '' ? createMarker() : document.createTextNode(_strings[lastIndex]), node);
                    nodesToRemove.push(node);
                } else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                    if (node.nodeValue === marker) {
                        var _parent = node.parentNode;
                        // Add a new marker node to be the startNode of the Part if any of
                        // the following are true:
                        //  * We don't have a previousSibling
                        //  * previousSibling is being removed (thus it's not the
                        //    `previousNode`)
                        //  * previousSibling is not a Text node
                        //
                        // TODO(justinfagnani): We should be able to use the previousNode
                        // here as the marker node and reduce the number of extra nodes we
                        // add to a template. See
                        // https://github.com/PolymerLabs/lit-html/issues/147
                        var previousSibling = node.previousSibling;
                        if (previousSibling === null || previousSibling !== previousNode || previousSibling.nodeType !== Node.TEXT_NODE) {
                            _parent.insertBefore(createMarker(), node);
                        } else {
                            index--;
                        }
                        _this.parts.push({ type: 'node', index: index++ });
                        nodesToRemove.push(node);
                        // If we don't have a nextSibling add a marker node.
                        // We don't have to check if the next node is going to be removed,
                        // because that node will induce a new marker if so.
                        if (node.nextSibling === null) {
                            _parent.insertBefore(createMarker(), node);
                        } else {
                            index--;
                        }
                        currentNode = previousNode;
                        partIndex++;
                    } else {
                        var _i2 = -1;
                        while ((_i2 = node.nodeValue.indexOf(marker, _i2 + 1)) !== -1) {
                            // Comment node has a binding marker inside, make an inactive part
                            // The binding won't work, but subsequent bindings will
                            // TODO (justinfagnani): consider whether it's even worth it to
                            // make bindings in comments work
                            _this.parts.push({ type: 'node', index: -1 });
                        }
                    }
                }
        }
    };
    _prepareTemplate(element);
    // Remove text binding nodes after the walk to not disturb the TreeWalker
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = nodesToRemove[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var n = _step.value;

            n.parentNode.removeChild(n);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

var isTemplatePartActive = exports.isTemplatePartActive = function isTemplatePartActive(part) {
    return part.index !== -1;
};
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
var createMarker = exports.createMarker = function createMarker() {
    return document.createComment('');
};
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#attributes-0
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-character
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
var lastAttributeNameRegex = exports.lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;


},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg = exports.html = exports.Template = exports.isTemplatePartActive = exports.createMarker = exports.TemplateResult = exports.SVGTemplateResult = exports.TemplateInstance = exports.templateFactory = exports.templateCaches = exports.render = exports.parts = exports.PropertyPart = exports.PropertyCommitter = exports.NodePart = exports.isPrimitive = exports.EventPart = exports.BooleanAttributePart = exports.AttributePart = exports.AttributeCommitter = exports.noChange = exports.reparentNodes = exports.removeNodes = exports.isDirective = exports.directive = exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = undefined;

var _defaultTemplateProcessor = require('./lib/default-template-processor.js');

Object.defineProperty(exports, 'DefaultTemplateProcessor', {
  enumerable: true,
  get: function get() {
    return _defaultTemplateProcessor.DefaultTemplateProcessor;
  }
});
Object.defineProperty(exports, 'defaultTemplateProcessor', {
  enumerable: true,
  get: function get() {
    return _defaultTemplateProcessor.defaultTemplateProcessor;
  }
});

var _directive = require('./lib/directive.js');

Object.defineProperty(exports, 'directive', {
  enumerable: true,
  get: function get() {
    return _directive.directive;
  }
});
Object.defineProperty(exports, 'isDirective', {
  enumerable: true,
  get: function get() {
    return _directive.isDirective;
  }
});

var _dom = require('./lib/dom.js');

Object.defineProperty(exports, 'removeNodes', {
  enumerable: true,
  get: function get() {
    return _dom.removeNodes;
  }
});
Object.defineProperty(exports, 'reparentNodes', {
  enumerable: true,
  get: function get() {
    return _dom.reparentNodes;
  }
});

var _part = require('./lib/part.js');

Object.defineProperty(exports, 'noChange', {
  enumerable: true,
  get: function get() {
    return _part.noChange;
  }
});

var _parts = require('./lib/parts.js');

Object.defineProperty(exports, 'AttributeCommitter', {
  enumerable: true,
  get: function get() {
    return _parts.AttributeCommitter;
  }
});
Object.defineProperty(exports, 'AttributePart', {
  enumerable: true,
  get: function get() {
    return _parts.AttributePart;
  }
});
Object.defineProperty(exports, 'BooleanAttributePart', {
  enumerable: true,
  get: function get() {
    return _parts.BooleanAttributePart;
  }
});
Object.defineProperty(exports, 'EventPart', {
  enumerable: true,
  get: function get() {
    return _parts.EventPart;
  }
});
Object.defineProperty(exports, 'isPrimitive', {
  enumerable: true,
  get: function get() {
    return _parts.isPrimitive;
  }
});
Object.defineProperty(exports, 'NodePart', {
  enumerable: true,
  get: function get() {
    return _parts.NodePart;
  }
});
Object.defineProperty(exports, 'PropertyCommitter', {
  enumerable: true,
  get: function get() {
    return _parts.PropertyCommitter;
  }
});
Object.defineProperty(exports, 'PropertyPart', {
  enumerable: true,
  get: function get() {
    return _parts.PropertyPart;
  }
});

var _render = require('./lib/render.js');

Object.defineProperty(exports, 'parts', {
  enumerable: true,
  get: function get() {
    return _render.parts;
  }
});
Object.defineProperty(exports, 'render', {
  enumerable: true,
  get: function get() {
    return _render.render;
  }
});

var _templateFactory = require('./lib/template-factory.js');

Object.defineProperty(exports, 'templateCaches', {
  enumerable: true,
  get: function get() {
    return _templateFactory.templateCaches;
  }
});
Object.defineProperty(exports, 'templateFactory', {
  enumerable: true,
  get: function get() {
    return _templateFactory.templateFactory;
  }
});

var _templateInstance = require('./lib/template-instance.js');

Object.defineProperty(exports, 'TemplateInstance', {
  enumerable: true,
  get: function get() {
    return _templateInstance.TemplateInstance;
  }
});

var _templateResult = require('./lib/template-result.js');

Object.defineProperty(exports, 'SVGTemplateResult', {
  enumerable: true,
  get: function get() {
    return _templateResult.SVGTemplateResult;
  }
});
Object.defineProperty(exports, 'TemplateResult', {
  enumerable: true,
  get: function get() {
    return _templateResult.TemplateResult;
  }
});

var _template = require('./lib/template.js');

Object.defineProperty(exports, 'createMarker', {
  enumerable: true,
  get: function get() {
    return _template.createMarker;
  }
});
Object.defineProperty(exports, 'isTemplatePartActive', {
  enumerable: true,
  get: function get() {
    return _template.isTemplatePartActive;
  }
});
Object.defineProperty(exports, 'Template', {
  enumerable: true,
  get: function get() {
    return _template.Template;
  }
});

/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
var html = exports.html = function html(strings) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  return new _templateResult.TemplateResult(strings, values, 'html', _defaultTemplateProcessor.defaultTemplateProcessor);
};
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
var svg = exports.svg = function svg(strings) {
  for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    values[_key2 - 1] = arguments[_key2];
  }

  return new _templateResult.SVGTemplateResult(strings, values, 'svg', _defaultTemplateProcessor.defaultTemplateProcessor);
};


},{"./lib/default-template-processor.js":4,"./lib/directive.js":5,"./lib/dom.js":6,"./lib/part.js":7,"./lib/parts.js":8,"./lib/render.js":9,"./lib/template-factory.js":10,"./lib/template-instance.js":11,"./lib/template-result.js":12,"./lib/template.js":13}],15:[function(require,module,exports){
"use strict";

// Reflect.constructor polyfill for IE11 support of standard web components
(function () {
    'use strict';

    if (!!window.Reflect) return;

    window.Reflect = {
        construct: function construct(target, args, newTarget) {
            var handler = new WeakMap().get(target);
            if (handler !== undefined) return handler.construct(handler.target, args, newTarget);

            if (typeof target !== "function") throw new TypeError("target must be a function: " + target);

            if (newTarget === undefined || newTarget === target) return new (Function.prototype.bind.apply(target, [null].concat(args)))();else {
                if (typeof newTarget !== "function") throw new TypeError("new target must be a function: " + target);

                var proto = newTarget.prototype;
                var instance = Object(proto) === proto ? Object.create(proto) : {};
                var result = Function.prototype.apply.call(target, instance, args);

                return Object(result) === result ? result : instance;
            }
        }
    };
})();

},{}],16:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n            <div id="hello-world-component">\n                <style>\n                    /* Encapsulate all style to containing element for IE11 support */\n                    #hello-world-component p { display: block; border: 2px solid red; padding: 20px; color: red; }\n                </style>\n\n                <div>\n                    <p>\n                        <slot name="main">Hello</slot>\n                        <br/>\n                        <br/>\n                        <strong>FOO:</strong> ', '\n                        <br/>\n                        <strong>BAR:</strong> ', '\n                        <br/>\n                        <br/>\n                        <slot name="footer">World</slot>\n                        <button>Boo</button>\n                    </p>\n                </div>\n            </div>\n        '], ['\n            <div id="hello-world-component">\n                <style>\n                    /* Encapsulate all style to containing element for IE11 support */\n                    #hello-world-component p { display: block; border: 2px solid red; padding: 20px; color: red; }\n                </style>\n\n                <div>\n                    <p>\n                        <slot name="main">Hello</slot>\n                        <br/>\n                        <br/>\n                        <strong>FOO:</strong> ', '\n                        <br/>\n                        <strong>BAR:</strong> ', '\n                        <br/>\n                        <br/>\n                        <slot name="footer">World</slot>\n                        <button>Boo</button>\n                    </p>\n                </div>\n            </div>\n        ']);

var _index = require('../node_modules/custom-web-component/index.js');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * HelloWorldComponent
 * A sample Custom HTML Element, to be used in any system that is capable of outputting HTML
 * Build on Web Standards and polyfilled for legacy browsers, using a simple clean lite HTML template rendering called lit-html
 */
var HelloWorldComponent = function (_CustomHTMLElement) {
    _inherits(HelloWorldComponent, _CustomHTMLElement);

    _createClass(HelloWorldComponent, [{
        key: 'template',


        /**
         * template()
         * Return html TemplateResolver a list of observed properties, that will call propertyChanged() when mutated
         * @return {TemplateResult} Returns a HTML TemplateResult to be used for the basis of the elements DOM structure 
         */
        value: function template() {
            return (0, _index.html)(_templateObject, this.foo, this.bar);
        }

        /**
         * @static @get observedProperties()
         * Return a list of observed properties, that will call propertyChanged() when mutated
         * @return {Array} List of properties that will promote the callback to be called on mutation 
         */

    }], [{
        key: 'observedProperties',
        get: function get() {
            return ['foo', 'bar'];
        }

        /**
         * @static @get observedAttributes()
         * Return a list of observed attributes, that will call attributeChanged() when mutated
         * @return {Array} List of attributes that will promote the callback to be called on mutation 
         */

    }, {
        key: 'observedAttributes',
        get: function get() {
            return ['bar'];
        }

        /**
         * @public constructor()
         * Invoked when instantiation of class happens
         * NOTE: Call super() first!
         * NOTE: Declare local properties here... [this.__private, this._protected, this.public] 
         * NOTE: Declarations and kick starts only... no business logic here!
         */

    }]);

    function HelloWorldComponent() {
        _classCallCheck(this, HelloWorldComponent);

        var _this = _possibleConstructorReturn(this, (HelloWorldComponent.__proto__ || Object.getPrototypeOf(HelloWorldComponent)).call(this));

        _this.foo = 'FOO!!';
        _this.bar;
        return _this;
    }

    /**
     * @public connected()
     * Invoked when node is connected/added to the DOM
     */


    _createClass(HelloWorldComponent, [{
        key: 'connected',
        value: function connected() {
            console.log('connected');
        }

        /**
         * @public disconnected()
         * Invoked when node is disconnected/removed from the DOM
         */

    }, {
        key: 'disconnected',
        value: function disconnected() {
            console.log('disconnected');
        }

        /**
         * @public propertyChanged()
         * Invoked when an observed instantiated property has changed
         * @param {String} property The name of the property that changed 
         * @param {*} oldValue The old value before hte change 
         * @param {*} newValue The new value after the change
         */

    }, {
        key: 'propertyChanged',
        value: function propertyChanged(property, oldValue, newValue) {
            console.log(this.tagName, 'propertyChanged', property, oldValue, newValue);
        }

        /**
         * @public attributeChanged()
         * Invoked when an observed node attribute has changed
         * @param {String} attribute The name of the attribute that changed 
         * @param {*} oldValue The old value before hte change 
         * @param {*} newValue The new value after the change
         */

    }, {
        key: 'attributeChanged',
        value: function attributeChanged(attribute, oldValue, newValue) {
            console.log(this.tagName, 'attributeChanged', attribute, oldValue, newValue);

            if (attribute === 'bar') this.bar = newValue;

            this.updateTemplate();
        }

        /**
         * @public update() [parent class]
         * Update the view, pushing only changes for update in shadow DOM
         */

    }, {
        key: 'templateUpdated',
        value: function templateUpdated() {
            // this.dom will return you the <div id="hello-world-component"></div> element instance of this specific instance of the web component 
            console.log(this.dom, this.tagName, 'updated');
        }
    }]);

    return HelloWorldComponent;
}(_index.CustomHTMLElement);

customElements.define('hello-world-component', HelloWorldComponent);

},{"../node_modules/custom-web-component/index.js":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5tanMiLCJub2RlX21vZHVsZXMvY3VzdG9tLXdlYi1jb21wb25lbnQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY3VzdG9tLXdlYi1jb21wb25lbnQvc3JjL0N1c3RvbUhUTUxFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9kZWZhdWx0LXRlbXBsYXRlLXByb2Nlc3Nvci5qcyIsIm5vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvZGlyZWN0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9kb20uanMiLCJub2RlX21vZHVsZXMvbGl0LWh0bWwvbGliL3BhcnQuanMiLCJub2RlX21vZHVsZXMvbGl0LWh0bWwvbGliL3BhcnRzLmpzIiwibm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9yZW5kZXIuanMiLCJub2RlX21vZHVsZXMvbGl0LWh0bWwvbGliL3RlbXBsYXRlLWZhY3RvcnkuanMiLCJub2RlX21vZHVsZXMvbGl0LWh0bWwvbGliL3RlbXBsYXRlLWluc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi90ZW1wbGF0ZS1yZXN1bHQuanMiLCJub2RlX21vZHVsZXMvbGl0LWh0bWwvbGliL3RlbXBsYXRlLmpzIiwibm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpdC1odG1sLmpzIiwibm9kZV9tb2R1bGVzL3JlZmxlY3QtY29uc3RydWN0b3IvcmVmbGVjdC1jb25zdHJ1Y3Rvci5qcyIsInNyYy9IZWxsb1dvcmxkQ29tcG9uZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFFQSxJQUFJLG1CQUFtQixTQUF2QixFQUFrQyxVQUFVLGFBQVYsQ0FBd0IsUUFBeEIsQ0FBaUMsUUFBakM7Ozs7Ozs7Ozs7QUNIbEM7Ozs7QUFDQTs7OztRQUd5QixpQixHQUFyQiwyQjtRQUNRLEksR0FBUixhOzs7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QVg7QUFDQSxjQUFLLEdBQUw7QUFKVTtBQUtiOztBQUVEOzs7Ozs7OztvQ0FJWTtBQUNSLG9CQUFRLEdBQVIsQ0FBWSxXQUFaO0FBQ0g7O0FBRUQ7Ozs7Ozs7dUNBSWU7QUFDWCxvQkFBUSxHQUFSLENBQVksY0FBWjtBQUNIOztBQUVEOzs7Ozs7Ozs7O3dDQU9nQixRLEVBQVUsUSxFQUFVLFEsRUFBVTtBQUMxQyxvQkFBUSxHQUFSLENBQVksS0FBSyxPQUFqQixFQUEwQixpQkFBMUIsRUFBNkMsUUFBN0MsRUFBdUQsUUFBdkQsRUFBaUUsUUFBakU7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozt5Q0FPaUIsUyxFQUFXLFEsRUFBVSxRLEVBQVU7QUFDNUMsb0JBQVEsR0FBUixDQUFZLEtBQUssT0FBakIsRUFBMEIsa0JBQTFCLEVBQThDLFNBQTlDLEVBQXlELFFBQXpELEVBQW1FLFFBQW5FOztBQUVBLGdCQUFJLGNBQWMsS0FBbEIsRUFBeUIsS0FBSyxHQUFMLEdBQVcsUUFBWDs7QUFFekIsaUJBQUssY0FBTDtBQUNIOztBQUVEOzs7Ozs7OzBDQUlrQjtBQUNkO0FBQ0Esb0JBQVEsR0FBUixDQUFZLEtBQUssR0FBakIsRUFBc0IsS0FBSyxPQUEzQixFQUFvQyxTQUFwQztBQUNIOzs7O0VBOUc2Qix3Qjs7QUFpSGxDLGVBQWUsTUFBZixDQUFzQix1QkFBdEIsRUFBK0MsbUJBQS9DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0ICcuL25vZGVfbW9kdWxlcy9yZWZsZWN0LWNvbnN0cnVjdG9yL3JlZmxlY3QtY29uc3RydWN0b3IuanMnO1xuaW1wb3J0ICcuL3NyYy9IZWxsb1dvcmxkQ29tcG9uZW50LmpzJztcblxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc3cuanMnKTsiLCJpbXBvcnQgQ3VzdG9tSFRNTEVsZW1lbnQgZnJvbSAnLi9zcmMvQ3VzdG9tSFRNTEVsZW1lbnQuanMnXG5pbXBvcnQgeyBodG1sIH0gZnJvbSAnLi4vbGl0LWh0bWwvbGl0LWh0bWwuanMnO1xuXG5leHBvcnQge1xuICAgIEN1c3RvbUhUTUxFbGVtZW50IGFzIEN1c3RvbUhUTUxFbGVtZW50LFxuICAgIGh0bWwgYXMgaHRtbFxufSIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gJy4uLy4uL2xpdC1odG1sL2xpdC1odG1sLmpzJztcblxuLyoqXG4gKiBDdXN0b21IVE1MRWxlbWVudFxuICogQSBzYW1wbGUgZXh0ZW5zaW9uIHRvIHRoZSBiYXNpYyBIVE1MIEVsZW1lbnQgY2xhc3MsIHByb3ZpZGluZyB0ZW1wbGF0aW5nIGZvciB3ZWIgY29tcG9uZW50cyB0aHJvdWdoIHRoZSBsaXQtaHRtbCBsaWJyYXJ5XG4gKiBCdWlsZCBvbiBXZWIgU3RhbmRhcmRzLCBwb2x5ZmlsbGVkIGZvciBsZWdhY3kgYnJvd3NlcnMsIHVzaW5nIGEgc2ltcGxlIGNsZWFuIGxpdGUgSFRNTCB0ZW1wbGF0ZSByZW5kZXJpbmcgY2FsbGVkIGxpdC1odG1sXG4gKiBFeHRlbmQgdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBzaW1wbGUgSFRNTCBDdXN0b21lIEVsZW1lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tSFRNTEVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgLyoqXG5cdCAqIGNvbnN0cnVjdG9yKClcblx0ICogQ3JlYXRlIGEgc2ltcGxlIEhUTUwgZWxlbWVudCBhbmQgb2JzZXJ2ZSBjaGFuZ2VzIHRvIHByb3BlcnRpZXNcblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9fYmluZFByb3BlcnRpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBjb25uZWN0ZWRDYWxsYmFjaygpXG5cdCAqIENhdGNoIHRoZSBzdGFuZGFyZCBjb25uZWN0ZWQgY2FsbGJhY2ssIHJlbmRlcmluZyB0aGUgdGVtcGxhdGUgb24gaW5zdGFudGlhdGlvblxuXHQgKiBmb2xsb3dzIHVwIGJ5IGJ1YmJsaW5nIHRoZSBjYWxsYmFjayB1cCB0byBjb25uZWN0ZWQoKSBvbiBjaGlsZFxuXHQgKi9cblx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0aWYgKCF0aGlzLmlzQ29ubmVjdGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmNvbm5lY3RlZCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5jb25uZWN0ZWQuY2FsbCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIGRpc2Nvbm5lY3RlZENhbGxiYWNrKClcblx0ICogQ2F0Y2ggdGhlIHN0YW5kYXJkIGRpc2Nvbm5lY3RlZCBjYWxsYmFja1xuXHQgKiBmb2xsb3dzIHVwIGJ5IGJ1YmJsaW5nIHRoZSBjYWxsYmFjayB1cCB0byBkaXNjb25uZWN0ZWQoKSBvbiBjaGlsZFxuXHQgKi9cblx0ZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0aWYgKHRoaXMuaXNDb25uZWN0ZWQpIHJldHVybjtcblx0XHRpZiAodHlwZW9mIHRoaXMuZGlzY29ubmVjdGVkID09PSAnZnVuY3Rpb24nKSB0aGlzLmRpc2Nvbm5lY3RlZC5jYWxsKCk7XG5cdH1cblxuXHQvKipcblx0ICogYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKClcblx0ICogQ2F0Y2ggdGhlIHN0YW5kYXJkIGF0dHJpYnV0ZUNoYW5nZWQgY2FsbGJhY2tcblx0ICogZm9sbG93cyB1cCBieSBidWJibGluZyB0aGUgY2FsbGJhY2sgdXAgdG8gYXR0cmlidXRlQ2hhbmdlZCgpIG9uIGNoaWxkIGZvciBhdHRyaWJ1dGVzIHN1YnNjcmliZWQgdG9vXG5cdCAqL1xuXHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMuYXR0cmlidXRlQ2hhbmdlZCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5hdHRyaWJ1dGVDaGFuZ2VkLmNhbGwodGhpcywgYXR0cmlidXRlLCBvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIF9fYmluZFByb3BlcnRpZXMoKVxuXHQgKiBJbnRlcm5hbCBtZXRob2QgdG8gYmluZCBwcm9wZXJ0aWVzIGFuZCBjcmVhdGUgYSBwcm9wZXJ0eUNoYW5nZWQgY2FsbGJhY2ssIGFsc28gZXhwb3NpbmcgYW4gZXZlbnQgb2YgdGhlIHNhbWUgbmFtZVxuXHQgKiB1c2UgdGhpcyBjYWxsYmFjayBvciB3YXRjaCB0aGUgZXZlbnQgdG8gYmUgbm90aWZpZWQgb2YgcHJvcGVydHkgY2hhbmdlcyB0aGF0IGFyZSBzdWJzY3JpYmVkIHRvb1xuXHQgKi9cblx0X19iaW5kUHJvcGVydGllcygpIHtcblx0XHRpZiAoIXRoaXMuY29uc3RydWN0b3Iub2JzZXJ2ZWRQcm9wZXJ0aWVzIHx8ICF0aGlzLmNvbnN0cnVjdG9yLm9ic2VydmVkUHJvcGVydGllcy5sZW5ndGgpIHJldHVybjtcblxuXHRcdHRoaXMuX19wcm9wZXJ0aWVzID0ge307XG5cblx0XHRmb3IgKGNvbnN0IGlkeCBpbiB0aGlzLmNvbnN0cnVjdG9yLm9ic2VydmVkUHJvcGVydGllcykge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHRoaXMuY29uc3RydWN0b3Iub2JzZXJ2ZWRQcm9wZXJ0aWVzW2lkeF0sIHtcblx0XHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9fcHJvcGVydGllc1t0aGlzLmNvbnN0cnVjdG9yLm9ic2VydmVkUHJvcGVydGllc1tpZHhdXTsgfSxcblx0XHRcdFx0c2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0XHRsZXQgb2xkVmFsdWUgPSB0aGlzLl9fcHJvcGVydGllc1t0aGlzLmNvbnN0cnVjdG9yLm9ic2VydmVkUHJvcGVydGllc1tpZHhdXTtcblx0XHRcdFx0XHR0aGlzLl9fcHJvcGVydGllc1t0aGlzLmNvbnN0cnVjdG9yLm9ic2VydmVkUHJvcGVydGllc1tpZHhdXSA9IHZhbHVlO1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eUNoYW5nZWQgPT09ICdmdW5jdGlvbicpIHRoaXMucHJvcGVydHlDaGFuZ2VkLmNhbGwodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5vYnNlcnZlZFByb3BlcnRpZXNbaWR4XSwgdmFsdWUpO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3Byb3BlcnR5Y2hhbmdlZCcsIHsgJ2RldGFpbCc6IHsgJ3Byb3BlcnR5JzogdGhpcy5jb25zdHJ1Y3Rvci5vYnNlcnZlZFByb3BlcnRpZXNbaWR4XSwgJ29sZFZhbHVlJzogb2xkVmFsdWUsICduZXdWYWx1ZSc6IHZhbHVlIH0gfSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogdXBkYXRlKClcblx0ICogSW5mb3JtIHRoZSB0ZW1wbGF0ZSBvZiBjaGFuZ2VzIHRvIHByb3BlcnRpZXMgYnkgdGVsbGluZyBpdCB0byB1cGRhdGVcblx0ICogdXNlcyBsaXQtaHRtbCB0byBhY3RpdmVseSByZW5kZXIgYSBET00gdGVtcGxhdGUgYW5kIG9ubHkgY2hhbmdlIHN0dWZmIHRoYXQgbmVlZHMgY2hhbmdpbmchXG5cdCAqL1xuXHR1cGRhdGUoKSB7XG5cdFx0aWYgKCF0aGlzLmlzQ29ubmVjdGVkKSByZXR1cm47XG5cdFx0cmVuZGVyKHRoaXMudGVtcGxhdGUoKSwgdGhpcy5zaGFkb3dSb290ID8gdGhpcy5zaGFkb3dSb290IDogdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSkgKTtcblx0fVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuaW1wb3J0IHsgQXR0cmlidXRlQ29tbWl0dGVyLCBCb29sZWFuQXR0cmlidXRlUGFydCwgRXZlbnRQYXJ0LCBOb2RlUGFydCwgUHJvcGVydHlDb21taXR0ZXIgfSBmcm9tICcuL3BhcnRzLmpzJztcbi8qKlxuICogQ3JlYXRlcyBQYXJ0cyB3aGVuIGEgdGVtcGxhdGUgaXMgaW5zdGFudGlhdGVkLlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgcGFydHMgZm9yIGFuIGF0dHJpYnV0ZS1wb3NpdGlvbiBiaW5kaW5nLCBnaXZlbiB0aGUgZXZlbnQsIGF0dHJpYnV0ZVxuICAgICAqIG5hbWUsIGFuZCBzdHJpbmcgbGl0ZXJhbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCBjb250YWluaW5nIHRoZSBiaW5kaW5nXG4gICAgICogQHBhcmFtIG5hbWUgIFRoZSBhdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSBzdHJpbmdzIFRoZSBzdHJpbmcgbGl0ZXJhbHMuIFRoZXJlIGFyZSBhbHdheXMgYXQgbGVhc3QgdHdvIHN0cmluZ3MsXG4gICAgICogICBldmVudCBmb3IgZnVsbHktY29udHJvbGxlZCBiaW5kaW5ncyB3aXRoIGEgc2luZ2xlIGV4cHJlc3Npb24uXG4gICAgICovXG4gICAgaGFuZGxlQXR0cmlidXRlRXhwcmVzc2lvbnMoZWxlbWVudCwgbmFtZSwgc3RyaW5ncywgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBwcmVmaXggPSBuYW1lWzBdO1xuICAgICAgICBpZiAocHJlZml4ID09PSAnLicpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbWl0dGVyID0gbmV3IFByb3BlcnR5Q29tbWl0dGVyKGVsZW1lbnQsIG5hbWUuc2xpY2UoMSksIHN0cmluZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbWl0dGVyLnBhcnRzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmVmaXggPT09ICdAJykge1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgRXZlbnRQYXJ0KGVsZW1lbnQsIG5hbWUuc2xpY2UoMSksIG9wdGlvbnMuZXZlbnRDb250ZXh0KV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZWZpeCA9PT0gJz8nKSB7XG4gICAgICAgICAgICByZXR1cm4gW25ldyBCb29sZWFuQXR0cmlidXRlUGFydChlbGVtZW50LCBuYW1lLnNsaWNlKDEpLCBzdHJpbmdzKV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29taXR0ZXIgPSBuZXcgQXR0cmlidXRlQ29tbWl0dGVyKGVsZW1lbnQsIG5hbWUsIHN0cmluZ3MpO1xuICAgICAgICByZXR1cm4gY29taXR0ZXIucGFydHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBwYXJ0cyBmb3IgYSB0ZXh0LXBvc2l0aW9uIGJpbmRpbmcuXG4gICAgICogQHBhcmFtIHRlbXBsYXRlRmFjdG9yeVxuICAgICAqL1xuICAgIGhhbmRsZVRleHRFeHByZXNzaW9uKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOb2RlUGFydChvcHRpb25zKTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yID0gbmV3IERlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvcigpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuY29uc3QgZGlyZWN0aXZlcyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEJyYW5kcyBhIGZ1bmN0aW9uIGFzIGEgZGlyZWN0aXZlIHNvIHRoYXQgbGl0LWh0bWwgd2lsbCBjYWxsIHRoZSBmdW5jdGlvblxuICogZHVyaW5nIHRlbXBsYXRlIHJlbmRlcmluZywgcmF0aGVyIHRoYW4gcGFzc2luZyBhcyBhIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBmIFRoZSBkaXJlY3RpdmUgZmFjdG9yeSBmdW5jdGlvbi4gTXVzdCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhXG4gKiBmdW5jdGlvbiBvZiB0aGUgc2lnbmF0dXJlIGAocGFydDogUGFydCkgPT4gdm9pZGAuIFRoZSByZXR1cm5lZCBmdW5jdGlvbiB3aWxsXG4gKiBiZSBjYWxsZWQgd2l0aCB0aGUgcGFydCBvYmplY3RcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtkaXJlY3RpdmUsIGh0bWx9IGZyb20gJ2xpdC1odG1sJztcbiAqXG4gKiBjb25zdCBpbW11dGFibGUgPSBkaXJlY3RpdmUoKHYpID0+IChwYXJ0KSA9PiB7XG4gKiAgIGlmIChwYXJ0LnZhbHVlICE9PSB2KSB7XG4gKiAgICAgcGFydC5zZXRWYWx1ZSh2KVxuICogICB9XG4gKiB9KTtcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgZGlyZWN0aXZlID0gKGYpID0+ICgoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGQgPSBmKC4uLmFyZ3MpO1xuICAgIGRpcmVjdGl2ZXMuc2V0KGQsIHRydWUpO1xuICAgIHJldHVybiBkO1xufSk7XG5leHBvcnQgY29uc3QgaXNEaXJlY3RpdmUgPSAobykgPT4gdHlwZW9mIG8gPT09ICdmdW5jdGlvbicgJiYgZGlyZWN0aXZlcy5oYXMobyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXJlY3RpdmUuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQ0VQb2x5ZmlsbCA9IHdpbmRvdy5jdXN0b21FbGVtZW50cyAhPT0gdW5kZWZpbmVkICYmXG4gICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLnBvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2sgIT09IHVuZGVmaW5lZDtcbi8qKlxuICogUmVwYXJlbnRzIG5vZGVzLCBzdGFydGluZyBmcm9tIGBzdGFydE5vZGVgIChpbmNsdXNpdmUpIHRvIGBlbmROb2RlYFxuICogKGV4Y2x1c2l2ZSksIGludG8gYW5vdGhlciBjb250YWluZXIgKGNvdWxkIGJlIHRoZSBzYW1lIGNvbnRhaW5lciksIGJlZm9yZVxuICogYGJlZm9yZU5vZGVgLiBJZiBgYmVmb3JlTm9kZWAgaXMgbnVsbCwgaXQgYXBwZW5kcyB0aGUgbm9kZXMgdG8gdGhlXG4gKiBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBjb25zdCByZXBhcmVudE5vZGVzID0gKGNvbnRhaW5lciwgc3RhcnQsIGVuZCA9IG51bGwsIGJlZm9yZSA9IG51bGwpID0+IHtcbiAgICBsZXQgbm9kZSA9IHN0YXJ0O1xuICAgIHdoaWxlIChub2RlICE9PSBlbmQpIHtcbiAgICAgICAgY29uc3QgbiA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUobm9kZSwgYmVmb3JlKTtcbiAgICAgICAgbm9kZSA9IG47XG4gICAgfVxufTtcbi8qKlxuICogUmVtb3ZlcyBub2Rlcywgc3RhcnRpbmcgZnJvbSBgc3RhcnROb2RlYCAoaW5jbHVzaXZlKSB0byBgZW5kTm9kZWBcbiAqIChleGNsdXNpdmUpLCBmcm9tIGBjb250YWluZXJgLlxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlTm9kZXMgPSAoY29udGFpbmVyLCBzdGFydE5vZGUsIGVuZE5vZGUgPSBudWxsKSA9PiB7XG4gICAgbGV0IG5vZGUgPSBzdGFydE5vZGU7XG4gICAgd2hpbGUgKG5vZGUgIT09IGVuZE5vZGUpIHtcbiAgICAgICAgY29uc3QgbiA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgbm9kZSA9IG47XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXAiLCIvKipcbiAqIEEgc2VudGluZWwgdmFsdWUgdGhhdCBzaWduYWxzIHRoYXQgYSB2YWx1ZSB3YXMgaGFuZGxlZCBieSBhIGRpcmVjdGl2ZSBhbmRcbiAqIHNob3VsZCBub3QgYmUgd3JpdHRlbiB0byB0aGUgRE9NLlxuICovXG5leHBvcnQgY29uc3Qgbm9DaGFuZ2UgPSB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcnQuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuaW1wb3J0IHsgaXNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS5qcyc7XG5pbXBvcnQgeyByZW1vdmVOb2RlcyB9IGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCB7IG5vQ2hhbmdlIH0gZnJvbSAnLi9wYXJ0LmpzJztcbmltcG9ydCB7IFRlbXBsYXRlSW5zdGFuY2UgfSBmcm9tICcuL3RlbXBsYXRlLWluc3RhbmNlLmpzJztcbmltcG9ydCB7IFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnLi90ZW1wbGF0ZS1yZXN1bHQuanMnO1xuaW1wb3J0IHsgY3JlYXRlTWFya2VyIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG5leHBvcnQgY29uc3QgaXNQcmltaXRpdmUgPSAodmFsdWUpID0+ICh2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICEodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpKTtcbi8qKlxuICogU2V0cyBhdHRyaWJ1dGUgdmFsdWVzIGZvciBBdHRyaWJ1dGVQYXJ0cywgc28gdGhhdCB0aGUgdmFsdWUgaXMgb25seSBzZXQgb25jZVxuICogZXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgcGFydHMgZm9yIGFuIGF0dHJpYnV0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZUNvbW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgbmFtZSwgc3RyaW5ncykge1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gc3RyaW5ncztcbiAgICAgICAgdGhpcy5wYXJ0cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnRzW2ldID0gdGhpcy5fY3JlYXRlUGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzaW5nbGUgcGFydC4gT3ZlcnJpZGUgdGhpcyB0byBjcmVhdGUgYSBkaWZmZXJudCB0eXBlIG9mIHBhcnQuXG4gICAgICovXG4gICAgX2NyZWF0ZVBhcnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXR0cmlidXRlUGFydCh0aGlzKTtcbiAgICB9XG4gICAgX2dldFZhbHVlKCkge1xuICAgICAgICBjb25zdCBzdHJpbmdzID0gdGhpcy5zdHJpbmdzO1xuICAgICAgICBjb25zdCBsID0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgdGV4dCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdGV4dCArPSBzdHJpbmdzW2ldO1xuICAgICAgICAgICAgY29uc3QgcGFydCA9IHRoaXMucGFydHNbaV07XG4gICAgICAgICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdiA9IHBhcnQudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHYgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheSh2KSB8fCB0eXBlb2YgdiAhPT0gJ3N0cmluZycgJiYgdltTeW1ib2wuaXRlcmF0b3JdKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHQgb2Ygdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSB0eXBlb2YgdCA9PT0gJ3N0cmluZycgPyB0IDogU3RyaW5nKHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IHR5cGVvZiB2ID09PSAnc3RyaW5nJyA/IHYgOiBTdHJpbmcodik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRleHQgKz0gc3RyaW5nc1tsXTtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICAgIGNvbW1pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLCB0aGlzLl9nZXRWYWx1ZSgpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGVQYXJ0IHtcbiAgICBjb25zdHJ1Y3Rvcihjb21pdHRlcikge1xuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbW1pdHRlciA9IGNvbWl0dGVyO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG5vQ2hhbmdlICYmICghaXNQcmltaXRpdmUodmFsdWUpIHx8IHZhbHVlICE9PSB0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIGEgbm90IGEgZGlyZWN0aXZlLCBkaXJ0eSB0aGUgY29tbWl0dGVyIHNvIHRoYXQgaXQnbGxcbiAgICAgICAgICAgIC8vIGNhbGwgc2V0QXR0cmlidXRlLiBJZiB0aGUgdmFsdWUgaXMgYSBkaXJlY3RpdmUsIGl0J2xsIGRpcnR5IHRoZVxuICAgICAgICAgICAgLy8gY29tbWl0dGVyIGlmIGl0IGNhbGxzIHNldFZhbHVlKCkuXG4gICAgICAgICAgICBpZiAoIWlzRGlyZWN0aXZlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWl0dGVyLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21taXQoKSB7XG4gICAgICAgIHdoaWxlIChpc0RpcmVjdGl2ZSh0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aXZlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBub0NoYW5nZTtcbiAgICAgICAgICAgIGRpcmVjdGl2ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbW1pdHRlci5jb21taXQoKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgTm9kZVBhcnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoaXMgcGFydCBpbnRvIGEgY29udGFpbmVyLlxuICAgICAqXG4gICAgICogVGhpcyBwYXJ0IG11c3QgYmUgZW1wdHksIGFzIGl0cyBjb250ZW50cyBhcmUgbm90IGF1dG9tYXRpY2FsbHkgbW92ZWQuXG4gICAgICovXG4gICAgYXBwZW5kSW50byhjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zdGFydE5vZGUgPSBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTWFya2VyKCkpO1xuICAgICAgICB0aGlzLmVuZE5vZGUgPSBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTWFya2VyKCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoaXMgcGFydCBiZXR3ZWVuIGByZWZgIGFuZCBgcmVmYCdzIG5leHQgc2libGluZy4gQm90aCBgcmVmYCBhbmRcbiAgICAgKiBpdHMgbmV4dCBzaWJsaW5nIG11c3QgYmUgc3RhdGljLCB1bmNoYW5naW5nIG5vZGVzIHN1Y2ggYXMgdGhvc2UgdGhhdCBhcHBlYXJcbiAgICAgKiBpbiBhIGxpdGVyYWwgc2VjdGlvbiBvZiBhIHRlbXBsYXRlLlxuICAgICAqXG4gICAgICogVGhpcyBwYXJ0IG11c3QgYmUgZW1wdHksIGFzIGl0cyBjb250ZW50cyBhcmUgbm90IGF1dG9tYXRpY2FsbHkgbW92ZWQuXG4gICAgICovXG4gICAgaW5zZXJ0QWZ0ZXJOb2RlKHJlZikge1xuICAgICAgICB0aGlzLnN0YXJ0Tm9kZSA9IHJlZjtcbiAgICAgICAgdGhpcy5lbmROb2RlID0gcmVmLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIHRoaXMgcGFydCBpbnRvIGEgcGFyZW50IHBhcnQuXG4gICAgICpcbiAgICAgKiBUaGlzIHBhcnQgbXVzdCBiZSBlbXB0eSwgYXMgaXRzIGNvbnRlbnRzIGFyZSBub3QgYXV0b21hdGljYWxseSBtb3ZlZC5cbiAgICAgKi9cbiAgICBhcHBlbmRJbnRvUGFydChwYXJ0KSB7XG4gICAgICAgIHBhcnQuX2luc2VydCh0aGlzLnN0YXJ0Tm9kZSA9IGNyZWF0ZU1hcmtlcigpKTtcbiAgICAgICAgcGFydC5faW5zZXJ0KHRoaXMuZW5kTm9kZSA9IGNyZWF0ZU1hcmtlcigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyB0aGlzIHBhcnQgYWZ0ZXIgYHJlZmBcbiAgICAgKlxuICAgICAqIFRoaXMgcGFydCBtdXN0IGJlIGVtcHR5LCBhcyBpdHMgY29udGVudHMgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IG1vdmVkLlxuICAgICAqL1xuICAgIGluc2VydEFmdGVyUGFydChyZWYpIHtcbiAgICAgICAgcmVmLl9pbnNlcnQodGhpcy5zdGFydE5vZGUgPSBjcmVhdGVNYXJrZXIoKSk7XG4gICAgICAgIHRoaXMuZW5kTm9kZSA9IHJlZi5lbmROb2RlO1xuICAgICAgICByZWYuZW5kTm9kZSA9IHRoaXMuc3RhcnROb2RlO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wZW5kaW5nVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICB3aGlsZSAoaXNEaXJlY3RpdmUodGhpcy5fcGVuZGluZ1ZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aXZlID0gdGhpcy5fcGVuZGluZ1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gbm9DaGFuZ2U7XG4gICAgICAgICAgICBkaXJlY3RpdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9wZW5kaW5nVmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcmltaXRpdmUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21taXRUZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb21taXRUZW1wbGF0ZVJlc3VsdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21taXROb2RlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZVtTeW1ib2wuaXRlcmF0b3JdKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21taXRJdGVyYWJsZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBGYWxsYmFjaywgd2lsbCByZW5kZXIgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgdGhpcy5fY29tbWl0VGV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2luc2VydChub2RlKSB7XG4gICAgICAgIHRoaXMuZW5kTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCB0aGlzLmVuZE5vZGUpO1xuICAgIH1cbiAgICBfY29tbWl0Tm9kZSh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX2luc2VydCh2YWx1ZSk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgX2NvbW1pdFRleHQodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuc3RhcnROb2RlLm5leHRTaWJsaW5nO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuICAgICAgICBpZiAobm9kZSA9PT0gdGhpcy5lbmROb2RlLnByZXZpb3VzU2libGluZyAmJlxuICAgICAgICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIG9ubHkgaGF2ZSBhIHNpbmdsZSB0ZXh0IG5vZGUgYmV0d2VlbiB0aGUgbWFya2Vycywgd2UgY2FuIGp1c3RcbiAgICAgICAgICAgIC8vIHNldCBpdHMgdmFsdWUsIHJhdGhlciB0aGFuIHJlcGxhY2luZyBpdC5cbiAgICAgICAgICAgIC8vIFRPRE8oanVzdGluZmFnbmFuaSk6IENhbiB3ZSBqdXN0IGNoZWNrIGlmIHRoaXMudmFsdWUgaXMgcHJpbWl0aXZlP1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29tbWl0Tm9kZShkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBTdHJpbmcodmFsdWUpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBfY29tbWl0VGVtcGxhdGVSZXN1bHQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMudGVtcGxhdGVGYWN0b3J5KHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS50ZW1wbGF0ZSA9PT0gdGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUudXBkYXRlKHZhbHVlLnZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgcHJvcGFnYXRlIHRoZSB0ZW1wbGF0ZSBwcm9jZXNzb3IgZnJvbSB0aGUgVGVtcGxhdGVSZXN1bHRcbiAgICAgICAgICAgIC8vIHNvIHRoYXQgd2UgdXNlIGl0cyBzeW50YXggZXh0ZW5zaW9uLCBldGMuIFRoZSB0ZW1wbGF0ZSBmYWN0b3J5IGNvbWVzXG4gICAgICAgICAgICAvLyBmcm9tIHRoZSByZW5kZXIgZnVuY3Rpb24gb3B0aW9ucyBzbyB0aGF0IGl0IGNhbiBjb250cm9sIHRlbXBsYXRlXG4gICAgICAgICAgICAvLyBjYWNoaW5nIGFuZCBwcmVwcm9jZXNzaW5nLlxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgVGVtcGxhdGVJbnN0YW5jZSh0ZW1wbGF0ZSwgdmFsdWUucHJvY2Vzc29yLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBpbnN0YW5jZS5fY2xvbmUoKTtcbiAgICAgICAgICAgIGluc3RhbmNlLnVwZGF0ZSh2YWx1ZS52YWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy5fY29tbWl0Tm9kZShmcmFnbWVudCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbW1pdEl0ZXJhYmxlKHZhbHVlKSB7XG4gICAgICAgIC8vIEZvciBhbiBJdGVyYWJsZSwgd2UgY3JlYXRlIGEgbmV3IEluc3RhbmNlUGFydCBwZXIgaXRlbSwgdGhlbiBzZXQgaXRzXG4gICAgICAgIC8vIHZhbHVlIHRvIHRoZSBpdGVtLiBUaGlzIGlzIGEgbGl0dGxlIGJpdCBvZiBvdmVyaGVhZCBmb3IgZXZlcnkgaXRlbSBpblxuICAgICAgICAvLyBhbiBJdGVyYWJsZSwgYnV0IGl0IGxldHMgdXMgcmVjdXJzZSBlYXNpbHkgYW5kIGVmZmljaWVudGx5IHVwZGF0ZSBBcnJheXNcbiAgICAgICAgLy8gb2YgVGVtcGxhdGVSZXN1bHRzIHRoYXQgd2lsbCBiZSBjb21tb25seSByZXR1cm5lZCBmcm9tIGV4cHJlc3Npb25zIGxpa2U6XG4gICAgICAgIC8vIGFycmF5Lm1hcCgoaSkgPT4gaHRtbGAke2l9YCksIGJ5IHJldXNpbmcgZXhpc3RpbmcgVGVtcGxhdGVJbnN0YW5jZXMuXG4gICAgICAgIC8vIElmIF92YWx1ZSBpcyBhbiBhcnJheSwgdGhlbiB0aGUgcHJldmlvdXMgcmVuZGVyIHdhcyBvZiBhblxuICAgICAgICAvLyBpdGVyYWJsZSBhbmQgX3ZhbHVlIHdpbGwgY29udGFpbiB0aGUgTm9kZVBhcnRzIGZyb20gdGhlIHByZXZpb3VzXG4gICAgICAgIC8vIHJlbmRlci4gSWYgX3ZhbHVlIGlzIG5vdCBhbiBhcnJheSwgY2xlYXIgdGhpcyBwYXJ0IGFuZCBtYWtlIGEgbmV3XG4gICAgICAgIC8vIGFycmF5IGZvciBOb2RlUGFydHMuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIExldHMgdXMga2VlcCB0cmFjayBvZiBob3cgbWFueSBpdGVtcyB3ZSBzdGFtcGVkIHNvIHdlIGNhbiBjbGVhciBsZWZ0b3ZlclxuICAgICAgICAvLyBpdGVtcyBmcm9tIGEgcHJldmlvdXMgcmVuZGVyXG4gICAgICAgIGNvbnN0IGl0ZW1QYXJ0cyA9IHRoaXMudmFsdWU7XG4gICAgICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgICAgICBsZXQgaXRlbVBhcnQ7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIHJldXNlIGFuIGV4aXN0aW5nIHBhcnRcbiAgICAgICAgICAgIGl0ZW1QYXJ0ID0gaXRlbVBhcnRzW3BhcnRJbmRleF07XG4gICAgICAgICAgICAvLyBJZiBubyBleGlzdGluZyBwYXJ0LCBjcmVhdGUgYSBuZXcgb25lXG4gICAgICAgICAgICBpZiAoaXRlbVBhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGl0ZW1QYXJ0ID0gbmV3IE5vZGVQYXJ0KHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaXRlbVBhcnRzLnB1c2goaXRlbVBhcnQpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVBhcnQuYXBwZW5kSW50b1BhcnQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtUGFydC5pbnNlcnRBZnRlclBhcnQoaXRlbVBhcnRzW3BhcnRJbmRleCAtIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtUGFydC5zZXRWYWx1ZShpdGVtKTtcbiAgICAgICAgICAgIGl0ZW1QYXJ0LmNvbW1pdCgpO1xuICAgICAgICAgICAgcGFydEluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRJbmRleCA8IGl0ZW1QYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFRydW5jYXRlIHRoZSBwYXJ0cyBhcnJheSBzbyBfdmFsdWUgcmVmbGVjdHMgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgICAgICAgIGl0ZW1QYXJ0cy5sZW5ndGggPSBwYXJ0SW5kZXg7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKGl0ZW1QYXJ0ICYmIGl0ZW1QYXJ0LmVuZE5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKHN0YXJ0Tm9kZSA9IHRoaXMuc3RhcnROb2RlKSB7XG4gICAgICAgIHJlbW92ZU5vZGVzKHRoaXMuc3RhcnROb2RlLnBhcmVudE5vZGUsIHN0YXJ0Tm9kZS5uZXh0U2libGluZywgdGhpcy5lbmROb2RlKTtcbiAgICB9XG59XG4vKipcbiAqIEltcGxlbWVudHMgYSBib29sZWFuIGF0dHJpYnV0ZSwgcm91Z2hseSBhcyBkZWZpbmVkIGluIHRoZSBIVE1MXG4gKiBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIElmIHRoZSB2YWx1ZSBpcyB0cnV0aHksIHRoZW4gdGhlIGF0dHJpYnV0ZSBpcyBwcmVzZW50IHdpdGggYSB2YWx1ZSBvZlxuICogJycuIElmIHRoZSB2YWx1ZSBpcyBmYWxzZXksIHRoZSBhdHRyaWJ1dGUgaXMgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHN0cmluZ3MubGVuZ3RoICE9PSAyIHx8IHN0cmluZ3NbMF0gIT09ICcnIHx8IHN0cmluZ3NbMV0gIT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb2xlYW4gYXR0cmlidXRlcyBjYW4gb25seSBjb250YWluIGEgc2luZ2xlIGV4cHJlc3Npb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnN0cmluZ3MgPSBzdHJpbmdzO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wZW5kaW5nVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICB3aGlsZSAoaXNEaXJlY3RpdmUodGhpcy5fcGVuZGluZ1ZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aXZlID0gdGhpcy5fcGVuZGluZ1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gbm9DaGFuZ2U7XG4gICAgICAgICAgICBkaXJlY3RpdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3BlbmRpbmdWYWx1ZSA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9ICEhdGhpcy5fcGVuZGluZ1ZhbHVlO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHRoaXMubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9wZW5kaW5nVmFsdWUgPSBub0NoYW5nZTtcbiAgICB9XG59XG4vKipcbiAqIFNldHMgYXR0cmlidXRlIHZhbHVlcyBmb3IgUHJvcGVydHlQYXJ0cywgc28gdGhhdCB0aGUgdmFsdWUgaXMgb25seSBzZXQgb25jZVxuICogZXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgcGFydHMgZm9yIGEgcHJvcGVydHkuXG4gKlxuICogSWYgYW4gZXhwcmVzc2lvbiBjb250cm9scyB0aGUgd2hvbGUgcHJvcGVydHkgdmFsdWUsIHRoZW4gdGhlIHZhbHVlIGlzIHNpbXBseVxuICogYXNzaWduZWQgdG8gdGhlIHByb3BlcnR5IHVuZGVyIGNvbnRyb2wuIElmIHRoZXJlIGFyZSBzdHJpbmcgbGl0ZXJhbHMgb3JcbiAqIG11bHRpcGxlIGV4cHJlc3Npb25zLCB0aGVuIHRoZSBzdHJpbmdzIGFyZSBleHByZXNzaW9ucyBhcmUgaW50ZXJwb2xhdGVkIGludG9cbiAqIGEgc3RyaW5nIGZpcnN0LlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlDb21taXR0ZXIgZXh0ZW5kcyBBdHRyaWJ1dGVDb21taXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG5hbWUsIHN0cmluZ3MpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudCwgbmFtZSwgc3RyaW5ncyk7XG4gICAgICAgIHRoaXMuc2luZ2xlID1cbiAgICAgICAgICAgIChzdHJpbmdzLmxlbmd0aCA9PT0gMiAmJiBzdHJpbmdzWzBdID09PSAnJyAmJiBzdHJpbmdzWzFdID09PSAnJyk7XG4gICAgfVxuICAgIF9jcmVhdGVQYXJ0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5UGFydCh0aGlzKTtcbiAgICB9XG4gICAgX2dldFZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5zaW5nbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnRzWzBdLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5fZ2V0VmFsdWUoKTtcbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50W3RoaXMubmFtZV0gPSB0aGlzLl9nZXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFByb3BlcnR5UGFydCBleHRlbmRzIEF0dHJpYnV0ZVBhcnQge1xufVxuLy8gRGV0ZWN0IGV2ZW50IGxpc3RlbmVyIG9wdGlvbnMgc3VwcG9ydC4gSWYgdGhlIGBjYXB0dXJlYCBwcm9wZXJ0eSBpcyByZWFkXG4vLyBmcm9tIHRoZSBvcHRpb25zIG9iamVjdCwgdGhlbiBvcHRpb25zIGFyZSBzdXBwb3J0ZWQuIElmIG5vdCwgdGhlbiB0aGUgdGhyaWRcbi8vIGFyZ3VtZW50IHRvIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyIGlzIGludGVycHJldGVkIGFzIHRoZSBib29sZWFuIGNhcHR1cmVcbi8vIHZhbHVlIHNvIHdlIHNob3VsZCBvbmx5IHBhc3MgdGhlIGBjYXB0dXJlYCBwcm9wZXJ0eS5cbmxldCBldmVudE9wdGlvbnNTdXBwb3J0ZWQgPSBmYWxzZTtcbnRyeSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgZ2V0IGNhcHR1cmUoKSB7XG4gICAgICAgICAgICBldmVudE9wdGlvbnNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0Jywgb3B0aW9ucywgb3B0aW9ucyk7XG59XG5jYXRjaCAoX2UpIHtcbn1cbmV4cG9ydCBjbGFzcyBFdmVudFBhcnQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGV2ZW50TmFtZSwgZXZlbnRDb250ZXh0KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XG4gICAgICAgIHRoaXMuZXZlbnRDb250ZXh0ID0gZXZlbnRDb250ZXh0O1xuICAgICAgICB0aGlzLl9ib3VuZEhhbmRsZUV2ZW50ID0gKGUpID0+IHRoaXMuaGFuZGxlRXZlbnQoZSk7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBjb21taXQoKSB7XG4gICAgICAgIHdoaWxlIChpc0RpcmVjdGl2ZSh0aGlzLl9wZW5kaW5nVmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RpdmUgPSB0aGlzLl9wZW5kaW5nVmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9wZW5kaW5nVmFsdWUgPSBub0NoYW5nZTtcbiAgICAgICAgICAgIGRpcmVjdGl2ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZ1ZhbHVlID09PSBub0NoYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0xpc3RlbmVyID0gdGhpcy5fcGVuZGluZ1ZhbHVlO1xuICAgICAgICBjb25zdCBvbGRMaXN0ZW5lciA9IHRoaXMudmFsdWU7XG4gICAgICAgIGNvbnN0IHNob3VsZFJlbW92ZUxpc3RlbmVyID0gbmV3TGlzdGVuZXIgPT0gbnVsbCB8fFxuICAgICAgICAgICAgb2xkTGlzdGVuZXIgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIChuZXdMaXN0ZW5lci5jYXB0dXJlICE9PSBvbGRMaXN0ZW5lci5jYXB0dXJlIHx8XG4gICAgICAgICAgICAgICAgICAgIG5ld0xpc3RlbmVyLm9uY2UgIT09IG9sZExpc3RlbmVyLm9uY2UgfHxcbiAgICAgICAgICAgICAgICAgICAgbmV3TGlzdGVuZXIucGFzc2l2ZSAhPT0gb2xkTGlzdGVuZXIucGFzc2l2ZSk7XG4gICAgICAgIGNvbnN0IHNob3VsZEFkZExpc3RlbmVyID0gbmV3TGlzdGVuZXIgIT0gbnVsbCAmJiAob2xkTGlzdGVuZXIgPT0gbnVsbCB8fCBzaG91bGRSZW1vdmVMaXN0ZW5lcik7XG4gICAgICAgIGlmIChzaG91bGRSZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIHRoaXMuX2JvdW5kSGFuZGxlRXZlbnQsIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaG91bGRBZGRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IGdldE9wdGlvbnMobmV3TGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIHRoaXMuX2JvdW5kSGFuZGxlRXZlbnQsIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdMaXN0ZW5lcjtcbiAgICAgICAgdGhpcy5fcGVuZGluZ1ZhbHVlID0gbm9DaGFuZ2U7XG4gICAgfVxuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5jYWxsKHRoaXMuZXZlbnRDb250ZXh0IHx8IHRoaXMuZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5oYW5kbGVFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyBXZSBjb3B5IG9wdGlvbnMgYmVjYXVzZSBvZiB0aGUgaW5jb25zaXN0ZW50IGJlaGF2aW9yIG9mIGJyb3dzZXJzIHdoZW4gcmVhZGluZ1xuLy8gdGhlIHRoaXJkIGFyZ3VtZW50IG9mIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyLiBJRTExIGRvZXNuJ3Qgc3VwcG9ydCBvcHRpb25zXG4vLyBhdCBhbGwuIENocm9tZSA0MSBvbmx5IHJlYWRzIGBjYXB0dXJlYCBpZiB0aGUgYXJndW1lbnQgaXMgYW4gb2JqZWN0LlxuY29uc3QgZ2V0T3B0aW9ucyA9IChvKSA9PiBvICYmXG4gICAgKGV2ZW50T3B0aW9uc1N1cHBvcnRlZCA/XG4gICAgICAgIHsgY2FwdHVyZTogby5jYXB0dXJlLCBwYXNzaXZlOiBvLnBhc3NpdmUsIG9uY2U6IG8ub25jZSB9IDpcbiAgICAgICAgby5jYXB0dXJlKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcnRzLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IHJlbW92ZU5vZGVzIH0gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0IHsgTm9kZVBhcnQgfSBmcm9tICcuL3BhcnRzLmpzJztcbmltcG9ydCB7IHRlbXBsYXRlRmFjdG9yeSB9IGZyb20gJy4vdGVtcGxhdGUtZmFjdG9yeS5qcyc7XG5leHBvcnQgY29uc3QgcGFydHMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBSZW5kZXJzIGEgdGVtcGxhdGUgdG8gYSBjb250YWluZXIuXG4gKlxuICogVG8gdXBkYXRlIGEgY29udGFpbmVyIHdpdGggbmV3IHZhbHVlcywgcmVldmFsdWF0ZSB0aGUgdGVtcGxhdGUgbGl0ZXJhbCBhbmRcbiAqIGNhbGwgYHJlbmRlcmAgd2l0aCB0aGUgbmV3IHJlc3VsdC5cbiAqXG4gKiBAcGFyYW0gcmVzdWx0IGEgVGVtcGxhdGVSZXN1bHQgY3JlYXRlZCBieSBldmFsdWF0aW5nIGEgdGVtcGxhdGUgdGFnIGxpa2VcbiAqICAgICBgaHRtbGAgb3IgYHN2Z2AuXG4gKiBAcGFyYW0gY29udGFpbmVyIEEgRE9NIHBhcmVudCB0byByZW5kZXIgdG8uIFRoZSBlbnRpcmUgY29udGVudHMgYXJlIGVpdGhlclxuICogICAgIHJlcGxhY2VkLCBvciBlZmZpY2llbnRseSB1cGRhdGVkIGlmIHRoZSBzYW1lIHJlc3VsdCB0eXBlIHdhcyBwcmV2aW91c1xuICogICAgIHJlbmRlcmVkIHRoZXJlLlxuICogQHBhcmFtIG9wdGlvbnMgUmVuZGVyT3B0aW9ucyBmb3IgdGhlIGVudGlyZSByZW5kZXIgdHJlZSByZW5kZXJlZCB0byB0aGlzXG4gKiAgICAgY29udGFpbmVyLiBSZW5kZXIgb3B0aW9ucyBtdXN0ICpub3QqIGNoYW5nZSBiZXR3ZWVuIHJlbmRlcnMgdG8gdGhlIHNhbWVcbiAqICAgICBjb250YWluZXIsIGFzIHRob3NlIGNoYW5nZXMgd2lsbCBub3QgZWZmZWN0IHByZXZpb3VzbHkgcmVuZGVyZWQgRE9NLlxuICovXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKHJlc3VsdCwgY29udGFpbmVyLCBvcHRpb25zKSA9PiB7XG4gICAgbGV0IHBhcnQgPSBwYXJ0cy5nZXQoY29udGFpbmVyKTtcbiAgICBpZiAocGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlbW92ZU5vZGVzKGNvbnRhaW5lciwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICBwYXJ0cy5zZXQoY29udGFpbmVyLCBwYXJ0ID0gbmV3IE5vZGVQYXJ0KE9iamVjdC5hc3NpZ24oeyB0ZW1wbGF0ZUZhY3RvcnkgfSwgb3B0aW9ucykpKTtcbiAgICAgICAgcGFydC5hcHBlbmRJbnRvKGNvbnRhaW5lcik7XG4gICAgfVxuICAgIHBhcnQuc2V0VmFsdWUocmVzdWx0KTtcbiAgICBwYXJ0LmNvbW1pdCgpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlbmRlci5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5pbXBvcnQgeyBtYXJrZXIsIFRlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG4vKipcbiAqIFRoZSBkZWZhdWx0IFRlbXBsYXRlRmFjdG9yeSB3aGljaCBjYWNoZXMgVGVtcGxhdGVzIGtleWVkIG9uXG4gKiByZXN1bHQudHlwZSBhbmQgcmVzdWx0LnN0cmluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZUZhY3RvcnkocmVzdWx0KSB7XG4gICAgbGV0IHRlbXBsYXRlQ2FjaGUgPSB0ZW1wbGF0ZUNhY2hlcy5nZXQocmVzdWx0LnR5cGUpO1xuICAgIGlmICh0ZW1wbGF0ZUNhY2hlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGVtcGxhdGVDYWNoZSA9IHtcbiAgICAgICAgICAgIHN0cmluZ3NBcnJheTogbmV3IFdlYWtNYXAoKSxcbiAgICAgICAgICAgIGtleVN0cmluZzogbmV3IE1hcCgpXG4gICAgICAgIH07XG4gICAgICAgIHRlbXBsYXRlQ2FjaGVzLnNldChyZXN1bHQudHlwZSwgdGVtcGxhdGVDYWNoZSk7XG4gICAgfVxuICAgIGxldCB0ZW1wbGF0ZSA9IHRlbXBsYXRlQ2FjaGUuc3RyaW5nc0FycmF5LmdldChyZXN1bHQuc3RyaW5ncyk7XG4gICAgaWYgKHRlbXBsYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgVGVtcGxhdGVTdHJpbmdzQXJyYXkgaXMgbmV3LCBnZW5lcmF0ZSBhIGtleSBmcm9tIHRoZSBzdHJpbmdzXG4gICAgLy8gVGhpcyBrZXkgaXMgc2hhcmVkIGJldHdlZW4gYWxsIHRlbXBsYXRlcyB3aXRoIGlkZW50aWNhbCBjb250ZW50XG4gICAgY29uc3Qga2V5ID0gcmVzdWx0LnN0cmluZ3Muam9pbihtYXJrZXIpO1xuICAgIC8vIENoZWNrIGlmIHdlIGFscmVhZHkgaGF2ZSBhIFRlbXBsYXRlIGZvciB0aGlzIGtleVxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGVDYWNoZS5rZXlTdHJpbmcuZ2V0KGtleSk7XG4gICAgaWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBub3Qgc2VlbiB0aGlzIGtleSBiZWZvcmUsIGNyZWF0ZSBhIG5ldyBUZW1wbGF0ZVxuICAgICAgICB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZShyZXN1bHQsIHJlc3VsdC5nZXRUZW1wbGF0ZUVsZW1lbnQoKSk7XG4gICAgICAgIC8vIENhY2hlIHRoZSBUZW1wbGF0ZSBmb3IgdGhpcyBrZXlcbiAgICAgICAgdGVtcGxhdGVDYWNoZS5rZXlTdHJpbmcuc2V0KGtleSwgdGVtcGxhdGUpO1xuICAgIH1cbiAgICAvLyBDYWNoZSBhbGwgZnV0dXJlIHF1ZXJpZXMgZm9yIHRoaXMgVGVtcGxhdGVTdHJpbmdzQXJyYXlcbiAgICB0ZW1wbGF0ZUNhY2hlLnN0cmluZ3NBcnJheS5zZXQocmVzdWx0LnN0cmluZ3MsIHRlbXBsYXRlKTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG59XG5leHBvcnQgY29uc3QgdGVtcGxhdGVDYWNoZXMgPSBuZXcgTWFwKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZW1wbGF0ZS1mYWN0b3J5LmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IGlzQ0VQb2x5ZmlsbCB9IGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCB7IGlzVGVtcGxhdGVQYXJ0QWN0aXZlIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG4vKipcbiAqIEFuIGluc3RhbmNlIG9mIGEgYFRlbXBsYXRlYCB0aGF0IGNhbiBiZSBhdHRhY2hlZCB0byB0aGUgRE9NIGFuZCB1cGRhdGVkXG4gKiB3aXRoIG5ldyB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZUluc3RhbmNlIHtcbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZSwgcHJvY2Vzc29yLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX3BhcnRzID0gW107XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgICAgdGhpcy5wcm9jZXNzb3IgPSBwcm9jZXNzb3I7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIHVwZGF0ZSh2YWx1ZXMpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGhpcy5fcGFydHMpIHtcbiAgICAgICAgICAgIGlmIChwYXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBwYXJ0LnNldFZhbHVlKHZhbHVlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIHRoaXMuX3BhcnRzKSB7XG4gICAgICAgICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcGFydC5jb21taXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY2xvbmUoKSB7XG4gICAgICAgIC8vIFdoZW4gdXNpbmcgdGhlIEN1c3RvbSBFbGVtZW50cyBwb2x5ZmlsbCwgY2xvbmUgdGhlIG5vZGUsIHJhdGhlciB0aGFuXG4gICAgICAgIC8vIGltcG9ydGluZyBpdCwgdG8ga2VlcCB0aGUgZnJhZ21lbnQgaW4gdGhlIHRlbXBsYXRlJ3MgZG9jdW1lbnQuIFRoaXNcbiAgICAgICAgLy8gbGVhdmVzIHRoZSBmcmFnbWVudCBpbmVydCBzbyBjdXN0b20gZWxlbWVudHMgd29uJ3QgdXBncmFkZSBhbmRcbiAgICAgICAgLy8gcG90ZW50aWFsbHkgbW9kaWZ5IHRoZWlyIGNvbnRlbnRzIGJ5IGNyZWF0aW5nIGEgcG9seWZpbGxlZCBTaGFkb3dSb290XG4gICAgICAgIC8vIHdoaWxlIHdlIHRyYXZlcnNlIHRoZSB0cmVlLlxuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGlzQ0VQb2x5ZmlsbCA/XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlLmVsZW1lbnQuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkgOlxuICAgICAgICAgICAgZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlLmVsZW1lbnQuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGhpcy50ZW1wbGF0ZS5wYXJ0cztcbiAgICAgICAgbGV0IHBhcnRJbmRleCA9IDA7XG4gICAgICAgIGxldCBub2RlSW5kZXggPSAwO1xuICAgICAgICBjb25zdCBfcHJlcGFyZUluc3RhbmNlID0gKGZyYWdtZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBFZGdlIG5lZWRzIGFsbCA0IHBhcmFtZXRlcnMgcHJlc2VudDsgSUUxMSBuZWVkcyAzcmQgcGFyYW1ldGVyIHRvIGJlXG4gICAgICAgICAgICAvLyBudWxsXG4gICAgICAgICAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGZyYWdtZW50LCAxMzMgLyogTm9kZUZpbHRlci5TSE9XX3tFTEVNRU5UfENPTU1FTlR8VEVYVH0gKi8sIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgIGxldCBub2RlID0gd2Fsa2VyLm5leHROb2RlKCk7XG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBub2RlcyBhbmQgcGFydHMgb2YgYSB0ZW1wbGF0ZVxuICAgICAgICAgICAgd2hpbGUgKHBhcnRJbmRleCA8IHBhcnRzLmxlbmd0aCAmJiBub2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFydCA9IHBhcnRzW3BhcnRJbmRleF07XG4gICAgICAgICAgICAgICAgLy8gQ29uc2VjdXRpdmUgUGFydHMgbWF5IGhhdmUgdGhlIHNhbWUgbm9kZSBpbmRleCwgaW4gdGhlIGNhc2Ugb2ZcbiAgICAgICAgICAgICAgICAvLyBtdWx0aXBsZSBib3VuZCBhdHRyaWJ1dGVzIG9uIGFuIGVsZW1lbnQuIFNvIGVhY2ggaXRlcmF0aW9uIHdlIGVpdGhlclxuICAgICAgICAgICAgICAgIC8vIGluY3JlbWVudCB0aGUgbm9kZUluZGV4LCBpZiB3ZSBhcmVuJ3Qgb24gYSBub2RlIHdpdGggYSBwYXJ0LCBvciB0aGVcbiAgICAgICAgICAgICAgICAvLyBwYXJ0SW5kZXggaWYgd2UgYXJlLiBCeSBub3QgaW5jcmVtZW50aW5nIHRoZSBub2RlSW5kZXggd2hlbiB3ZSBmaW5kIGFcbiAgICAgICAgICAgICAgICAvLyBwYXJ0LCB3ZSBhbGxvdyBmb3IgdGhlIG5leHQgcGFydCB0byBiZSBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAvLyBub2RlIGlmIG5lY2Nlc3Nhc3J5LlxuICAgICAgICAgICAgICAgIGlmICghaXNUZW1wbGF0ZVBhcnRBY3RpdmUocGFydCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFydHMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICBwYXJ0SW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobm9kZUluZGV4ID09PSBwYXJ0LmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0LnR5cGUgPT09ICdub2RlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydCA9IHRoaXMucHJvY2Vzc29yLmhhbmRsZVRleHRFeHByZXNzaW9uKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0Lmluc2VydEFmdGVyTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRzLnB1c2gocGFydCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0cy5wdXNoKC4uLnRoaXMucHJvY2Vzc29yLmhhbmRsZUF0dHJpYnV0ZUV4cHJlc3Npb25zKG5vZGUsIHBhcnQubmFtZSwgcGFydC5zdHJpbmdzLCB0aGlzLm9wdGlvbnMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJ0SW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gJ1RFTVBMQVRFJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ByZXBhcmVJbnN0YW5jZShub2RlLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIF9wcmVwYXJlSW5zdGFuY2UoZnJhZ21lbnQpO1xuICAgICAgICBpZiAoaXNDRVBvbHlmaWxsKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZG9wdE5vZGUoZnJhZ21lbnQpO1xuICAgICAgICAgICAgY3VzdG9tRWxlbWVudHMudXBncmFkZShmcmFnbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlbXBsYXRlLWluc3RhbmNlLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IHJlcGFyZW50Tm9kZXMgfSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyBib3VuZEF0dHJpYnV0ZVN1ZmZpeCwgbGFzdEF0dHJpYnV0ZU5hbWVSZWdleCwgbWFya2VyLCBub2RlTWFya2VyIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG4vKipcbiAqIFRoZSByZXR1cm4gdHlwZSBvZiBgaHRtbGAsIHdoaWNoIGhvbGRzIGEgVGVtcGxhdGUgYW5kIHRoZSB2YWx1ZXMgZnJvbVxuICogaW50ZXJwb2xhdGVkIGV4cHJlc3Npb25zLlxuICovXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZ3MsIHZhbHVlcywgdHlwZSwgcHJvY2Vzc29yKSB7XG4gICAgICAgIHRoaXMuc3RyaW5ncyA9IHN0cmluZ3M7XG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnByb2Nlc3NvciA9IHByb2Nlc3NvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyBvZiBIVE1MIHVzZWQgdG8gY3JlYXRlIGEgYDx0ZW1wbGF0ZT5gIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0SFRNTCgpIHtcbiAgICAgICAgY29uc3QgZW5kSW5kZXggPSB0aGlzLnN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmRJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5zdHJpbmdzW2ldO1xuICAgICAgICAgICAgLy8gVGhpcyByZXBsYWNlKCkgY2FsbCBkb2VzIHR3byB0aGluZ3M6XG4gICAgICAgICAgICAvLyAxKSBBcHBlbmRzIGEgc3VmZml4IHRvIGFsbCBib3VuZCBhdHRyaWJ1dGUgbmFtZXMgdG8gb3B0IG91dCBvZiBzcGVjaWFsXG4gICAgICAgICAgICAvLyBhdHRyaWJ1dGUgdmFsdWUgcGFyc2luZyB0aGF0IElFMTEgYW5kIEVkZ2UgZG8sIGxpa2UgZm9yIHN0eWxlIGFuZFxuICAgICAgICAgICAgLy8gbWFueSBTVkcgYXR0cmlidXRlcy4gVGhlIFRlbXBsYXRlIGNsYXNzIGFsc28gYXBwZW5kcyB0aGUgc2FtZSBzdWZmaXhcbiAgICAgICAgICAgIC8vIHdoZW4gbG9va2luZyB1cCBhdHRyaWJ1dGVzIHRvIGNyZWF0IFBhcnRzLlxuICAgICAgICAgICAgLy8gMikgQWRkcyBhbiB1bnF1b3RlZC1hdHRyaWJ1dGUtc2FmZSBtYXJrZXIgZm9yIHRoZSBmaXJzdCBleHByZXNzaW9uIGluXG4gICAgICAgICAgICAvLyBhbiBhdHRyaWJ1dGUuIFN1YnNlcXVlbnQgYXR0cmlidXRlIGV4cHJlc3Npb25zIHdpbGwgdXNlIG5vZGUgbWFya2VycyxcbiAgICAgICAgICAgIC8vIGFuZCB0aGlzIGlzIHNhZmUgc2luY2UgYXR0cmlidXRlcyB3aXRoIG11bHRpcGxlIGV4cHJlc3Npb25zIGFyZVxuICAgICAgICAgICAgLy8gZ3VhcmFudGVlZCB0byBiZSBxdW90ZWQuXG4gICAgICAgICAgICBsZXQgYWRkZWRNYXJrZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGh0bWwgKz0gcy5yZXBsYWNlKGxhc3RBdHRyaWJ1dGVOYW1lUmVnZXgsIChfbWF0Y2gsIHdoaXRlc3BhY2UsIG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgYWRkZWRNYXJrZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB3aGl0ZXNwYWNlICsgbmFtZSArIGJvdW5kQXR0cmlidXRlU3VmZml4ICsgdmFsdWUgKyBtYXJrZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghYWRkZWRNYXJrZXIpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9IG5vZGVNYXJrZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0bWwgKyB0aGlzLnN0cmluZ3NbZW5kSW5kZXhdO1xuICAgIH1cbiAgICBnZXRUZW1wbGF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGhpcy5nZXRIVE1MKCk7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG59XG4vKipcbiAqIEEgVGVtcGxhdGVSZXN1bHQgZm9yIFNWRyBmcmFnbWVudHMuXG4gKlxuICogVGhpcyBjbGFzcyB3cmFwcyBIVE1sIGluIGFuIGA8c3ZnPmAgdGFnIGluIG9yZGVyIHRvIHBhcnNlIGl0cyBjb250ZW50cyBpbiB0aGVcbiAqIFNWRyBuYW1lc3BhY2UsIHRoZW4gbW9kaWZpZXMgdGhlIHRlbXBsYXRlIHRvIHJlbW92ZSB0aGUgYDxzdmc+YCB0YWcgc28gdGhhdFxuICogY2xvbmVzIG9ubHkgY29udGFpbmVyIHRoZSBvcmlnaW5hbCBmcmFnbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNWR1RlbXBsYXRlUmVzdWx0IGV4dGVuZHMgVGVtcGxhdGVSZXN1bHQge1xuICAgIGdldEhUTUwoKSB7XG4gICAgICAgIHJldHVybiBgPHN2Zz4ke3N1cGVyLmdldEhUTUwoKX08L3N2Zz5gO1xuICAgIH1cbiAgICBnZXRUZW1wbGF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gc3VwZXIuZ2V0VGVtcGxhdGVFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50O1xuICAgICAgICBjb25zdCBzdmdFbGVtZW50ID0gY29udGVudC5maXJzdENoaWxkO1xuICAgICAgICBjb250ZW50LnJlbW92ZUNoaWxkKHN2Z0VsZW1lbnQpO1xuICAgICAgICByZXBhcmVudE5vZGVzKGNvbnRlbnQsIHN2Z0VsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZW1wbGF0ZS1yZXN1bHQuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBBbiBleHByZXNzaW9uIG1hcmtlciB3aXRoIGVtYmVkZGVkIHVuaXF1ZSBrZXkgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGhcbiAqIHBvc3NpYmxlIHRleHQgaW4gdGVtcGxhdGVzLlxuICovXG5leHBvcnQgY29uc3QgbWFya2VyID0gYHt7bGl0LSR7U3RyaW5nKE1hdGgucmFuZG9tKCkpLnNsaWNlKDIpfX19YDtcbi8qKlxuICogQW4gZXhwcmVzc2lvbiBtYXJrZXIgdXNlZCB0ZXh0LXBvc2l0aW9ucywgbXVsdGktYmluZGluZyBhdHRyaWJ1dGVzLCBhbmRcbiAqIGF0dHJpYnV0ZXMgd2l0aCBtYXJrdXAtbGlrZSB0ZXh0IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vZGVNYXJrZXIgPSBgPCEtLSR7bWFya2VyfS0tPmA7XG5leHBvcnQgY29uc3QgbWFya2VyUmVnZXggPSBuZXcgUmVnRXhwKGAke21hcmtlcn18JHtub2RlTWFya2VyfWApO1xuLyoqXG4gKiBTdWZmaXggYXBwZW5kZWQgdG8gYWxsIGJvdW5kIGF0dHJpYnV0ZSBuYW1lcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGJvdW5kQXR0cmlidXRlU3VmZml4ID0gJyRsaXQkJztcbi8qKlxuICogQW4gdXBkYXRlYWJsZSBUZW1wbGF0ZSB0aGF0IHRyYWNrcyB0aGUgbG9jYXRpb24gb2YgZHluYW1pYyBwYXJ0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlbXBsYXRlIHtcbiAgICBjb25zdHJ1Y3RvcihyZXN1bHQsIGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wYXJ0cyA9IFtdO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgbGV0IHBhcnRJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IG5vZGVzVG9SZW1vdmUgPSBbXTtcbiAgICAgICAgY29uc3QgX3ByZXBhcmVUZW1wbGF0ZSA9ICh0ZW1wbGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRlbXBsYXRlLmNvbnRlbnQ7XG4gICAgICAgICAgICAvLyBFZGdlIG5lZWRzIGFsbCA0IHBhcmFtZXRlcnMgcHJlc2VudDsgSUUxMSBuZWVkcyAzcmQgcGFyYW1ldGVyIHRvIGJlXG4gICAgICAgICAgICAvLyBudWxsXG4gICAgICAgICAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGNvbnRlbnQsIDEzMyAvKiBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHxcbiAgICAgICAgICAgICAgICAgICBOb2RlRmlsdGVyLlNIT1dfVEVYVCAqLywgbnVsbCwgZmFsc2UpO1xuICAgICAgICAgICAgLy8gVGhlIGFjdHVhbCBwcmV2aW91cyBub2RlLCBhY2NvdW50aW5nIGZvciByZW1vdmFsczogaWYgYSBub2RlIGlzIHJlbW92ZWRcbiAgICAgICAgICAgIC8vIGl0IHdpbGwgbmV2ZXIgYmUgdGhlIHByZXZpb3VzTm9kZS5cbiAgICAgICAgICAgIGxldCBwcmV2aW91c05vZGU7XG4gICAgICAgICAgICAvLyBVc2VkIHRvIHNldCBwcmV2aW91c05vZGUgYXQgdGhlIHRvcCBvZiB0aGUgbG9vcC5cbiAgICAgICAgICAgIGxldCBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNOb2RlID0gY3VycmVudE5vZGU7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGN1cnJlbnROb2RlID0gd2Fsa2VyLmN1cnJlbnROb2RlO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxIC8qIE5vZGUuRUxFTUVOVF9OT0RFICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IG5vZGUuYXR0cmlidXRlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05hbWVkTm9kZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF0dHJpYnV0ZXMgYXJlIG5vdCBndWFyYW50ZWVkIHRvIGJlIHJldHVybmVkIGluIGRvY3VtZW50IG9yZGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW4gcGFydGljdWxhciwgRWRnZS9JRSBjYW4gcmV0dXJuIHRoZW0gb3V0IG9mIG9yZGVyLCBzbyB3ZSBjYW5ub3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFzc3VtZSBhIGNvcnJlc3BvbmRhbmNlIGJldHdlZW4gcGFydCBpbmRleCBhbmQgYXR0cmlidXRlIGluZGV4LlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzW2ldLnZhbHVlLmluZGV4T2YobWFya2VyKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvdW50LS0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSB0ZW1wbGF0ZSBsaXRlcmFsIHNlY3Rpb24gbGVhZGluZyB1cCB0byB0aGUgZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleHByZXNzaW9uIGluIHRoaXMgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyaW5nRm9yUGFydCA9IHJlc3VsdC5zdHJpbmdzW3BhcnRJbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgYXR0cmlidXRlIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gbGFzdEF0dHJpYnV0ZU5hbWVSZWdleC5leGVjKHN0cmluZ0ZvclBhcnQpWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGNvcnJlc3BvbmRpbmcgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxsIGJvdW5kIGF0dHJpYnV0ZXMgaGF2ZSBoYWQgYSBzdWZmaXggYWRkZWQgaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUZW1wbGF0ZVJlc3VsdCNnZXRIVE1MIHRvIG9wdCBvdXQgb2Ygc3BlY2lhbCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGluZy4gVG8gbG9vayB1cCB0aGUgYXR0cmlidXRlIHZhbHVlIHdlIGFsc28gbmVlZCB0byBhZGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgc3VmZml4LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxvb2t1cE5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCkgKyBib3VuZEF0dHJpYnV0ZVN1ZmZpeDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZUxvb2t1cE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0cmluZ3MgPSBhdHRyaWJ1dGVWYWx1ZS5zcGxpdChtYXJrZXJSZWdleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJ0cy5wdXNoKHsgdHlwZTogJ2F0dHJpYnV0ZScsIGluZGV4LCBuYW1lLCBzdHJpbmdzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZUxvb2t1cE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRJbmRleCArPSBzdHJpbmdzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gJ1RFTVBMQVRFJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ByZXBhcmVUZW1wbGF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSAzIC8qIE5vZGUuVEVYVF9OT0RFICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZVZhbHVlLmluZGV4T2YobWFya2VyKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyaW5ncyA9IG5vZGVWYWx1ZS5zcGxpdChtYXJrZXJSZWdleCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHBhcnQgZm9yIGVhY2ggbWF0Y2ggZm91bmRcbiAgICAgICAgICAgICAgICAgICAgcGFydEluZGV4ICs9IGxhc3RJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgdGV4dCBub2RlIGZvciBlYWNoIGxpdGVyYWwgc2VjdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyBUaGVzZSBub2RlcyBhcmUgYWxzbyB1c2VkIGFzIHRoZSBtYXJrZXJzIGZvciBub2RlIHBhcnRzXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoKHN0cmluZ3NbaV0gPT09ICcnKSA/IGNyZWF0ZU1hcmtlcigpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHJpbmdzW2ldKSwgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnRzLnB1c2goeyB0eXBlOiAnbm9kZScsIGluZGV4OiBpbmRleCsrIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoc3RyaW5nc1tsYXN0SW5kZXhdID09PSAnJyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVNYXJrZXIoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHJpbmdzW2xhc3RJbmRleF0pLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXNUb1JlbW92ZS5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSA4IC8qIE5vZGUuQ09NTUVOVF9OT0RFICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVWYWx1ZSA9PT0gbWFya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgYSBuZXcgbWFya2VyIG5vZGUgdG8gYmUgdGhlIHN0YXJ0Tm9kZSBvZiB0aGUgUGFydCBpZiBhbnkgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgYXJlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgKiBXZSBkb24ndCBoYXZlIGEgcHJldmlvdXNTaWJsaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgKiBwcmV2aW91c1NpYmxpbmcgaXMgYmVpbmcgcmVtb3ZlZCAodGh1cyBpdCdzIG5vdCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGBwcmV2aW91c05vZGVgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICogcHJldmlvdXNTaWJsaW5nIGlzIG5vdCBhIFRleHQgbm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8oanVzdGluZmFnbmFuaSk6IFdlIHNob3VsZCBiZSBhYmxlIHRvIHVzZSB0aGUgcHJldmlvdXNOb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBoZXJlIGFzIHRoZSBtYXJrZXIgbm9kZSBhbmQgcmVkdWNlIHRoZSBudW1iZXIgb2YgZXh0cmEgbm9kZXMgd2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0byBhIHRlbXBsYXRlLiBTZWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Qb2x5bWVyTGFicy9saXQtaHRtbC9pc3N1ZXMvMTQ3XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c1NpYmxpbmcgPSBub2RlLnByZXZpb3VzU2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1NpYmxpbmcgPT09IG51bGwgfHwgcHJldmlvdXNTaWJsaW5nICE9PSBwcmV2aW91c05vZGUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NpYmxpbmcubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJ0cy5wdXNoKHsgdHlwZTogJ25vZGUnLCBpbmRleDogaW5kZXgrKyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzVG9SZW1vdmUucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBuZXh0U2libGluZyBhZGQgYSBtYXJrZXIgbm9kZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGhhdmUgdG8gY2hlY2sgaWYgdGhlIG5leHQgbm9kZSBpcyBnb2luZyB0byBiZSByZW1vdmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmVjYXVzZSB0aGF0IG5vZGUgd2lsbCBpbmR1Y2UgYSBuZXcgbWFya2VyIGlmIHNvLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubmV4dFNpYmxpbmcgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1hcmtlcigpLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZSA9IHByZXZpb3VzTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgoaSA9IG5vZGUubm9kZVZhbHVlLmluZGV4T2YobWFya2VyLCBpICsgMSkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbW1lbnQgbm9kZSBoYXMgYSBiaW5kaW5nIG1hcmtlciBpbnNpZGUsIG1ha2UgYW4gaW5hY3RpdmUgcGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBiaW5kaW5nIHdvbid0IHdvcmssIGJ1dCBzdWJzZXF1ZW50IGJpbmRpbmdzIHdpbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogY29uc2lkZXIgd2hldGhlciBpdCdzIGV2ZW4gd29ydGggaXQgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIGJpbmRpbmdzIGluIGNvbW1lbnRzIHdvcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnRzLnB1c2goeyB0eXBlOiAnbm9kZScsIGluZGV4OiAtMSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgX3ByZXBhcmVUZW1wbGF0ZShlbGVtZW50KTtcbiAgICAgICAgLy8gUmVtb3ZlIHRleHQgYmluZGluZyBub2RlcyBhZnRlciB0aGUgd2FsayB0byBub3QgZGlzdHVyYiB0aGUgVHJlZVdhbGtlclxuICAgICAgICBmb3IgKGNvbnN0IG4gb2Ygbm9kZXNUb1JlbW92ZSkge1xuICAgICAgICAgICAgbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IGlzVGVtcGxhdGVQYXJ0QWN0aXZlID0gKHBhcnQpID0+IHBhcnQuaW5kZXggIT09IC0xO1xuLy8gQWxsb3dzIGBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcnKWAgdG8gYmUgcmVuYW1lZCBmb3IgYVxuLy8gc21hbGwgbWFudWFsIHNpemUtc2F2aW5ncy5cbmV4cG9ydCBjb25zdCBjcmVhdGVNYXJrZXIgPSAoKSA9PiBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcnKTtcbi8qKlxuICogVGhpcyByZWdleCBleHRyYWN0cyB0aGUgYXR0cmlidXRlIG5hbWUgcHJlY2VkaW5nIGFuIGF0dHJpYnV0ZS1wb3NpdGlvblxuICogZXhwcmVzc2lvbi4gSXQgZG9lcyB0aGlzIGJ5IG1hdGNoaW5nIHRoZSBzeW50YXggYWxsb3dlZCBmb3IgYXR0cmlidXRlc1xuICogYWdhaW5zdCB0aGUgc3RyaW5nIGxpdGVyYWwgZGlyZWN0bHkgcHJlY2VkaW5nIHRoZSBleHByZXNzaW9uLCBhc3N1bWluZyB0aGF0XG4gKiB0aGUgZXhwcmVzc2lvbiBpcyBpbiBhbiBhdHRyaWJ1dGUtdmFsdWUgcG9zaXRpb24uXG4gKlxuICogU2VlIGF0dHJpYnV0ZXMgaW4gdGhlIEhUTUwgc3BlYzpcbiAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCNhdHRyaWJ1dGVzLTBcbiAqXG4gKiBcIlxcMC1cXHgxRlxceDdGLVxceDlGXCIgYXJlIFVuaWNvZGUgY29udHJvbCBjaGFyYWN0ZXJzXG4gKlxuICogXCIgXFx4MDlcXHgwYVxceDBjXFx4MGRcIiBhcmUgSFRNTCBzcGFjZSBjaGFyYWN0ZXJzOlxuICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2luZnJhc3RydWN0dXJlLmh0bWwjc3BhY2UtY2hhcmFjdGVyXG4gKlxuICogU28gYW4gYXR0cmlidXRlIGlzOlxuICogICogVGhlIG5hbWU6IGFueSBjaGFyYWN0ZXIgZXhjZXB0IGEgY29udHJvbCBjaGFyYWN0ZXIsIHNwYWNlIGNoYXJhY3RlciwgKCcpLFxuICogICAgKFwiKSwgXCI+XCIsIFwiPVwiLCBvciBcIi9cIlxuICogICogRm9sbG93ZWQgYnkgemVybyBvciBtb3JlIHNwYWNlIGNoYXJhY3RlcnNcbiAqICAqIEZvbGxvd2VkIGJ5IFwiPVwiXG4gKiAgKiBGb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgc3BhY2UgY2hhcmFjdGVyc1xuICogICogRm9sbG93ZWQgYnk6XG4gKiAgICAqIEFueSBjaGFyYWN0ZXIgZXhjZXB0IHNwYWNlLCAoJyksIChcIiksIFwiPFwiLCBcIj5cIiwgXCI9XCIsIChgKSwgb3JcbiAqICAgICogKFwiKSB0aGVuIGFueSBub24tKFwiKSwgb3JcbiAqICAgICogKCcpIHRoZW4gYW55IG5vbi0oJylcbiAqL1xuZXhwb3J0IGNvbnN0IGxhc3RBdHRyaWJ1dGVOYW1lUmVnZXggPSAvKFsgXFx4MDlcXHgwYVxceDBjXFx4MGRdKShbXlxcMC1cXHgxRlxceDdGLVxceDlGIFxceDA5XFx4MGFcXHgwY1xceDBkXCInPj0vXSspKFsgXFx4MDlcXHgwYVxceDBjXFx4MGRdKj1bIFxceDA5XFx4MGFcXHgwY1xceDBkXSooPzpbXiBcXHgwOVxceDBhXFx4MGNcXHgwZFwiJ2A8Pj1dKnxcIlteXCJdKnwnW14nXSopKSQvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGVtcGxhdGUuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuaW1wb3J0IHsgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yIH0gZnJvbSAnLi9saWIvZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMnO1xuaW1wb3J0IHsgU1ZHVGVtcGxhdGVSZXN1bHQsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtcmVzdWx0LmpzJztcbmV4cG9ydCB7IERlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvciwgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yIH0gZnJvbSAnLi9saWIvZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMnO1xuZXhwb3J0IHsgZGlyZWN0aXZlLCBpc0RpcmVjdGl2ZSB9IGZyb20gJy4vbGliL2RpcmVjdGl2ZS5qcyc7XG4vLyBUT0RPKGp1c3RpbmZhZ25hbmkpOiByZW1vdmUgbGluZSB3aGVuIHdlIGdldCBOb2RlUGFydCBtb3ZpbmcgbWV0aG9kc1xuZXhwb3J0IHsgcmVtb3ZlTm9kZXMsIHJlcGFyZW50Tm9kZXMgfSBmcm9tICcuL2xpYi9kb20uanMnO1xuZXhwb3J0IHsgbm9DaGFuZ2UgfSBmcm9tICcuL2xpYi9wYXJ0LmpzJztcbmV4cG9ydCB7IEF0dHJpYnV0ZUNvbW1pdHRlciwgQXR0cmlidXRlUGFydCwgQm9vbGVhbkF0dHJpYnV0ZVBhcnQsIEV2ZW50UGFydCwgaXNQcmltaXRpdmUsIE5vZGVQYXJ0LCBQcm9wZXJ0eUNvbW1pdHRlciwgUHJvcGVydHlQYXJ0IH0gZnJvbSAnLi9saWIvcGFydHMuanMnO1xuZXhwb3J0IHsgcGFydHMsIHJlbmRlciB9IGZyb20gJy4vbGliL3JlbmRlci5qcyc7XG5leHBvcnQgeyB0ZW1wbGF0ZUNhY2hlcywgdGVtcGxhdGVGYWN0b3J5IH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtZmFjdG9yeS5qcyc7XG5leHBvcnQgeyBUZW1wbGF0ZUluc3RhbmNlIH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtaW5zdGFuY2UuanMnO1xuZXhwb3J0IHsgU1ZHVGVtcGxhdGVSZXN1bHQsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtcmVzdWx0LmpzJztcbmV4cG9ydCB7IGNyZWF0ZU1hcmtlciwgaXNUZW1wbGF0ZVBhcnRBY3RpdmUsIFRlbXBsYXRlIH0gZnJvbSAnLi9saWIvdGVtcGxhdGUuanMnO1xuLyoqXG4gKiBJbnRlcnByZXRzIGEgdGVtcGxhdGUgbGl0ZXJhbCBhcyBhbiBIVE1MIHRlbXBsYXRlIHRoYXQgY2FuIGVmZmljaWVudGx5XG4gKiByZW5kZXIgdG8gYW5kIHVwZGF0ZSBhIGNvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGNvbnN0IGh0bWwgPSAoc3RyaW5ncywgLi4udmFsdWVzKSA9PiBuZXcgVGVtcGxhdGVSZXN1bHQoc3RyaW5ncywgdmFsdWVzLCAnaHRtbCcsIGRlZmF1bHRUZW1wbGF0ZVByb2Nlc3Nvcik7XG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIGFuIFNWRyB0ZW1wbGF0ZSB0aGF0IGNhbiBlZmZpY2llbnRseVxuICogcmVuZGVyIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzdmcgPSAoc3RyaW5ncywgLi4udmFsdWVzKSA9PiBuZXcgU1ZHVGVtcGxhdGVSZXN1bHQoc3RyaW5ncywgdmFsdWVzLCAnc3ZnJywgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpdC1odG1sLmpzLm1hcCIsIi8vIFJlZmxlY3QuY29uc3RydWN0b3IgcG9seWZpbGwgZm9yIElFMTEgc3VwcG9ydCBvZiBzdGFuZGFyZCB3ZWIgY29tcG9uZW50c1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBpZiAoISF3aW5kb3cuUmVmbGVjdCkgcmV0dXJuO1xuXG4gICAgd2luZG93LlJlZmxlY3QgPSB7XG4gICAgICAgIGNvbnN0cnVjdDogZnVuY3Rpb24gKHRhcmdldCwgYXJncywgbmV3VGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IChuZXcgV2Vha01hcCgpKS5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyICE9PSB1bmRlZmluZWQpIHJldHVybiBoYW5kbGVyLmNvbnN0cnVjdChoYW5kbGVyLnRhcmdldCwgYXJncywgbmV3VGFyZ2V0KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRhcmdldCBtdXN0IGJlIGEgZnVuY3Rpb246IFwiICsgdGFyZ2V0KTtcblxuICAgICAgICAgICAgaWYgKG5ld1RhcmdldCA9PT0gdW5kZWZpbmVkIHx8IG5ld1RhcmdldCA9PT0gdGFyZ2V0KSByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseSh0YXJnZXQsIFtudWxsXS5jb25jYXQoYXJncykpKTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VGFyZ2V0ICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJuZXcgdGFyZ2V0IG11c3QgYmUgYSBmdW5jdGlvbjogXCIgKyB0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb3RvID0gbmV3VGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSAoT2JqZWN0KHByb3RvKSA9PT0gcHJvdG8pID8gT2JqZWN0LmNyZWF0ZShwcm90bykgOiB7fTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCBpbnN0YW5jZSwgYXJncyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCA/IHJlc3VsdCA6IGluc3RhbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pKCk7IiwiaW1wb3J0IHsgQ3VzdG9tSFRNTEVsZW1lbnQsIGh0bWwgfSBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2N1c3RvbS13ZWItY29tcG9uZW50L2luZGV4LmpzXCI7XG5cbi8qKlxuICogSGVsbG9Xb3JsZENvbXBvbmVudFxuICogQSBzYW1wbGUgQ3VzdG9tIEhUTUwgRWxlbWVudCwgdG8gYmUgdXNlZCBpbiBhbnkgc3lzdGVtIHRoYXQgaXMgY2FwYWJsZSBvZiBvdXRwdXR0aW5nIEhUTUxcbiAqIEJ1aWxkIG9uIFdlYiBTdGFuZGFyZHMgYW5kIHBvbHlmaWxsZWQgZm9yIGxlZ2FjeSBicm93c2VycywgdXNpbmcgYSBzaW1wbGUgY2xlYW4gbGl0ZSBIVE1MIHRlbXBsYXRlIHJlbmRlcmluZyBjYWxsZWQgbGl0LWh0bWxcbiAqL1xuY2xhc3MgSGVsbG9Xb3JsZENvbXBvbmVudCBleHRlbmRzIEN1c3RvbUhUTUxFbGVtZW50IHtcbiAgICBcbiAgICAvKipcbiAgICAgKiB0ZW1wbGF0ZSgpXG4gICAgICogUmV0dXJuIGh0bWwgVGVtcGxhdGVSZXNvbHZlciBhIGxpc3Qgb2Ygb2JzZXJ2ZWQgcHJvcGVydGllcywgdGhhdCB3aWxsIGNhbGwgcHJvcGVydHlDaGFuZ2VkKCkgd2hlbiBtdXRhdGVkXG4gICAgICogQHJldHVybiB7VGVtcGxhdGVSZXN1bHR9IFJldHVybnMgYSBIVE1MIFRlbXBsYXRlUmVzdWx0IHRvIGJlIHVzZWQgZm9yIHRoZSBiYXNpcyBvZiB0aGUgZWxlbWVudHMgRE9NIHN0cnVjdHVyZSBcbiAgICAgKi9cbiAgICB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIGh0bWxgXG4gICAgICAgICAgICA8ZGl2IGlkPVwiaGVsbG8td29ybGQtY29tcG9uZW50XCI+XG4gICAgICAgICAgICAgICAgPHN0eWxlPlxuICAgICAgICAgICAgICAgICAgICAvKiBFbmNhcHN1bGF0ZSBhbGwgc3R5bGUgdG8gY29udGFpbmluZyBlbGVtZW50IGZvciBJRTExIHN1cHBvcnQgKi9cbiAgICAgICAgICAgICAgICAgICAgI2hlbGxvLXdvcmxkLWNvbXBvbmVudCBwIHsgZGlzcGxheTogYmxvY2s7IGJvcmRlcjogMnB4IHNvbGlkIHJlZDsgcGFkZGluZzogMjBweDsgY29sb3I6IHJlZDsgfVxuICAgICAgICAgICAgICAgIDwvc3R5bGU+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzbG90IG5hbWU9XCJtYWluXCI+SGVsbG88L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+Rk9POjwvc3Ryb25nPiAke3RoaXMuZm9vfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+QkFSOjwvc3Ryb25nPiAke3RoaXMuYmFyfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2xvdCBuYW1lPVwiZm9vdGVyXCI+V29ybGQ8L3Nsb3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPkJvbzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAc3RhdGljIEBnZXQgb2JzZXJ2ZWRQcm9wZXJ0aWVzKClcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIG9ic2VydmVkIHByb3BlcnRpZXMsIHRoYXQgd2lsbCBjYWxsIHByb3BlcnR5Q2hhbmdlZCgpIHdoZW4gbXV0YXRlZFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBMaXN0IG9mIHByb3BlcnRpZXMgdGhhdCB3aWxsIHByb21vdGUgdGhlIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBvbiBtdXRhdGlvbiBcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkUHJvcGVydGllcygpIHsgcmV0dXJuIFsnZm9vJywgJ2JhciddOyB9XG5cbiAgICAvKipcbiAgICAgKiBAc3RhdGljIEBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKClcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIG9ic2VydmVkIGF0dHJpYnV0ZXMsIHRoYXQgd2lsbCBjYWxsIGF0dHJpYnV0ZUNoYW5nZWQoKSB3aGVuIG11dGF0ZWRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gTGlzdCBvZiBhdHRyaWJ1dGVzIHRoYXQgd2lsbCBwcm9tb3RlIHRoZSBjYWxsYmFjayB0byBiZSBjYWxsZWQgb24gbXV0YXRpb24gXG4gICAgICovXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7IHJldHVybiBbJ2JhciddOyB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQHB1YmxpYyBjb25zdHJ1Y3RvcigpXG4gICAgICogSW52b2tlZCB3aGVuIGluc3RhbnRpYXRpb24gb2YgY2xhc3MgaGFwcGVuc1xuICAgICAqIE5PVEU6IENhbGwgc3VwZXIoKSBmaXJzdCFcbiAgICAgKiBOT1RFOiBEZWNsYXJlIGxvY2FsIHByb3BlcnRpZXMgaGVyZS4uLiBbdGhpcy5fX3ByaXZhdGUsIHRoaXMuX3Byb3RlY3RlZCwgdGhpcy5wdWJsaWNdIFxuICAgICAqIE5PVEU6IERlY2xhcmF0aW9ucyBhbmQga2ljayBzdGFydHMgb25seS4uLiBubyBidXNpbmVzcyBsb2dpYyBoZXJlIVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZm9vID0gJ0ZPTyEhJztcbiAgICAgICAgdGhpcy5iYXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYyBjb25uZWN0ZWQoKVxuICAgICAqIEludm9rZWQgd2hlbiBub2RlIGlzIGNvbm5lY3RlZC9hZGRlZCB0byB0aGUgRE9NXG4gICAgICovXG4gICAgY29ubmVjdGVkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY29ubmVjdGVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHB1YmxpYyBkaXNjb25uZWN0ZWQoKVxuICAgICAqIEludm9rZWQgd2hlbiBub2RlIGlzIGRpc2Nvbm5lY3RlZC9yZW1vdmVkIGZyb20gdGhlIERPTVxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rpc2Nvbm5lY3RlZCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwdWJsaWMgcHJvcGVydHlDaGFuZ2VkKClcbiAgICAgKiBJbnZva2VkIHdoZW4gYW4gb2JzZXJ2ZWQgaW5zdGFudGlhdGVkIHByb3BlcnR5IGhhcyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0aGF0IGNoYW5nZWQgXG4gICAgICogQHBhcmFtIHsqfSBvbGRWYWx1ZSBUaGUgb2xkIHZhbHVlIGJlZm9yZSBodGUgY2hhbmdlIFxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VmFsdWUgVGhlIG5ldyB2YWx1ZSBhZnRlciB0aGUgY2hhbmdlXG4gICAgICovXG4gICAgcHJvcGVydHlDaGFuZ2VkKHByb3BlcnR5LCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50YWdOYW1lLCAncHJvcGVydHlDaGFuZ2VkJywgcHJvcGVydHksIG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEBwdWJsaWMgYXR0cmlidXRlQ2hhbmdlZCgpXG4gICAgICogSW52b2tlZCB3aGVuIGFuIG9ic2VydmVkIG5vZGUgYXR0cmlidXRlIGhhcyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZSBUaGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRoYXQgY2hhbmdlZCBcbiAgICAgKiBAcGFyYW0geyp9IG9sZFZhbHVlIFRoZSBvbGQgdmFsdWUgYmVmb3JlIGh0ZSBjaGFuZ2UgXG4gICAgICogQHBhcmFtIHsqfSBuZXdWYWx1ZSBUaGUgbmV3IHZhbHVlIGFmdGVyIHRoZSBjaGFuZ2VcbiAgICAgKi9cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkKGF0dHJpYnV0ZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGFnTmFtZSwgJ2F0dHJpYnV0ZUNoYW5nZWQnLCBhdHRyaWJ1dGUsIG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gJ2JhcicpIHRoaXMuYmFyID0gbmV3VmFsdWU7XG5cbiAgICAgICAgdGhpcy51cGRhdGVUZW1wbGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwdWJsaWMgdXBkYXRlKCkgW3BhcmVudCBjbGFzc11cbiAgICAgKiBVcGRhdGUgdGhlIHZpZXcsIHB1c2hpbmcgb25seSBjaGFuZ2VzIGZvciB1cGRhdGUgaW4gc2hhZG93IERPTVxuICAgICAqL1xuICAgIHRlbXBsYXRlVXBkYXRlZCgpIHtcbiAgICAgICAgLy8gdGhpcy5kb20gd2lsbCByZXR1cm4geW91IHRoZSA8ZGl2IGlkPVwiaGVsbG8td29ybGQtY29tcG9uZW50XCI+PC9kaXY+IGVsZW1lbnQgaW5zdGFuY2Ugb2YgdGhpcyBzcGVjaWZpYyBpbnN0YW5jZSBvZiB0aGUgd2ViIGNvbXBvbmVudCBcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kb20sIHRoaXMudGFnTmFtZSwgJ3VwZGF0ZWQnKTtcbiAgICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaGVsbG8td29ybGQtY29tcG9uZW50JywgSGVsbG9Xb3JsZENvbXBvbmVudCk7Il19
