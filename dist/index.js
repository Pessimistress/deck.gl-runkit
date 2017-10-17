(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@runkit/value-viewer"), require("escodegen"), require("lave"));
	else if(typeof define === 'function' && define.amd)
		define(["@runkit/value-viewer", "escodegen", "lave"], factory);
	else if(typeof exports === 'object')
		exports["deckgl-runkit"] = factory(require("@runkit/value-viewer"), require("escodegen"), require("lave"));
	else
		root["deckgl-runkit"] = factory(root["@runkit/value-viewer"], root["escodegen"], root["lave"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHTMLFromDeckGLProps = getHTMLFromDeckGLProps;
exports.render = render;

var _valueViewer = __webpack_require__(4);

var _template = __webpack_require__(3);

var _template2 = _interopRequireDefault(_template);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CDN_URL = 'http://cdn.rawgit.com/Pessimistress/deck.gl-runkit/master/dist/';

function inject(key, target, string) {
  var startPattern = '/** START-' + key + ' **/';
  var endPattern = '/** END-' + key + ' **/';

  var startIndex = target.indexOf(startPattern);
  var endIndex = target.indexOf(endPattern);

  if (startIndex >= 0 && endIndex >= 0) {
    startIndex += startPattern.length;
    return target.slice(0, startIndex) + string + target.slice(endIndex);
  }

  return target;
}

function getHTMLFromDeckGLProps(props) {

  var globalVars = {
    MapboxAccessToken: process.env.MapboxAccessToken
  };

  var result = _template2.default.replace(/..\/dist\//g, CDN_URL);

  result = inject('GLOBAL-VARS', result, Object.keys(globalVars).map(function (key) {
    return 'const ' + key + ' = ' + globalVars[key] + ';';
  }).join('\n'));

  result = inject('USER-DATA', result, (0, _utils.propsToCode)(props));

  return result;
}

function render(props) {
  return Object.assign(props, _defineProperty({}, _valueViewer.ValueViewerSymbol, {
    title: 'deck.gl',
    HTML: getHTMLFromDeckGLProps(props)
  }));
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deckglViewer = __webpack_require__(0);

Object.keys(_deckglViewer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _deckglViewer[key];
    }
  });
});
Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _deckglViewer.render;
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsToCode = propsToCode;

var _lave = __webpack_require__(6);

var _lave2 = _interopRequireDefault(_lave);

var _escodegen = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function objectToCode(object) {
  var func = (0, _lave2.default)(object, { generate: _escodegen.generate, format: 'function' });
  return '(' + func.replace(/;$/, '') + ')()';
}

function propsToCode(props) {
  // encode layers separately
  var _props$layers = props.layers,
      layers = _props$layers === undefined ? [] : _props$layers;


  var otherProps = Object.assign({}, props, { layers: undefined });

  var layerProps = layers.filter(Boolean).map(function (layer) {
    return Object.assign({}, layer.props, { layerName: layer.constructor.layerName });
  });

  return '(function() {\nvar props = ' + objectToCode(otherProps) + ';\nvar layerProps = ' + objectToCode(layerProps) + ';\n\nprops.layers = layerProps.map(function(layer) {\n  var constructor = eval(\'DeckGL.\' + layer.layerName);\n  return new constructor(layer);\n});\n\nreturn props;\n})()';
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<html>\n<head>\n<script src='../dist/deckgl.min.js'></script>\n<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.41.0/mapbox-gl.js'></script>\n<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.41.0/mapbox-gl.css' rel='stylesheet' />\n<style>\n  body { margin:0; padding:0; }\n  #map, #deckgl { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }\n</style>\n</head>\n<body>\n  <div style=\"position: relative; width: 100%; height: 400px\">\n    <div id='map'></div>\n    <canvas id=\"deckgl\">\n  </div>\n</body>\n<script>\n  /** START-GLOBAL-VARS **/\n  const MapboxAccessToken = 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg';\n  /** END-GLOBAL-VARS **/\n\n  const defaultOpts = {\n    longitude: -122.45,\n    latitude: 37.8,\n    zoom: 12,\n    bearing: 0,\n    pitch: 0,\n    layers: [],\n    map: true\n  };\n\n  function onLoad(opts) {\n\n    opts = Object.assign({}, defaultOpts, opts);\n\n    const canvas = document.getElementById('deckgl');\n    const width = canvas.clientWidth;\n    const height = canvas.clientHeight;\n\n    mapboxgl.accessToken = MapboxAccessToken;\n\n    const onViewportChange = function(viewport) {\n      deckgl.setProps(Object.assign({}, viewport, {\n        // Hack: deckgl does not update without changing `layers` array\n        layers: deckgl.props.layers.slice(0)          \n      }));\n      controller.setProps(viewport);\n\n      if (map && Number.isFinite(viewport.longitude)) {\n        map.jumpTo({\n          center: [viewport.longitude, viewport.latitude],\n          zoom: viewport.zoom,\n          bearing: viewport.bearing,\n          pitch: viewport.pitch\n        });\n      }\n    }\n\n    const map = opts.map && new mapboxgl.Map({\n      container: 'map',\n      style: 'mapbox://styles/mapbox/dark-v9',\n      center: [opts.longitude, opts.latitude],\n      zoom: opts.zoom,\n      pitch: opts.pitch,\n      bearing: opts.bearing,\n      interactive: false\n    });\n\n    const deckgl = new DeckGL.experimental.DeckGLJS(Object.assign({}, opts, {\n      canvas,\n      width,\n      height\n    }));\n\n    const controller = new DeckGL.experimental.MapControllerJS(Object.assign({}, opts, {\n      canvas,\n      width,\n      height,\n      onViewportChange\n    }));\n\n    window.addEventListener('resize', function() {\n      onViewportChange({\n        width: canvas.clientWidth,\n        height: canvas.clientHeight\n      });\n    });\n  };\n\n  onLoad(\n  /** START-USER-DATA **/\n    {\n      longitude: -122.45,\n      latitude: 37.8,\n      zoom: 12,\n      pitch: 30,\n      layers: [\n        new DeckGL.ScatterplotLayer({\n          data: [\n            {position: [-122.45, 37.8], color: [255, 0, 0], radius: 100}\n          ]\n        })\n      ]\n    }\n  /** END-USER-DATA **/\n  );\n</script>\n</html>\n";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ })
/******/ ]);
});