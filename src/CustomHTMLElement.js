import CustomWebComponent from './CustomWebComponent.js';

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
		this.updateTimeout;
		CustomWebComponent.bindProperties.call(this);
		setTimeout(() => CustomWebComponent.constructedCallback.call(this), 0);
	}

	/**
	 * default methods inherited from Custom Web Component
	 * connectedCallback(), disconnectedCallback(), attributeChangedCallback(), updateTemplate()...
	 * Bootstrap static methods for default custom web functionality
	 */
	connectedCallback() { setTimeout(() => CustomWebComponent.connectedCallback.call(this), 0) }
	disconnectedCallback() { CustomWebComponent.disconnectedCallback.call(this) }
	attributeChangedCallback(property, oldValue, newValue) { if (oldValue !== newValue) setTimeout(() => CustomWebComponent.attributeChangedCallback.call(this, property, oldValue, newValue), 0) }

	updateTemplate() {
		// debounce updates
		clearTimeout(this.updateTimeout);
		this.updateTimeout = setTimeout(() => CustomWebComponent.updateTemplate.call(this), 1);
	}
}
