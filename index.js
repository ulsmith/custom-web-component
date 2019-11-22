import CustomHTMLElement from './src/CustomHTMLElement.js'
import CustomHTMLAnchorElement from './src/CustomHTMLAnchorElement.js'
import CustomHTMLBodyElement from './src/CustomHTMLBodyElement.js'
import CustomHTMLHeadElement from './src/CustomHTMLHeadElement.js'
import CustomHTMLButtonElement from './src/CustomHTMLButtonElement.js'
import CustomHTMLCanvasElement from './src/CustomHTMLCanvasElement.js'
import CustomHTMLDivElement from './src/CustomHTMLDivElement.js'
import CustomHTMLFormElement from './src/CustomHTMLFormElement.js'
import CustomHTMLHeadingElement from './src/CustomHTMLHeadingElement.js'
import CustomHTMLIFrameElement from './src/CustomHTMLIFrameElement.js'
import CustomHTMLImageElement from './src/CustomHTMLImageElement.js'
import CustomHTMLInputElement from './src/CustomHTMLInputElement.js'
import CustomHTMLLabelElement from './src/CustomHTMLLabelElement.js'
import CustomHTMLParagraphElement from './src/CustomHTMLParagraphElement.js'
import CustomHTMLSelectElement from './src/CustomHTMLSelectElement.js'
import CustomHTMLSpanElement from './src/CustomHTMLSpanElement.js'
import CustomHTMLTableElement from './src/CustomHTMLTableElement.js'
import CustomHTMLTextAreaElement from './src/CustomHTMLTextAreaElement.js'

import { html } from '../lit-html/lit-html.js';
import { asyncReplace } from '../lit-html/directives/async-replace.js';
import { asyncAppend } from '../lit-html/directives/async-append.js';
import { cache } from '../lit-html/directives/cache.js';
import { classMap } from '../lit-html/directives/class-map.js';
import { ifDefined } from '../lit-html/directives/if-defined.js';
import { guard } from '../lit-html/directives/guard.js';
import { repeat } from '../lit-html/directives/repeat.js';
import { styleMap } from '../lit-html/directives/style-map.js';
import { unsafeHTML } from '../lit-html/directives/unsafe-html.js';
import { until } from '../lit-html/directives/until.js'; 
import { render } from '../lit-html/lib/shady-render.js';

export {
	CustomHTMLElement,
	CustomHTMLAnchorElement,
	CustomHTMLBodyElement,
	CustomHTMLHeadElement,
	CustomHTMLButtonElement,
	CustomHTMLCanvasElement,
	CustomHTMLDivElement,
	CustomHTMLFormElement,
	CustomHTMLHeadingElement,
	CustomHTMLIFrameElement,
	CustomHTMLImageElement,
	CustomHTMLInputElement,
	CustomHTMLLabelElement,
	CustomHTMLParagraphElement,
	CustomHTMLSelectElement,
	CustomHTMLSpanElement,
	CustomHTMLTableElement,
	CustomHTMLTextAreaElement,

	html,
	asyncReplace,
	asyncAppend,
	cache,
	classMap,
	ifDefined,
	guard,
	repeat,
	styleMap,
	unsafeHTML,
	until,
	render,
}
