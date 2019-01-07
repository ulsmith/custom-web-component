import { render } from '../../lit-html/lit-html.js';

/**
 * CustomHTMLElement
 * A sample extension to the basic HTML Element class, providing templating for web components through the lit-html library
 * Build on Web Standards, polyfilled for legacy browsers, using a simple clean lite HTML template rendering called lit-html
 * Extend this class to create a simple HTML Custome Element
 */
export default class CustomWebComponent {
	/**
	 * connectedCallback()
	 * Catch the standard connected callback, rendering the template on instantiation
	 * follows up by bubbling the callback up to connected() on child
	 */
	static connectedCallback() {
		if (!this.isConnected) return;
		if (typeof this.connected === 'function') this.connected.call(this);
		if (typeof this.updateTemplate === 'function') CustomWebComponent.updateTemplate.call(this);
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
					if (typeof this.propertyChanged === 'function') this.propertyChanged.call(this, this.constructor.observedProperties[idx], value);
					this.dispatchEvent(new CustomEvent('propertychanged', { 'detail': { 'property': this.constructor.observedProperties[idx], 'oldValue': oldValue, 'newValue': value } }));
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
		render(this.template(), this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' }));

		this.dom = this.shadowRoot ? this.shadowRoot.getElementById(this.tagName.toLowerCase()) : this.getElementById(this.tagName.toLowerCase());
		
		if (typeof this.templateUpdated === 'function') this.templateUpdated.call(this);
		this.dispatchEvent(new CustomEvent('templateupdated'));
	}
}