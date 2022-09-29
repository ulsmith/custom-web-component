Custom Web Component
=======================

# 2.0.0

Major upgrade of lit htm. Removed all polyfills no longer needed, patched in all new lit html features

# 1.2.9

Fixed bug with attribute and property changes being surpress when using hte same component more than once.

# 1.2.8

Added aggrgated functions for attribute and property callbacks... you can now use attributesChanged and propertiesChanged for being informed when all attribute/property changes have taken place in this cycle. This has many advantages over property/attribute changed as it only fires once and only when all changes have happened. Please note this does not include hte value changed as many could have, it just informs you when all have changed for simpler update routines and reduced dom repaints 

# 1.2.6

Added customized built-in elements, allow extending of natural elements to go along with the autonomous element already in place. These work different, we extend them, we do not instantiate them, they also except no templates as they already have one.

# 1.2.4

IOS < 11 seems to have issues with DOM lifecycle and setting of attributes pre construction. Not a good place to sniff attributes on host.
Added a new life cycle hook called constructed() the place to put any set up of components, with contructer primarily used for registering properties.

# 1.2.3

Added in render to exported classes

# 1.2.0

Shady dom not being used to render non shadow dom browser and shadyCSS support not run, updated these and removed this.dom() use this.shadowRoot and this.host() use :host for both polyfilled and non polyfilled browser

# 1.1.1

Add the rest of lit-html through the CWC export, such as repeat and unsafeHTML directives

# 1.1.0

Major changes to lifecyle to ensure property and attribute callbacks not fired unless a change is detected as well as not firing until dom rendered at least once.

# 1.0.6

Missing oldValue from propertyChanged callback added

# 1.0.5

If you wrap your whole template in a html element and give it the id of the component name as you would use it in your html 'my-custom-element', this will be automatically resolved to this.dom inside the component once rendered and before call to this.templateUpdated.

This allows for encapsulating all style by prefixing with #my-custom-element ... in style for those browsers that do not support shadow dom yet (IE11).

Updated example, switch build to build script instead of gulp

Added updatedTemplate call back and updatedtemplate event

# 1.0.4

Seperated the CustomWebCOmponent func to a static class to enable it to be sued to create other custom components
and use parts of it such as extended existing components (babel compile issues so for now not pushing)

# 1.0.3

Changed update() function to updateTemplate() in line with other native functions i.e. updateStyle()
Added callback hook and event to updateTemplate() called templateupdated (event) templateUpdated() (hook)
