Custom Web Component
=======================

# 1.0.4

Seperated the CustomWebCOmponent func to a static class to enabl eit to be sued to create other custom components
and use parts of it such as extended existing components (babel compile issues so for now not pushing)

# 1.0.3

Changed update() function to updateTemplate() in line with other native functions i.e. updateStyle()
Added callback hook and event to updateTemplate() called templateupdated (event) templateUpdated() (hook)