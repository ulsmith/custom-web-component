import './node_modules/reflect-constructor/reflect-constructor.js';
import './src/HelloWorldComponent.js';

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');