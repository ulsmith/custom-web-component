Custom Web Component
=======================

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