import CustomHTMLElement from './src/CustomHTMLElement.js'

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
	CustomHTMLElement as CustomHTMLElement,
	html as html,
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
	render
}