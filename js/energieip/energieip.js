/**
 * eip
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.energieip = {})));
}(this, (function (exports) { 'use strict';

/**
 The eip namespace.

 @class eip
 @main eip
 @static
 @author EnergieIP / https://www.energie-ip.com/
 */
const address = '10.0.0.209:8888';
const weblink = 'http://'+address+'/';

energieip.Notifications = function () {
	var ws = new WebSocket("ws://" + address + "/events");

	ws.onmessage = function (evt) {
		console.log("=== Received " + evt.data);
	};

	ws.onclose = function() {
		console.log("connection close ");
	};

	ws.onerror = function() {
		console.log("connection on erreur ");
	};

}

exports.address = address;
exports.weblink = weblink;

Object.defineProperty(exports, '__esModule', { value: true });

})));
