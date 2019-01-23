import CustomWebComponent from './CustomWebComponent.js';

/**
 * CustomHTMLElement
 * A sample extension to the basic HTML Element class, providing templating for web components through the lit-html library
 * Build on Web Standards, polyfilled for legacy browsers, using a simple clean lite HTML template rendering called lit-html
 * Extend this class to create a simple HTML Custome Element
 */
export default class CustomHTMLButtonElement extends HTMLButtonElement {
    /**
	 * constructor()
	 * Create a simple HTML element and observe changes to properties
	 */
	constructor() {
		super();

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
}