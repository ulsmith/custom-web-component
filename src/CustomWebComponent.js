// native shadow dom
// import { render } from '../../lit-html/lit-html.js';
// shady dom support
import { render } from '../../lit-html/lib/shady-render.js';

/**
 * CustomHTMLElement
 * A sample extension to the basic HTML Element class, providing templating for web components through the lit-html library
 * Build on Web Standards, polyfilled for legacy browsers, using a simple clean lite HTML template rendering called lit-html
 * Extend this class to create a simple HTML Custome Element
 */
export default class CustomWebComponent {
	/**
	 * constructedCallback()
	 * Catch the constructed callback, ensures new JS tick for issues with IOS < 11
	 * follows up by bubbling the callback up to constructed() on child
	 */
	static constructedCallback() {
		if (typeof this.constructed === 'function') this.constructed.call(this);
	}
	
	/**
	 * connectedCallback()
	 * Catch the standard connected callback, rendering the template on instantiation
	 * follows up by bubbling the callback up to connected() on child
	 */
	static connectedCallback() {
		if (!this.isConnected) return;
        if (!!this.template) throw 'Ensure template is a static function for ' + this.localName;
		if (typeof this.constructor.template === 'function') CustomWebComponent.updateTemplate.call(this);
		if (typeof this.connected === 'function') this.connected.call(this);

		// shadyCSS support
		if (window.shadyCSS !== undefined) window.shadyCSS.styleElement(this);
	}

	/**
	 * disconnectedCallback()
	 * Catch the standard disconnected callback
	 * follows up by bubbling the callback up to disconnected() on child
	 */
	static disconnectedCallback() {
		if (this.isConnected) return;
		if (typeof this.disconnected === 'function') this.disconnected.call(this);
	}

	/**
	 * attributeChangedCallback()
	 * Catch the standard attributeChanged callback
	 * follows up by bubbling the callback up to attributeChanged() on child for attributes subscribed too
	 */
	static attributeChangedCallback(attribute, oldValue, newValue) {
		if (typeof this.attributeChanged === 'function') this.attributeChanged.call(this, attribute, oldValue, newValue);
	}

	/**
	 * __bindProperties()
	 * Internal method to bind properties and create a propertyChanged callback, also exposing an event of the same name
	 * use this callback or watch the event to be notified of property changes that are subscribed too
	 */
	static bindProperties() {
		if (!this.constructor.observedProperties || !this.constructor.observedProperties.length) return;

		this.__properties = {};

		for (const idx in this.constructor.observedProperties) {
			Object.defineProperty(this, this.constructor.observedProperties[idx], {
				get: function () { return this.__properties[this.constructor.observedProperties[idx]]; },
				set: function (value) {
					let oldValue = this.__properties[this.constructor.observedProperties[idx]];
					this.__properties[this.constructor.observedProperties[idx]] = value;
					if (this.isConnected && typeof this.propertyChanged === 'function') if (oldValue !== value) this.propertyChanged.call(this, this.constructor.observedProperties[idx], oldValue, value);
				}
			});
		}
	}

	/**
	 * updateTemplate()
	 * Inform the template of changes to properties by telling it to update
	 * uses lit-html to actively render a DOM template and only change stuff that needs changing!
	 */
	static updateTemplate() {
		if (!this.isConnected) return;

		render(this.constructor.template.call(this), this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' }), { scopeName: this.tagName.toLowerCase() });

		if (typeof this.templateUpdated === 'function') this.templateUpdated.call(this);
	}
}
