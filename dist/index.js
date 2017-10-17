(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@runkit/value-viewer"), require("escodegen"), require("lave"));
	else if(typeof define === 'function' && define.amd)
		define(["@runkit/value-viewer", "escodegen", "lave"], factory);
	else if(typeof exports === 'object')
		exports["deckgl-runkit"] = factory(require("@runkit/value-viewer"), require("escodegen"), require("lave"));
	else
		root["deckgl-runkit"] = factory(root["@runkit/value-viewer"], root["escodegen"], root["lave"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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

var _valueViewer = __webpack_require__(5);

var _template = __webpack_require__(4);

var _template2 = _interopRequireDefault(_template);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  longitude: -122.45,
  latitude: 37.8,
  zoom: 12,
  bearing: 0,
  pitch: 0,
  layers: [],
  style: { height: '400px' },
  map: true
};

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
  props = Object.assign({}, defaultProps, props);

  var globalVars = {
    MapboxAccessToken: process.env.MapboxAccessToken
  };

  var result = _template2.default;

  result = inject('GLOBAL-VARS', result, Object.keys(globalVars).map(function (key) {
    return 'const ' + key + ' = ' + JSON.stringify(globalVars[key]) + ';';
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
// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// Note: The numeric values here are matched by shader code in the
// "project" and "project64" shader modules. Both places need to be
// updated.

// TODO: Maybe "POSITIONS" would be a better name?
var COORDINATE_SYSTEM = exports.COORDINATE_SYSTEM = {
  // Positions are interpreted as [lng, lat, elevation]
  // lng lat are degrees, elevation is meters. distances as meters.
  LNGLAT: 1.0,

  // Positions are interpreted as meter offsets, distances as meters
  // Planned to deprecate in later versions
  METER_OFFSETS: 2.0,
  METERS: 2.0,

  // Positions are interpreted as lng lat offsets: [deltaLng, deltaLat, elevation]
  // deltaLng, deltaLat are delta degrees, elevation is meters.
  // distances as meters.
  LNGLAT_OFFSETS: 3.0,

  // Positions and distances are not transformed: [x, y, z] in unit coordinates
  IDENTITY: 0.0
};

var LIFECYCLE = exports.LIFECYCLE = {
  NO_STATE: 'Awaiting state',
  MATCHED: 'Matched. State transferred from previous layer',
  INITIALIZED: 'Intialized',
  AWAITING_GC: 'Discarded. Awaiting garbage collection',
  AWAITING_FINALIZATION: 'No longer matched. Awaiting garbage collection',
  FINALIZED: 'Finalized! Awaiting garbage collection'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2xpYi9jb25zdGFudHMuanMiXSwibmFtZXMiOlsiQ09PUkRJTkFURV9TWVNURU0iLCJMTkdMQVQiLCJNRVRFUl9PRkZTRVRTIiwiTUVURVJTIiwiTE5HTEFUX09GRlNFVFMiLCJJREVOVElUWSIsIkxJRkVDWUNMRSIsIk5PX1NUQVRFIiwiTUFUQ0hFRCIsIklOSVRJQUxJWkVEIiwiQVdBSVRJTkdfR0MiLCJBV0FJVElOR19GSU5BTElaQVRJT04iLCJGSU5BTElaRUQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ08sSUFBTUEsZ0RBQW9CO0FBQy9CO0FBQ0E7QUFDQUMsVUFBUSxHQUh1Qjs7QUFLL0I7QUFDQTtBQUNBQyxpQkFBZSxHQVBnQjtBQVEvQkMsVUFBUSxHQVJ1Qjs7QUFVL0I7QUFDQTtBQUNBO0FBQ0FDLGtCQUFnQixHQWJlOztBQWUvQjtBQUNBQyxZQUFVO0FBaEJxQixDQUExQjs7QUFtQkEsSUFBTUMsZ0NBQVk7QUFDdkJDLFlBQVUsZ0JBRGE7QUFFdkJDLFdBQVMsZ0RBRmM7QUFHdkJDLGVBQWEsWUFIVTtBQUl2QkMsZUFBYSx3Q0FKVTtBQUt2QkMseUJBQXVCLGdEQUxBO0FBTXZCQyxhQUFXO0FBTlksQ0FBbEIiLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE1IC0gMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8vIE5vdGU6IFRoZSBudW1lcmljIHZhbHVlcyBoZXJlIGFyZSBtYXRjaGVkIGJ5IHNoYWRlciBjb2RlIGluIHRoZVxuLy8gXCJwcm9qZWN0XCIgYW5kIFwicHJvamVjdDY0XCIgc2hhZGVyIG1vZHVsZXMuIEJvdGggcGxhY2VzIG5lZWQgdG8gYmVcbi8vIHVwZGF0ZWQuXG5cbi8vIFRPRE86IE1heWJlIFwiUE9TSVRJT05TXCIgd291bGQgYmUgYSBiZXR0ZXIgbmFtZT9cbmV4cG9ydCBjb25zdCBDT09SRElOQVRFX1NZU1RFTSA9IHtcbiAgLy8gUG9zaXRpb25zIGFyZSBpbnRlcnByZXRlZCBhcyBbbG5nLCBsYXQsIGVsZXZhdGlvbl1cbiAgLy8gbG5nIGxhdCBhcmUgZGVncmVlcywgZWxldmF0aW9uIGlzIG1ldGVycy4gZGlzdGFuY2VzIGFzIG1ldGVycy5cbiAgTE5HTEFUOiAxLjAsXG5cbiAgLy8gUG9zaXRpb25zIGFyZSBpbnRlcnByZXRlZCBhcyBtZXRlciBvZmZzZXRzLCBkaXN0YW5jZXMgYXMgbWV0ZXJzXG4gIC8vIFBsYW5uZWQgdG8gZGVwcmVjYXRlIGluIGxhdGVyIHZlcnNpb25zXG4gIE1FVEVSX09GRlNFVFM6IDIuMCxcbiAgTUVURVJTOiAyLjAsXG5cbiAgLy8gUG9zaXRpb25zIGFyZSBpbnRlcnByZXRlZCBhcyBsbmcgbGF0IG9mZnNldHM6IFtkZWx0YUxuZywgZGVsdGFMYXQsIGVsZXZhdGlvbl1cbiAgLy8gZGVsdGFMbmcsIGRlbHRhTGF0IGFyZSBkZWx0YSBkZWdyZWVzLCBlbGV2YXRpb24gaXMgbWV0ZXJzLlxuICAvLyBkaXN0YW5jZXMgYXMgbWV0ZXJzLlxuICBMTkdMQVRfT0ZGU0VUUzogMy4wLFxuXG4gIC8vIFBvc2l0aW9ucyBhbmQgZGlzdGFuY2VzIGFyZSBub3QgdHJhbnNmb3JtZWQ6IFt4LCB5LCB6XSBpbiB1bml0IGNvb3JkaW5hdGVzXG4gIElERU5USVRZOiAwLjBcbn07XG5cbmV4cG9ydCBjb25zdCBMSUZFQ1lDTEUgPSB7XG4gIE5PX1NUQVRFOiAnQXdhaXRpbmcgc3RhdGUnLFxuICBNQVRDSEVEOiAnTWF0Y2hlZC4gU3RhdGUgdHJhbnNmZXJyZWQgZnJvbSBwcmV2aW91cyBsYXllcicsXG4gIElOSVRJQUxJWkVEOiAnSW50aWFsaXplZCcsXG4gIEFXQUlUSU5HX0dDOiAnRGlzY2FyZGVkLiBBd2FpdGluZyBnYXJiYWdlIGNvbGxlY3Rpb24nLFxuICBBV0FJVElOR19GSU5BTElaQVRJT046ICdObyBsb25nZXIgbWF0Y2hlZC4gQXdhaXRpbmcgZ2FyYmFnZSBjb2xsZWN0aW9uJyxcbiAgRklOQUxJWkVEOiAnRmluYWxpemVkISBBd2FpdGluZyBnYXJiYWdlIGNvbGxlY3Rpb24nXG59O1xuIl19

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COORDINATE_SYSTEM = exports.DeckGL = exports.getHTMLFromDeckGLProps = exports.render = exports.GeoJsonLayer = exports.PolygonLayer = exports.PathLayer = exports.HexagonCellLayer = exports.HexagonLayer = exports.GridCellLayer = exports.GridLayer = exports.ScreenGridLayer = exports.ScatterplotLayer = exports.PointCloudLayer = exports.LineLayer = exports.IconLayer = exports.ArcLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(1);

Object.defineProperty(exports, 'COORDINATE_SYSTEM', {
  enumerable: true,
  get: function get() {
    return _constants.COORDINATE_SYSTEM;
  }
});

var _deckglViewer = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createDummyLayer(layerName) {
  var DummyLayer = function () {
    _createClass(DummyLayer, null, [{
      key: 'name',
      get: function get() {
        return layerName;
      }
    }]);

    function DummyLayer() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, DummyLayer);

      this.props = props;
    }

    return DummyLayer;
  }();

  DummyLayer.layerName = layerName;

  return DummyLayer;
}

/* Layers */
var ArcLayer = exports.ArcLayer = createDummyLayer('ArcLayer');
var IconLayer = exports.IconLayer = createDummyLayer('IconLayer');
var LineLayer = exports.LineLayer = createDummyLayer('LineLayer');
var PointCloudLayer = exports.PointCloudLayer = createDummyLayer('PointCloudLayer');
var ScatterplotLayer = exports.ScatterplotLayer = createDummyLayer('ScatterplotLayer');
var ScreenGridLayer = exports.ScreenGridLayer = createDummyLayer('ScreenGridLayer');
var GridLayer = exports.GridLayer = createDummyLayer('GridLayer');
var GridCellLayer = exports.GridCellLayer = createDummyLayer('GridCellLayer');
var HexagonLayer = exports.HexagonLayer = createDummyLayer('HexagonLayer');
var HexagonCellLayer = exports.HexagonCellLayer = createDummyLayer('HexagonCellLayer');
var PathLayer = exports.PathLayer = createDummyLayer('PathLayer');
var PolygonLayer = exports.PolygonLayer = createDummyLayer('PolygonLayer');
var GeoJsonLayer = exports.GeoJsonLayer = createDummyLayer('GeoJsonLayer');

/* Render functions */
exports.render = _deckglViewer.render;
exports.getHTMLFromDeckGLProps = _deckglViewer.getHTMLFromDeckGLProps;
var DeckGL = exports.DeckGL = _deckglViewer.render;

/* Constants */

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsToCode = propsToCode;

var _lave = __webpack_require__(7);

var _lave2 = _interopRequireDefault(_lave);

var _escodegen = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BAD_ARROW_FUNC = /function([^=>\.\{\}]*)=>/;

function objectToCode(object) {
  var func = (0, _lave2.default)(object, { generate: _escodegen.generate, format: 'function' });

  // Fix arrow function syntax
  while (BAD_ARROW_FUNC.test(func)) {
    func = func.replace(BAD_ARROW_FUNC, '$1=>');
  }

  // Remove trailing semicolon
  func = func.replace(/;$/, '');

  return '(' + func + ')()';
}

function propsToCode(props) {
  // encode layers separately
  var _props$layers = props.layers,
      layers = _props$layers === undefined ? [] : _props$layers;


  var otherProps = Object.assign({}, props, { layers: undefined });

  var layerProps = layers.filter(Boolean).map(function (layer) {
    var Layer = layer.constructor;
    var defaultProps = new Layer({}).props;
    var props = {};

    for (var key in layer.props) {
      if (layer.props[key] !== defaultProps[key]) {
        props[key] = layer.props[key];
      }
    }

    return {
      props: props,
      layerName: Layer.layerName
    };
  });

  return '(function() {\nvar props = ' + objectToCode(otherProps) + ';\nvar layerProps = ' + objectToCode(layerProps) + ';\n\nprops.layers = layerProps.map(function(layer) {\n  var constructor = eval(\'DeckGL.\' + layer.layerName);\n  return new constructor(layer.props);\n});\n\nreturn props;\n})()';
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<html>\n<head>\n<script src='https://cdn.rawgit.com/Pessimistress/deck.gl-runkit/master/dist/deckgl.min.js'></script>\n<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.41.0/mapbox-gl.js'></script>\n<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.41.0/mapbox-gl.css' rel='stylesheet' />\n<style>\n  body { margin:0; padding:0; }\n  #container { position: relative; width: 100%; height: 100vh; }\n  #map, #deckgl { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }\n</style>\n</head>\n<body>\n  <div id=\"container\">\n    <div id='map'></div>\n    <canvas id=\"deckgl\"></canvas>\n  </div>\n</body>\n<script>\n  /** START-GLOBAL-VARS **/\n  const MapboxAccessToken = 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg';\n  /** END-GLOBAL-VARS **/\n\n  function onLoad(opts) {\n    const container = document.getElementById('container');\n    for (const key in opts.style) {\n      container.style[key] = opts.style[key];\n    }\n\n    const canvas = document.getElementById('deckgl');\n    const width = canvas.clientWidth;\n    const height = canvas.clientHeight;\n\n    mapboxgl.accessToken = MapboxAccessToken;\n\n    const onViewportChange = function(viewport) {\n      deckgl.setProps(Object.assign({}, viewport, {\n        // Hack: deckgl does not update without changing `layers` array\n        layers: deckgl.props.layers.slice(0)          \n      }));\n      controller.setProps(viewport);\n\n      if (map && Number.isFinite(viewport.longitude)) {\n        map.jumpTo({\n          center: [viewport.longitude, viewport.latitude],\n          zoom: viewport.zoom,\n          bearing: viewport.bearing,\n          pitch: viewport.pitch\n        });\n      }\n    }\n\n    const map = opts.map && new mapboxgl.Map({\n      container: 'map',\n      style: 'mapbox://styles/mapbox/dark-v9',\n      center: [opts.longitude, opts.latitude],\n      zoom: opts.zoom,\n      pitch: opts.pitch || 0,\n      bearing: opts.bearing || 0,\n      interactive: false\n    });\n\n    const deckgl = new DeckGL.experimental.DeckGLJS(Object.assign({}, opts, {\n      canvas,\n      width,\n      height\n    }));\n\n    const controller = new DeckGL.experimental.MapControllerJS(Object.assign({}, opts, {\n      canvas,\n      width,\n      height,\n      onViewportChange\n    }));\n\n    window.addEventListener('resize', function() {\n      onViewportChange({\n        width: canvas.clientWidth,\n        height: canvas.clientHeight\n      });\n    });\n  };\n\n  onLoad(\n  /** START-USER-DATA **/\n    {\n      longitude: -122.45,\n      latitude: 37.8,\n      zoom: 12,\n      map: true,\n      layers: [\n        new DeckGL.ScatterplotLayer({\n          data: [\n            {position: [-122.45, 37.8], color: [255, 0, 0], radius: 100}\n          ]\n        })\n      ]\n    }\n  /** END-USER-DATA **/\n  );\n</script>\n</html>\n";

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ })
/******/ ]);
});