import { CustomHTMLElement, html } from "../node_modules/custom-web-component/index.js";

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
            <div id="hello-world-component">
                <style>
                    /* Encapsulate all style to containing element for IE11 support */
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
                        <button @click="${this._clicked.bind(this, 'something')}">Boo</button>
                    </p>
                </div>
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
		console.log(this.tagName, 'propertyChanged', property, oldValue, newValue);

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
		console.log(this.tagName, 'attributeChanged', attribute, oldValue, newValue);

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
     * @public update() [parent class]
     * Update the view, pushing only changes for update in shadow DOM
     */
    templateUpdated() {
        console.log(this.shadowRoot, this.tagName, 'updated');
	}
	
	_clicked(text, ev) {
		alert(text);
	}
}

customElements.define('hello-world-component', HelloWorldComponent);