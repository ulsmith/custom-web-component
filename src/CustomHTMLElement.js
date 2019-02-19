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
	}

	/**
	 * default methods inherited from Custom Web Component
	 * connectedCallback(), disconnectedCallback(), attributeChangedCallback(), updateTemplate()...
	 * Bootstrap static methods for default custom web functionality
	 */
	connectedCallback() { CustomWebComponent.connectedCallback.call(this) }
	disconnectedCallback() { CustomWebComponent.disconnectedCallback.call(this) }
	attributeChangedCallback(property, oldValue, newValue) { CustomWebComponent.attributeChangedCallback.call(this, property, oldValue, newValue) }
	
	updateTemplate() {
		// debounce updates
		clearTimeout(this.updateTimeout);
		this.updateTimeout = setTimeout(() => CustomWebComponent.updateTemplate.call(this), 1);
	}

	host(options) {
		return !window.ShadyCSS ? (':host' + (options ? `(${options})` : '')) : this.localName + (options ? `${options}` : '');
	}

	dom() {
		return this.shadowRoot ? this.shadowRoot.getElementById(this.tagName.toLowerCase()) : this.getElementById(this.tagName.toLowerCase());
	}
}
