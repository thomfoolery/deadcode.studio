/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// create illo\nvar illo = new Zdog.Illustration({\n  // set canvas with selector\n  element: '#zdog-canvas',\n  dragRotate: true\n}); // D\n\nnew Zdog.Ellipse({\n  addTo: illo,\n  diameter: 80,\n  quarters: 2,\n  stroke: 20,\n  color: '#C25',\n  translate: {\n    x: -160\n  }\n}); // E\n\nnew Zdog.Shape({\n  addTo: illo,\n  radius: 50,\n  path: [{\n    x: -35,\n    y: -35\n  }, // start at top left\n  {\n    x: 35,\n    y: -35\n  }, // line to top right\n  {\n    move: {\n      x: -35,\n      y: 0\n    }\n  }, // move to bottom left\n  {\n    x: 35,\n    y: 0\n  }, // line to bottom right\n  {\n    move: {\n      x: -35,\n      y: 35\n    }\n  }, // move to bottom left\n  {\n    x: 35,\n    y: 35\n  }],\n  closed: false,\n  stroke: 20,\n  color: '#EA0',\n  translate: {\n    x: -40,\n    y: 0\n  }\n}); // A\n\nnew Zdog.Polygon({\n  addTo: illo,\n  radius: 50,\n  sides: 3,\n  stroke: 20,\n  color: '#EA0',\n  translate: {\n    x: 70,\n    y: 15\n  }\n}); // D\n\nnew Zdog.Ellipse({\n  addTo: illo,\n  diameter: 80,\n  quarters: 2,\n  stroke: 20,\n  color: '#C25',\n  translate: {\n    x: 160\n  }\n}); // C\n\nnew Zdog.Ellipse({\n  addTo: illo,\n  diameter: 80,\n  quarters: 2,\n  stroke: 20,\n  color: '#C25',\n  translate: {\n    x: -120,\n    y: 120\n  },\n  rotate: {\n    z: Zdog.TAU / 2\n  }\n}); // O\n\nnew Zdog.Ellipse({\n  addTo: illo,\n  diameter: 80,\n  stroke: 20,\n  color: '#C25',\n  translate: {\n    x: -40,\n    y: 120\n  }\n}); // D\n\nnew Zdog.Ellipse({\n  addTo: illo,\n  diameter: 80,\n  quarters: 2,\n  stroke: 20,\n  color: '#C25',\n  translate: {\n    x: 50,\n    y: 120\n  }\n}); // E\n\nnew Zdog.Shape({\n  addTo: illo,\n  radius: 50,\n  path: [{\n    x: -35,\n    y: -35\n  }, // start at top left\n  {\n    x: 35,\n    y: -35\n  }, // line to top right\n  {\n    move: {\n      x: -35,\n      y: 0\n    }\n  }, // move to bottom left\n  {\n    x: 35,\n    y: 0\n  }, // line to bottom right\n  {\n    move: {\n      x: -35,\n      y: 35\n    }\n  }, // move to bottom left\n  {\n    x: 35,\n    y: 35\n  }],\n  closed: false,\n  stroke: 20,\n  color: '#EA0',\n  translate: {\n    x: 180,\n    y: 120\n  }\n});\n\nfunction animate() {\n  // rotate illo each frame\n  // illo.rotate.y += 0.03;\n  illo.updateRenderGraph(); // animate next frame\n\n  requestAnimationFrame(animate);\n} // start animation\n\n\nanimate();\n\n//# sourceURL=webpack:///./src/scripts/main.js?");

/***/ })

/******/ });