// ==UserScript==
// @id             iitc-plugin-zoom-tools@eccenux
// @name           IITC plugin: Zoom tools
// @category       Misc
// @version        0.0.1
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @description    [0.0.1] This plugin provides extra toolbar for accurate zoom to view all portals, ale links and whole region.
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// @updateURL      https://github.com/Eccenux/iitc-plugin-zoom-tools/raw/master/zoom-tools.meta.js
// @downloadURL    https://github.com/Eccenux/iitc-plugin-zoom-tools/raw/master/zoom-tools.user.js
// ==/UserScript==

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


//PLUGIN START ////////////////////////////////////////////////////////

//use own namespace for plugin
window.plugin.zoomTools = function() {};

/**
 * Very simple logger.
 */
function LOG() {
	var args = Array.prototype.slice.call(arguments); // Make real array from arguments
	args.unshift("[zoomTools] ");
	console.log.apply(console, args);
}
function LOGwarn() {
	var args = Array.prototype.slice.call(arguments); // Make real array from arguments
	args.unshift("[zoomTools] ");
	console.warn.apply(console, args);
}

/**
 * Zoom map to given value.
 */
window.plugin.zoomTools.zoomMap = function(zoom) {
	map.setZoom(zoom, {animate:false});
}

/**
 * Setup always visible content.
 */
window.plugin.zoomTools.setupContent = function() {
	// leaflet (sidebar buttons)
	$('.leaflet-control-container .leaflet-top.leaflet-left .leaflet-control-zoom').after(''
		+'<div class="leaflet-control-zoomTools leaflet-bar leaflet-control">'
		+'	<a href="#" onclick="plugin.zoomTools.zoomMap(15); return false" title="zoom to view portals">P</a>'
		+'	<a href="#" onclick="plugin.zoomTools.zoomMap(13); return false" title="zoom to view all links">L</a>'
		+'	<a href="#" onclick="plugin.zoomTools.zoomMap(10); return false" title="zoom to view region">R</a>'
		+'</div>'
	);
};

var setup = function() {
	window.plugin.zoomTools.setupContent();
};

//PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


