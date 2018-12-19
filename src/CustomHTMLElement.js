import { render } from '../../lit-html/lit-html.js';

/**
 * CustomHTMLElement
 * A sample extension to the basic HTML Element class, providing templating for web components through the lit-html library
 * Build on Web Standards, polyfilled for legacy browsers, using a simple clean lite HTML template rendering called lit-html
 * Extend this class to create a simple HTML Custome Element
 */
export default class CustomHTMLElement extends HTMLElement {
    /**
	 * constructor()
	 * Create a simple HTML element and observe changes to properties
	 */
	constructor() {
		super();

		this.__bindProperties();
	}

	/**
	 * connectedCallback()
	 * Catch the standard connected callback, rendering the template on instantiation
	 * follows up by bubbling the callback up to connected() on child
	 */
	connectedCallback() {
		if (!this.isConnected) return;
        this.update();
		if (typeof this.connected === 'function') this.connected.call();
	}

	/**
	 * disconnectedCallback()
	 * Catch the standard disconnected callback
	 * follows up by bubbling the callback up to disconnected() on child
	 */
	disconnectedCallback() {
		if (this.isConnected) return;
		if (typeof this.disconnected === 'function') this.disconnected.call();
	}

	/**
	 * attributeChangedCallback()
	 * Catch the standard attributeChanged callback
	 * follows up by bubbling the callback up to attributeChanged() on child for attributes subscribed too
	 */
	attributeChangedCallback(attribute, oldValue, newValue) {
		if (typeof this.attributeChanged === 'function') this.attributeChanged.call(this, attribute, oldValue, newValue);
	}

	/**
	 * __bindProperties()
	 * Internal method to bind properties and create a propertyChanged callback, also exposing an event of the same name
	 * use this callback or watch the event to be notified of property changes that are subscribed too
	 */
	__bindProperties() {
		if (!this.constructor.observedProperties || !this.constructor.observedProperties.length) return;

		this.__properties = {};

		for (const idx in this.constructor.observedProperties) {
			Object.defineProperty(this, this.constructor.observedProperties[idx], {
				get: function () { return this.__properties[this.constructor.observedProperties[idx]]; },
				set: function (value) {
					let oldValue = this.__properties[this.constructor.observedProperties[idx]];
					this.__properties[this.constructor.observedProperties[idx]] = value;
					if (typeof this.propertyChanged === 'function') this.propertyChanged.call(this, this.constructor.observedProperties[idx], value);
					this.dispatchEvent(new CustomEvent('propertychanged', { 'detail': { 'property': this.constructor.observedProperties[idx], 'oldValue': oldValue, 'newValue': value } }));
				}
			});
		}
	}

	/**
	 * update()
	 * Inform the template of changes to properties by telling it to update
	 * uses lit-html to actively render a DOM template and only change stuff that needs changing!
	 */
	update() {
		if (!this.isConnected) return;
		render(this.template(), this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' }) );
	}
}
