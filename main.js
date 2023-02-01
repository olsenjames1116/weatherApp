/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/capitalize.js":
/*!***************************!*\
  !*** ./src/capitalize.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ capitalizeFirstLetter)
/* harmony export */ });
// Capitalizes only the first letter to provide a more formal string
function capitalizeFirstLetter(string) {
  const words = string.split(' ');
  for (let i = 0; i < words.length; i += 1) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }
  return words.join(' ');
}

/***/ }),

/***/ "./src/conversions.js":
/*!****************************!*\
  !*** ./src/conversions.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertNodesToArray": () => (/* binding */ convertNodesToArray),
/* harmony export */   "convertResults": () => (/* binding */ convertResults),
/* harmony export */   "convertTemp": () => (/* binding */ convertTemp),
/* harmony export */   "convertWindUnits": () => (/* binding */ convertWindUnits)
/* harmony export */ });
// Converts nodelist to an array to access array prototype functions
function convertNodesToArray(nodeList) {
  return Array.from(nodeList);
}

// Any amount of strings will converted to numbers to allow for mathematical operations
function convertStringToNum() {
  const numbers = [];
  for (var _len = arguments.length, strings = new Array(_len), _key = 0; _key < _len; _key++) {
    strings[_key] = arguments[_key];
  }
  strings.forEach(string => {
    const number = parseFloat(string);
    numbers.push(number);
  });
  return numbers;
}

/* Temperature from the API call is originally given in Kelvin. To allow for a more recognizable 
    unit of measure, this is converted to Fahrenheit. There is a conversion button on the page that
    allows the user to convert to their preferred units (Celsius or Fahrenheit). This handles all of
    those conversions. */
function convertTemp(currentTemp, feelTemp, highTemp, lowTemp, tempUnits) {
  const temps = convertStringToNum(currentTemp, feelTemp, highTemp, lowTemp);
  if (tempUnits === 'C') {
    // Reached if the user has pressed the conversion button
    for (let i = 0; i < temps.length; i += 1) {
      const tempCelsius = temps[i];
      const tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
      temps[i] = tempFahrenheit;
    }
    temps[4] = 'F';
  } else if (tempUnits === 'F') {
    // Reached if the user has pressed the conversion button
    for (let i = 0; i < temps.length; i += 1) {
      const tempFahrenheit = temps[i];
      const tempCelsius = Math.round(5 / 9 * (tempFahrenheit - 32));
      temps[i] = tempCelsius;
    }
    temps[4] = 'C';
  } else {
    // Reached off the initial call with data from the API.
    for (let i = 0; i < temps.length; i += 1) {
      const tempKelvin = temps[i];
      const tempFahrenheit = Math.round(1.8 * (tempKelvin - 273.15) + 32);
      temps[i] = tempFahrenheit;
    }
    temps[4] = 'F';
  }
  return temps;
}

/* Directional data from the API call is returned in degrees. This function is used to
    create a more recognizable measurement for the user by converting direction to a cardinal
    direction. */
function convertWindDirection(direction) {
  let cardinalDirection;
  if (direction >= 337.5 && direction < 22.5) {
    cardinalDirection = 'N';
  } else if (direction >= 22.5 && direction < 67.5) {
    cardinalDirection = 'NE';
  } else if (direction >= 67.5 && direction < 112.5) {
    cardinalDirection = 'E';
  } else if (direction >= 112.5 && direction < 157.5) {
    cardinalDirection = 'SE';
  } else if (direction >= 157.5 && direction < 202.5) {
    cardinalDirection = 'S';
  } else if (direction >= 202.5 && direction < 247.5) {
    cardinalDirection = 'SW';
  } else if (direction >= 247.5 && direction < 292.5) {
    cardinalDirection = 'W';
  } else {
    cardinalDirection = 'NW';
  }
  return cardinalDirection;
}

/* Wind speed data from the API call is in m/s. This function is called first to convert units
    from m/s to mph. This will help give the user a more recognizable measurement. A conversion 
    button is included on the page that allows the user to convert to their preferred units (mph or kph).
    This function will handle all of those conversions. */
function convertWindUnits(windSpeed, units) {
  const windSpeedNum = convertStringToNum(windSpeed);
  let convertedWindSpeed;
  let convertedUnits;
  if (units === 'kph') {
    // Reached if the user has pressed the conversion button
    convertedWindSpeed = Math.round(windSpeedNum * 0.621371);
    convertedUnits = 'mph';
  } else if (units === 'mph') {
    // Reached if the user has pressed the conversion button
    convertedWindSpeed = Math.round(windSpeedNum * 1.60934);
    convertedUnits = 'kph';
  } else {
    // Reached on the initial call with data from the API.
    convertedWindSpeed = Math.round(windSpeedNum * 2.23694);
    convertedUnits = 'mph';
  }
  return {
    convertedWindSpeed,
    convertedUnits
  };
}

/* Pressure data from the API call is in hpa. This function converts from hpa to Hg. This
    provides the user with a more widely recognized unit. */
function convertPressure(pressure) {
  return (pressure * 0.02953).toFixed(2);
}

// Called from the index file to trigger the conversions from the original API call.
function convertResults(data) {
  const convertedTemps = convertTemp(data.main.temp, data.main.feels_like, data.main.temp_max, data.main.temp_min, 'K');
  const convertedDirection = convertWindDirection(data.wind.deg);
  const convertedSpeedUnits = convertWindUnits(data.wind.speed);
  const convertedPressure = convertPressure(data.main.pressure);
  return {
    convertedTemps,
    convertedDirection,
    convertedSpeedUnits,
    convertedPressure
  };
}

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayResults": () => (/* binding */ displayResults),
/* harmony export */   "displayTemps": () => (/* binding */ displayTemps),
/* harmony export */   "displayWind": () => (/* binding */ displayWind)
/* harmony export */ });
/* harmony import */ var _images_earth_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/earth.png */ "./src/images/earth.png");
/* harmony import */ var _capitalize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./capitalize */ "./src/capitalize.js");


const windElement = document.querySelector('span#wind');

// Adds a timestamp to the page from each weather query
function displayDateTime() {
  const currentDate = new Date();

  /* Months are provided on a scale starting with zero. Adding a one shifts 
  this scale and allows users to see a more widely recognizable scale. */
  let month = currentDate.getMonth() + 1;
  /* Adds a zero in front of single digit months to provide the user with a more 
  widely recognizable representation of the month. */
  if (month < 10) {
    month = `0${month}`;
  }
  let date = currentDate.getDate();
  /* Adds a zero in front of single digit dates to provide the user with a more 
  widely recognizable representation of the date. */
  if (date < 10) {
    date = `0${date}`;
  }
  const dateElement = document.querySelector('span#date');
  dateElement.textContent = `${month}/${date}/${currentDate.getFullYear()}`;
  const timeElement = document.querySelector('span#time');
  let hours = currentDate.getHours();

  /* Adds a zero in front of single digit hours to provide the user with a more 
  widely recognizable representation of the hour. */
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  /* Adds a zero in front of single digit minutes to provide the user with a more 
  widely recognizable representation of the minute. */
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  timeElement.textContent = `${hours}:${minutes}`;
}

/* Displays the queried location to the page so the user can confirm they are
 looking at their requested weather data. */
function displayLocation(city, country) {
  const header = document.querySelector('div.content>h2');
  header.textContent = `${city}, ${country}`;
}

/* Displays all temp information from the API call and updates when the user 
converts weather units. */
function displayTemps(temps) {
  const currentTempElement = document.querySelector('div.temp>span:first-child');
  currentTempElement.textContent = `${temps[0]}\xB0${temps[4]}`;
  const feelTempElement = document.querySelector('div.feel>span:nth-child(2)');
  feelTempElement.textContent = `${temps[1]}\xB0${temps[4]}`;
  const highTempElement = document.querySelector('div.high>span:nth-child(2)');
  highTempElement.textContent = `${temps[2]}\xB0${temps[4]}`;
  const lowTempElement = document.querySelector('div.low>span:nth-child(2)');
  lowTempElement.textContent = `${temps[3]}\xB0${temps[4]}`;
}

/* Makes a call to the OpenWeather url that corresponds to the icon data from the API call
    and displays it to the user so they can get a better visual representation of the current weather. */
async function displayWeatherIcon(icon) {
  const weatherIconElement = document.querySelector('img#weatherIcon');
  try {
    const {
      url
    } = image;
    weatherIconElement.src = url;
  } catch (error) {
    // Displays a default icon and error if the requested icon cannot be reached
    weatherIconElement.src = _images_earth_png__WEBPACK_IMPORTED_MODULE_0__;
    alert(error);
  }
}

// Displays a description of the weather from the API call to the user
function displayDescription(description) {
  const descriptionElement = document.querySelector('p#description');
  const descriptionFormatted = (0,_capitalize__WEBPACK_IMPORTED_MODULE_1__["default"])(description);
  descriptionElement.textContent = descriptionFormatted;
}

// Displays the humidity from the API call to the user
function displayHumidity(humidity) {
  const humidityElement = document.querySelector('span#humidity');
  humidityElement.textContent = `${humidity}%`;
}

/* Displays the wind information from the API call as well as the converted wind information
    at the user's request. */
function displayWind(direction, speed, units) {
  windElement.textContent = `${direction} ${speed} ${units}`;
}

// Displays the converted pressure from the API call to the user.
function displayPressure(pressure) {
  const pressureElement = document.querySelector('span#pressure');
  pressureElement.textContent = `${pressure}"`;
}

// Calls all the display weather functions after the API responds.
function displayWeather(data, results) {
  displayTemps(results.convertedTemps);
  displayWeatherIcon(data.weather[0].icon);
  displayDescription(data.weather[0].description);
  displayHumidity(data.main.humidity);
  displayWind(results.convertedDirection, results.convertedSpeedUnits.convertedWindSpeed, results.convertedSpeedUnits.convertedUnits);
  displayPressure(results.convertedPressure);
}

// Calls all the display functions after the API responds.
function displayResults(data, results) {
  displayLocation(data.name, data.sys.country);
  displayDateTime();
  displayWeather(data, results);
}

/***/ }),

/***/ "./src/validate.js":
/*!*************************!*\
  !*** ./src/validate.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "location": () => (/* binding */ location),
/* harmony export */   "validateInput": () => (/* binding */ validateInput)
/* harmony export */ });
const form = document.querySelector('form');
const searchBar = document.querySelector('input');
// eslint-disable-next-line import/no-mutable-exports
let location = 'New York';

// Clear search input after the user has submitted
function clearInput() {
  searchBar.value = '';
}

// Reached after a validity issue has been found from the user input.
function showSearchError() {
  if (searchBar.validity.valueMissing) {
    searchBar.setCustomValidity('Please enter a city');
  } else if (searchBar.validity.patternMismatch) {
    searchBar.setCustomValidity('Please only enter a city or a city followed with a comma and either a state (US only) or a country code. Ex: Denver, Colorado');
  } else {
    searchBar.setCustomValidity("");
  }
  searchBar.reportValidity();
}

// Reached after the user has submitted their input.
function validateInput() {
  if (form.checkValidity()) {
    location = searchBar.value;
    clearInput();
    return true;
  }
  showSearchError();
  return false;
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: #293241;\n  margin: 0;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n\ndiv.header {\n  background-color: #3d5a80;\n  color: #293241;\n  width: 100vw;\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n}\n\nform {\n  font-size: 1.2rem;\n  background-color: #e0fbfc;\n  padding: 10px;\n  color: #3d5a80;\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n}\n\nlabel {\n  display: flex;\n  align-items: center;\n}\n\ninput {\n  width: 300px;\n  height: 30px;\n  border: 0;\n  border-radius: 5px;\n  background-color: rgb(214, 212, 212);\n}\n\nform > div {\n  display: flex;\n  align-items: center;\n}\n\nbutton {\n  border: 0;\n  border-radius: 10px;\n  background-color: #ee6c4d;\n  color: #e0fbfc;\n}\n\nbutton:hover {\n  background-color: #f74215;\n}\n\ndiv.content {\n  background-color: #98c1d9;\n  color: #3d5a80;\n  font-size: 1.5rem;\n  margin-top: auto;\n  padding: 10px;\n  width: 50%;\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\nh2 {\n  margin: 0;\n  align-self: flex-start;\n}\n\ndiv.dateTime {\n  align-self: flex-start;\n}\n\ndiv.conditions {\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\np {\n  margin: 0;\n}\n\ndiv.temp > div:last-child {\n  padding: 5px;\n  display: flex;\n  justify-content: center;\n}\n\ndiv.wind > div:last-child {\n  padding: 5px;\n  display: flex;\n  justify-content: center;\n}\n\ndiv.footer {\n  background-color: #3d5a80;\n  color: #293241;\n  margin-top: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\na {\n  color: white;\n  text-decoration: none;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,SAAS;EACT,aAAa;EACb,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,iBAAiB;EACjB,yBAAyB;EACzB,aAAa;EACb,cAAc;EACd,aAAa;EACb,uBAAuB;EACvB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,SAAS;EACT,kBAAkB;EAClB,oCAAoC;AACtC;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,mBAAmB;EACnB,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,iBAAiB;EACjB,gBAAgB;EAChB,aAAa;EACb,UAAU;EACV,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,qBAAqB;AACvB","sourcesContent":["body {\n  background-color: #293241;\n  margin: 0;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n\ndiv.header {\n  background-color: #3d5a80;\n  color: #293241;\n  width: 100vw;\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n}\n\nform {\n  font-size: 1.2rem;\n  background-color: #e0fbfc;\n  padding: 10px;\n  color: #3d5a80;\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n}\n\nlabel {\n  display: flex;\n  align-items: center;\n}\n\ninput {\n  width: 300px;\n  height: 30px;\n  border: 0;\n  border-radius: 5px;\n  background-color: rgb(214, 212, 212);\n}\n\nform > div {\n  display: flex;\n  align-items: center;\n}\n\nbutton {\n  border: 0;\n  border-radius: 10px;\n  background-color: #ee6c4d;\n  color: #e0fbfc;\n}\n\nbutton:hover {\n  background-color: #f74215;\n}\n\ndiv.content {\n  background-color: #98c1d9;\n  color: #3d5a80;\n  font-size: 1.5rem;\n  margin-top: auto;\n  padding: 10px;\n  width: 50%;\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\nh2 {\n  margin: 0;\n  align-self: flex-start;\n}\n\ndiv.dateTime {\n  align-self: flex-start;\n}\n\ndiv.conditions {\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\np {\n  margin: 0;\n}\n\ndiv.temp > div:last-child {\n  padding: 5px;\n  display: flex;\n  justify-content: center;\n}\n\ndiv.wind > div:last-child {\n  padding: 5px;\n  display: flex;\n  justify-content: center;\n}\n\ndiv.footer {\n  background-color: #3d5a80;\n  color: #293241;\n  margin-top: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\na {\n  color: white;\n  text-decoration: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/earth.png":
/*!******************************!*\
  !*** ./src/images/earth.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "084a7e90f6f7104dcb65.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _conversions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversions */ "./src/conversions.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _validate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validate */ "./src/validate.js");




const submitButton = document.querySelector('[type=submit]');
const tempNums = document.querySelectorAll('span.tempNum');
const changeTempButton = document.querySelector('div.temp>div>button');
const windElement = document.querySelector('span#wind');
const changeWindSpeedButton = document.querySelector('div.wind>div>button');

// Retrieve text for all temperature information from the DOM to be converted at the user's request.
function getTempText(elementArray, separator) {
  const textArray = [];
  elementArray.forEach(element => {
    textArray.push(element.textContent);
  });
  const arrayString = textArray.join('');
  const temporaryArray = arrayString.split(separator);
  return [temporaryArray[0], temporaryArray[1].substring(1, 3), temporaryArray[2].substring(1, 3), temporaryArray[3].substring(1, 3), temporaryArray[4]];
}

// Retrieves API response from OpenWeather API on the page loading.
async function getWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${_validate__WEBPACK_IMPORTED_MODULE_3__.location}&appid=faefb21b364d236534cc9f8b0216f294`);
    const data = await response.json();
    const results = (0,_conversions__WEBPACK_IMPORTED_MODULE_1__.convertResults)(data);
    (0,_display__WEBPACK_IMPORTED_MODULE_2__.displayResults)(data, results);
  } catch (error) {
    alert(error);
  }
}

// Triggered after the user has entered and submitted a location in the search bar.
submitButton.addEventListener('click', event => {
  event.preventDefault();
  const validInput = (0,_validate__WEBPACK_IMPORTED_MODULE_3__.validateInput)();
  if (validInput) {
    getWeather();
  }
});

// Initiates the API call with default data on the page loading.
getWeather();

// Triggered after the user has selected to change the current temperature units.
changeTempButton.addEventListener('click', () => {
  const tempElementArray = (0,_conversions__WEBPACK_IMPORTED_MODULE_1__.convertNodesToArray)(tempNums);
  const tempArray = getTempText(tempElementArray, '\xB0');
  const tempNumArray = (0,_conversions__WEBPACK_IMPORTED_MODULE_1__.convertTemp)(tempArray[0], tempArray[1], tempArray[2], tempArray[3], tempArray[4]);
  (0,_display__WEBPACK_IMPORTED_MODULE_2__.displayTemps)(tempNumArray);
});

// Triggered after the user has selected to change the current wind speed units.
changeWindSpeedButton.addEventListener('click', () => {
  const windArray = windElement.textContent.split(' ');
  const convertedWind = (0,_conversions__WEBPACK_IMPORTED_MODULE_1__.convertWindUnits)(windArray[1], windArray[2]);
  (0,_display__WEBPACK_IMPORTED_MODULE_2__.displayWind)(windArray[0], convertedWind.convertedWindSpeed, convertedWind.convertedUnits);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UyxHQUFHdkYsV0FBVyxDQUFDVyxXQUFXLENBQUNuRSxLQUFLLENBQUMsR0FBRyxDQUFDO0VBQ3BELE1BQU1nSixhQUFhLEdBQUdoSCw4REFBZ0IsQ0FBQytHLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xFN0MscURBQVcsQ0FBQzZDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsYUFBYSxDQUFDNUcsa0JBQWtCLEVBQUU0RyxhQUFhLENBQUMzRyxjQUFjLENBQUM7QUFDN0YsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2NhcGl0YWxpemUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9jb252ZXJzaW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ2FwaXRhbGl6ZXMgb25seSB0aGUgZmlyc3QgbGV0dGVyIHRvIHByb3ZpZGUgYSBtb3JlIGZvcm1hbCBzdHJpbmdcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcbiAgICBjb25zdCB3b3JkcyA9IHN0cmluZy5zcGxpdCgnICcpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHdvcmRzW2ldID0gd29yZHNbaV1bMF0udG9VcHBlckNhc2UoKSArIHdvcmRzW2ldLnN1YnN0cmluZygxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZHMuam9pbignICcpO1xufVxuIiwiLy8gQ29udmVydHMgbm9kZWxpc3QgdG8gYW4gYXJyYXkgdG8gYWNjZXNzIGFycmF5IHByb3RvdHlwZSBmdW5jdGlvbnNcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0Tm9kZXNUb0FycmF5KG5vZGVMaXN0KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20obm9kZUxpc3QpO1xufVxuXG4vLyBBbnkgYW1vdW50IG9mIHN0cmluZ3Mgd2lsbCBjb252ZXJ0ZWQgdG8gbnVtYmVycyB0byBhbGxvdyBmb3IgbWF0aGVtYXRpY2FsIG9wZXJhdGlvbnNcbmZ1bmN0aW9uIGNvbnZlcnRTdHJpbmdUb051bSguLi5zdHJpbmdzKSB7XG4gICAgY29uc3QgbnVtYmVycyA9IFtdO1xuXG4gICAgc3RyaW5ncy5mb3JFYWNoKChzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgbnVtYmVyID0gcGFyc2VGbG9hdChzdHJpbmcpO1xuICAgICAgICBudW1iZXJzLnB1c2gobnVtYmVyKTtcbiAgICB9KVxuXG4gICAgcmV0dXJuIG51bWJlcnM7XG59XG5cbi8qIFRlbXBlcmF0dXJlIGZyb20gdGhlIEFQSSBjYWxsIGlzIG9yaWdpbmFsbHkgZ2l2ZW4gaW4gS2VsdmluLiBUbyBhbGxvdyBmb3IgYSBtb3JlIHJlY29nbml6YWJsZSBcbiAgICB1bml0IG9mIG1lYXN1cmUsIHRoaXMgaXMgY29udmVydGVkIHRvIEZhaHJlbmhlaXQuIFRoZXJlIGlzIGEgY29udmVyc2lvbiBidXR0b24gb24gdGhlIHBhZ2UgdGhhdFxuICAgIGFsbG93cyB0aGUgdXNlciB0byBjb252ZXJ0IHRvIHRoZWlyIHByZWZlcnJlZCB1bml0cyAoQ2Vsc2l1cyBvciBGYWhyZW5oZWl0KS4gVGhpcyBoYW5kbGVzIGFsbCBvZlxuICAgIHRob3NlIGNvbnZlcnNpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUZW1wKGN1cnJlbnRUZW1wLCBmZWVsVGVtcCwgaGlnaFRlbXAsIGxvd1RlbXAsIHRlbXBVbml0cykge1xuICAgIGNvbnN0IHRlbXBzID0gY29udmVydFN0cmluZ1RvTnVtKGN1cnJlbnRUZW1wLCBmZWVsVGVtcCwgaGlnaFRlbXAsIGxvd1RlbXApO1xuXG4gICAgaWYgKHRlbXBVbml0cyA9PT0gJ0MnKSB7XG4gICAgICAgIC8vIFJlYWNoZWQgaWYgdGhlIHVzZXIgaGFzIHByZXNzZWQgdGhlIGNvbnZlcnNpb24gYnV0dG9uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBDZWxzaXVzID0gdGVtcHNbaV07XG4gICAgICAgICAgICBjb25zdCB0ZW1wRmFocmVuaGVpdCA9IE1hdGgucm91bmQodGVtcENlbHNpdXMgKiA5IC8gNSArIDMyKTtcbiAgICAgICAgICAgIHRlbXBzW2ldID0gdGVtcEZhaHJlbmhlaXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0ZW1wc1s0XSA9ICdGJztcblxuICAgIH0gZWxzZSBpZiAodGVtcFVuaXRzID09PSAnRicpIHtcbiAgICAgICAgLy8gUmVhY2hlZCBpZiB0aGUgdXNlciBoYXMgcHJlc3NlZCB0aGUgY29udmVyc2lvbiBidXR0b25cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcEZhaHJlbmhlaXQgPSB0ZW1wc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBDZWxzaXVzID0gTWF0aC5yb3VuZCg1IC8gOSAqICh0ZW1wRmFocmVuaGVpdCAtIDMyKSk7XG4gICAgICAgICAgICB0ZW1wc1tpXSA9IHRlbXBDZWxzaXVzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGVtcHNbNF0gPSAnQyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVhY2hlZCBvZmYgdGhlIGluaXRpYWwgY2FsbCB3aXRoIGRhdGEgZnJvbSB0aGUgQVBJLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wS2VsdmluID0gdGVtcHNbaV07XG4gICAgICAgICAgICBjb25zdCB0ZW1wRmFocmVuaGVpdCA9IE1hdGgucm91bmQoMS44ICogKHRlbXBLZWx2aW4gLSAyNzMuMTUpICsgMzIpO1xuICAgICAgICAgICAgdGVtcHNbaV0gPSB0ZW1wRmFocmVuaGVpdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRlbXBzWzRdID0gJ0YnO1xuICAgIH1cblxuICAgIHJldHVybiB0ZW1wcztcbn1cblxuLyogRGlyZWN0aW9uYWwgZGF0YSBmcm9tIHRoZSBBUEkgY2FsbCBpcyByZXR1cm5lZCBpbiBkZWdyZWVzLiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG9cbiAgICBjcmVhdGUgYSBtb3JlIHJlY29nbml6YWJsZSBtZWFzdXJlbWVudCBmb3IgdGhlIHVzZXIgYnkgY29udmVydGluZyBkaXJlY3Rpb24gdG8gYSBjYXJkaW5hbFxuICAgIGRpcmVjdGlvbi4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRXaW5kRGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgIGxldCBjYXJkaW5hbERpcmVjdGlvbjtcblxuICAgIGlmIChkaXJlY3Rpb24gPj0gMzM3LjUgJiYgZGlyZWN0aW9uIDwgMjIuNSkge1xuICAgICAgICBjYXJkaW5hbERpcmVjdGlvbiA9ICdOJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA+PSAyMi41ICYmIGRpcmVjdGlvbiA8IDY3LjUpIHtcbiAgICAgICAgY2FyZGluYWxEaXJlY3Rpb24gPSAnTkUnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID49IDY3LjUgJiYgZGlyZWN0aW9uIDwgMTEyLjUpIHtcbiAgICAgICAgY2FyZGluYWxEaXJlY3Rpb24gPSAnRSc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPj0gMTEyLjUgJiYgZGlyZWN0aW9uIDwgMTU3LjUpIHtcbiAgICAgICAgY2FyZGluYWxEaXJlY3Rpb24gPSAnU0UnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID49IDE1Ny41ICYmIGRpcmVjdGlvbiA8IDIwMi41KSB7XG4gICAgICAgIGNhcmRpbmFsRGlyZWN0aW9uID0gJ1MnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID49IDIwMi41ICYmIGRpcmVjdGlvbiA8IDI0Ny41KSB7XG4gICAgICAgIGNhcmRpbmFsRGlyZWN0aW9uID0gJ1NXJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA+PSAyNDcuNSAmJiBkaXJlY3Rpb24gPCAyOTIuNSkge1xuICAgICAgICBjYXJkaW5hbERpcmVjdGlvbiA9ICdXJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYXJkaW5hbERpcmVjdGlvbiA9ICdOVyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcmRpbmFsRGlyZWN0aW9uO1xufVxuXG4vKiBXaW5kIHNwZWVkIGRhdGEgZnJvbSB0aGUgQVBJIGNhbGwgaXMgaW4gbS9zLiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBmaXJzdCB0byBjb252ZXJ0IHVuaXRzXG4gICAgZnJvbSBtL3MgdG8gbXBoLiBUaGlzIHdpbGwgaGVscCBnaXZlIHRoZSB1c2VyIGEgbW9yZSByZWNvZ25pemFibGUgbWVhc3VyZW1lbnQuIEEgY29udmVyc2lvbiBcbiAgICBidXR0b24gaXMgaW5jbHVkZWQgb24gdGhlIHBhZ2UgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gY29udmVydCB0byB0aGVpciBwcmVmZXJyZWQgdW5pdHMgKG1waCBvciBrcGgpLlxuICAgIFRoaXMgZnVuY3Rpb24gd2lsbCBoYW5kbGUgYWxsIG9mIHRob3NlIGNvbnZlcnNpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRXaW5kVW5pdHMod2luZFNwZWVkLCB1bml0cykge1xuICAgIGNvbnN0IHdpbmRTcGVlZE51bSA9IGNvbnZlcnRTdHJpbmdUb051bSh3aW5kU3BlZWQpO1xuICAgIGxldCBjb252ZXJ0ZWRXaW5kU3BlZWQ7XG4gICAgbGV0IGNvbnZlcnRlZFVuaXRzO1xuXG4gICAgaWYgKHVuaXRzID09PSAna3BoJykge1xuICAgICAgICAvLyBSZWFjaGVkIGlmIHRoZSB1c2VyIGhhcyBwcmVzc2VkIHRoZSBjb252ZXJzaW9uIGJ1dHRvblxuICAgICAgICBjb252ZXJ0ZWRXaW5kU3BlZWQgPSBNYXRoLnJvdW5kKHdpbmRTcGVlZE51bSAqIDAuNjIxMzcxKTtcbiAgICAgICAgY29udmVydGVkVW5pdHMgPSAnbXBoJztcbiAgICB9IGVsc2UgaWYgKHVuaXRzID09PSAnbXBoJykge1xuICAgICAgICAvLyBSZWFjaGVkIGlmIHRoZSB1c2VyIGhhcyBwcmVzc2VkIHRoZSBjb252ZXJzaW9uIGJ1dHRvblxuICAgICAgICBjb252ZXJ0ZWRXaW5kU3BlZWQgPSBNYXRoLnJvdW5kKHdpbmRTcGVlZE51bSAqIDEuNjA5MzQpO1xuICAgICAgICBjb252ZXJ0ZWRVbml0cyA9ICdrcGgnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlYWNoZWQgb24gdGhlIGluaXRpYWwgY2FsbCB3aXRoIGRhdGEgZnJvbSB0aGUgQVBJLlxuICAgICAgICBjb252ZXJ0ZWRXaW5kU3BlZWQgPSBNYXRoLnJvdW5kKHdpbmRTcGVlZE51bSAqIDIuMjM2OTQpO1xuICAgICAgICBjb252ZXJ0ZWRVbml0cyA9ICdtcGgnO1xuICAgIH1cblxuICAgIHJldHVybiB7IGNvbnZlcnRlZFdpbmRTcGVlZCwgY29udmVydGVkVW5pdHMgfTtcbn1cblxuLyogUHJlc3N1cmUgZGF0YSBmcm9tIHRoZSBBUEkgY2FsbCBpcyBpbiBocGEuIFRoaXMgZnVuY3Rpb24gY29udmVydHMgZnJvbSBocGEgdG8gSGcuIFRoaXNcbiAgICBwcm92aWRlcyB0aGUgdXNlciB3aXRoIGEgbW9yZSB3aWRlbHkgcmVjb2duaXplZCB1bml0LiAqL1xuZnVuY3Rpb24gY29udmVydFByZXNzdXJlKHByZXNzdXJlKSB7XG4gICAgcmV0dXJuIChwcmVzc3VyZSAqIDAuMDI5NTMpLnRvRml4ZWQoMik7XG59XG5cbi8vIENhbGxlZCBmcm9tIHRoZSBpbmRleCBmaWxlIHRvIHRyaWdnZXIgdGhlIGNvbnZlcnNpb25zIGZyb20gdGhlIG9yaWdpbmFsIEFQSSBjYWxsLlxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRSZXN1bHRzKGRhdGEpIHtcbiAgICBjb25zdCBjb252ZXJ0ZWRUZW1wcyA9IGNvbnZlcnRUZW1wKGRhdGEubWFpbi50ZW1wLCBkYXRhLm1haW4uZmVlbHNfbGlrZSwgZGF0YS5tYWluLnRlbXBfbWF4LCBkYXRhLm1haW4udGVtcF9taW4sICdLJyk7XG4gICAgY29uc3QgY29udmVydGVkRGlyZWN0aW9uID0gY29udmVydFdpbmREaXJlY3Rpb24oZGF0YS53aW5kLmRlZyk7XG4gICAgY29uc3QgY29udmVydGVkU3BlZWRVbml0cyA9IGNvbnZlcnRXaW5kVW5pdHMoZGF0YS53aW5kLnNwZWVkKTtcbiAgICBjb25zdCBjb252ZXJ0ZWRQcmVzc3VyZSA9IGNvbnZlcnRQcmVzc3VyZShkYXRhLm1haW4ucHJlc3N1cmUpO1xuXG4gICAgcmV0dXJuIHsgY29udmVydGVkVGVtcHMsIGNvbnZlcnRlZERpcmVjdGlvbiwgY29udmVydGVkU3BlZWRVbml0cywgY29udmVydGVkUHJlc3N1cmUgfTtcbn0iLCJpbXBvcnQgZWFydGggZnJvbSAnLi9pbWFnZXMvZWFydGgucG5nJztcbmltcG9ydCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgZnJvbSBcIi4vY2FwaXRhbGl6ZVwiO1xuXG5jb25zdCB3aW5kRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4jd2luZCcpO1xuXG4vLyBBZGRzIGEgdGltZXN0YW1wIHRvIHRoZSBwYWdlIGZyb20gZWFjaCB3ZWF0aGVyIHF1ZXJ5XG5mdW5jdGlvbiBkaXNwbGF5RGF0ZVRpbWUoKSB7XG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIFxuICAgIC8qIE1vbnRocyBhcmUgcHJvdmlkZWQgb24gYSBzY2FsZSBzdGFydGluZyB3aXRoIHplcm8uIEFkZGluZyBhIG9uZSBzaGlmdHMgXG4gICAgdGhpcyBzY2FsZSBhbmQgYWxsb3dzIHVzZXJzIHRvIHNlZSBhIG1vcmUgd2lkZWx5IHJlY29nbml6YWJsZSBzY2FsZS4gKi9cbiAgICBsZXQgbW9udGggPSBjdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAvKiBBZGRzIGEgemVybyBpbiBmcm9udCBvZiBzaW5nbGUgZGlnaXQgbW9udGhzIHRvIHByb3ZpZGUgdGhlIHVzZXIgd2l0aCBhIG1vcmUgXG4gICAgd2lkZWx5IHJlY29nbml6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9udGguICovXG4gICAgaWYgKG1vbnRoIDwgMTApIHtcbiAgICAgICAgbW9udGggPSBgMCR7bW9udGh9YDtcbiAgICB9XG5cbiAgICBsZXQgZGF0ZSA9IGN1cnJlbnREYXRlLmdldERhdGUoKTtcbiAgICAvKiBBZGRzIGEgemVybyBpbiBmcm9udCBvZiBzaW5nbGUgZGlnaXQgZGF0ZXMgdG8gcHJvdmlkZSB0aGUgdXNlciB3aXRoIGEgbW9yZSBcbiAgICB3aWRlbHkgcmVjb2duaXphYmxlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlLiAqL1xuICAgIGlmIChkYXRlIDwgMTApIHtcbiAgICAgICAgZGF0ZSA9IGAwJHtkYXRlfWA7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzcGFuI2RhdGUnKTtcbiAgICBkYXRlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke21vbnRofS8ke2RhdGV9LyR7Y3VycmVudERhdGUuZ2V0RnVsbFllYXIoKX1gO1xuICAgIFxuICAgIGNvbnN0IHRpbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbiN0aW1lJyk7XG5cbiAgICBsZXQgaG91cnMgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xuXG4gICAgLyogQWRkcyBhIHplcm8gaW4gZnJvbnQgb2Ygc2luZ2xlIGRpZ2l0IGhvdXJzIHRvIHByb3ZpZGUgdGhlIHVzZXIgd2l0aCBhIG1vcmUgXG4gICAgd2lkZWx5IHJlY29nbml6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgaG91ci4gKi9cbiAgICBpZiAoaG91cnMgPCAxMCkge1xuICAgICAgICBob3VycyA9IGAwJHtob3Vyc31gO1xuICAgIH1cblxuICAgIGxldCBtaW51dGVzID0gY3VycmVudERhdGUuZ2V0TWludXRlcygpO1xuICAgIC8qIEFkZHMgYSB6ZXJvIGluIGZyb250IG9mIHNpbmdsZSBkaWdpdCBtaW51dGVzIHRvIHByb3ZpZGUgdGhlIHVzZXIgd2l0aCBhIG1vcmUgXG4gICAgd2lkZWx5IHJlY29nbml6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWludXRlLiAqL1xuICAgIGlmIChtaW51dGVzIDwgMTApIHtcbiAgICAgICAgbWludXRlcyA9IGAwJHttaW51dGVzfWA7XG4gICAgfVxuXG4gICAgdGltZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtob3Vyc306JHttaW51dGVzfWA7XG59XG5cbi8qIERpc3BsYXlzIHRoZSBxdWVyaWVkIGxvY2F0aW9uIHRvIHRoZSBwYWdlIHNvIHRoZSB1c2VyIGNhbiBjb25maXJtIHRoZXkgYXJlXG4gbG9va2luZyBhdCB0aGVpciByZXF1ZXN0ZWQgd2VhdGhlciBkYXRhLiAqL1xuZnVuY3Rpb24gZGlzcGxheUxvY2F0aW9uKGNpdHksIGNvdW50cnkpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuY29udGVudD5oMicpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGAke2NpdHl9LCAke2NvdW50cnl9YDtcbn1cblxuLyogRGlzcGxheXMgYWxsIHRlbXAgaW5mb3JtYXRpb24gZnJvbSB0aGUgQVBJIGNhbGwgYW5kIHVwZGF0ZXMgd2hlbiB0aGUgdXNlciBcbmNvbnZlcnRzIHdlYXRoZXIgdW5pdHMuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVRlbXBzKHRlbXBzKSB7XG4gICAgY29uc3QgY3VycmVudFRlbXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LnRlbXA+c3BhbjpmaXJzdC1jaGlsZCcpO1xuICAgIGN1cnJlbnRUZW1wRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RlbXBzWzBdfVxceEIwJHt0ZW1wc1s0XX1gO1xuXG4gICAgY29uc3QgZmVlbFRlbXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmZlZWw+c3BhbjpudGgtY2hpbGQoMiknKTtcbiAgICBmZWVsVGVtcEVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHt0ZW1wc1sxXX1cXHhCMCR7dGVtcHNbNF19YDtcblxuICAgIGNvbnN0IGhpZ2hUZW1wRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5oaWdoPnNwYW46bnRoLWNoaWxkKDIpJyk7XG4gICAgaGlnaFRlbXBFbGVtZW50LnRleHRDb250ZW50ID0gYCR7dGVtcHNbMl19XFx4QjAke3RlbXBzWzRdfWA7XG5cbiAgICBjb25zdCBsb3dUZW1wRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5sb3c+c3BhbjpudGgtY2hpbGQoMiknKTtcbiAgICBsb3dUZW1wRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RlbXBzWzNdfVxceEIwJHt0ZW1wc1s0XX1gO1xufVxuXG4vKiBNYWtlcyBhIGNhbGwgdG8gdGhlIE9wZW5XZWF0aGVyIHVybCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBpY29uIGRhdGEgZnJvbSB0aGUgQVBJIGNhbGxcbiAgICBhbmQgZGlzcGxheXMgaXQgdG8gdGhlIHVzZXIgc28gdGhleSBjYW4gZ2V0IGEgYmV0dGVyIHZpc3VhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCB3ZWF0aGVyLiAqL1xuYXN5bmMgZnVuY3Rpb24gZGlzcGxheVdlYXRoZXJJY29uKGljb24pIHtcbiAgICBjb25zdCB3ZWF0aGVySWNvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbWcjd2VhdGhlckljb24nKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB7dXJsfSA9IGltYWdlO1xuICAgICAgICB3ZWF0aGVySWNvbkVsZW1lbnQuc3JjID0gdXJsO1xuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgLy8gRGlzcGxheXMgYSBkZWZhdWx0IGljb24gYW5kIGVycm9yIGlmIHRoZSByZXF1ZXN0ZWQgaWNvbiBjYW5ub3QgYmUgcmVhY2hlZFxuICAgICAgICB3ZWF0aGVySWNvbkVsZW1lbnQuc3JjID0gZWFydGg7XG4gICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICB9XG59XG5cbi8vIERpc3BsYXlzIGEgZGVzY3JpcHRpb24gb2YgdGhlIHdlYXRoZXIgZnJvbSB0aGUgQVBJIGNhbGwgdG8gdGhlIHVzZXJcbmZ1bmN0aW9uIGRpc3BsYXlEZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AjZGVzY3JpcHRpb24nKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbkZvcm1hdHRlZCA9IGNhcGl0YWxpemVGaXJzdExldHRlcihkZXNjcmlwdGlvbik7XG4gICAgZGVzY3JpcHRpb25FbGVtZW50LnRleHRDb250ZW50ID0gZGVzY3JpcHRpb25Gb3JtYXR0ZWQ7XG59XG5cbi8vIERpc3BsYXlzIHRoZSBodW1pZGl0eSBmcm9tIHRoZSBBUEkgY2FsbCB0byB0aGUgdXNlclxuZnVuY3Rpb24gZGlzcGxheUh1bWlkaXR5KGh1bWlkaXR5KSB7XG4gICAgY29uc3QgaHVtaWRpdHlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbiNodW1pZGl0eScpO1xuICAgIGh1bWlkaXR5RWxlbWVudC50ZXh0Q29udGVudCA9IGAke2h1bWlkaXR5fSVgO1xufVxuXG4vKiBEaXNwbGF5cyB0aGUgd2luZCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBBUEkgY2FsbCBhcyB3ZWxsIGFzIHRoZSBjb252ZXJ0ZWQgd2luZCBpbmZvcm1hdGlvblxuICAgIGF0IHRoZSB1c2VyJ3MgcmVxdWVzdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5V2luZChkaXJlY3Rpb24sIHNwZWVkLCB1bml0cykge1xuICAgIHdpbmRFbGVtZW50LnRleHRDb250ZW50ID0gYCR7ZGlyZWN0aW9ufSAke3NwZWVkfSAke3VuaXRzfWA7XG59XG5cbi8vIERpc3BsYXlzIHRoZSBjb252ZXJ0ZWQgcHJlc3N1cmUgZnJvbSB0aGUgQVBJIGNhbGwgdG8gdGhlIHVzZXIuXG5mdW5jdGlvbiBkaXNwbGF5UHJlc3N1cmUocHJlc3N1cmUpIHtcbiAgICBjb25zdCBwcmVzc3VyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzcGFuI3ByZXNzdXJlJyk7XG4gICAgcHJlc3N1cmVFbGVtZW50LnRleHRDb250ZW50ID0gYCR7cHJlc3N1cmV9XCJgO1xufVxuXG4vLyBDYWxscyBhbGwgdGhlIGRpc3BsYXkgd2VhdGhlciBmdW5jdGlvbnMgYWZ0ZXIgdGhlIEFQSSByZXNwb25kcy5cbmZ1bmN0aW9uIGRpc3BsYXlXZWF0aGVyKGRhdGEsIHJlc3VsdHMpIHtcbiAgICBkaXNwbGF5VGVtcHMocmVzdWx0cy5jb252ZXJ0ZWRUZW1wcyk7XG4gICAgZGlzcGxheVdlYXRoZXJJY29uKGRhdGEud2VhdGhlclswXS5pY29uKTtcbiAgICBkaXNwbGF5RGVzY3JpcHRpb24oZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uKTtcbiAgICBkaXNwbGF5SHVtaWRpdHkoZGF0YS5tYWluLmh1bWlkaXR5KTtcbiAgICBkaXNwbGF5V2luZChyZXN1bHRzLmNvbnZlcnRlZERpcmVjdGlvbiwgcmVzdWx0cy5jb252ZXJ0ZWRTcGVlZFVuaXRzLmNvbnZlcnRlZFdpbmRTcGVlZCwgcmVzdWx0cy5jb252ZXJ0ZWRTcGVlZFVuaXRzLmNvbnZlcnRlZFVuaXRzKTtcbiAgICBkaXNwbGF5UHJlc3N1cmUocmVzdWx0cy5jb252ZXJ0ZWRQcmVzc3VyZSk7XG59XG5cbi8vIENhbGxzIGFsbCB0aGUgZGlzcGxheSBmdW5jdGlvbnMgYWZ0ZXIgdGhlIEFQSSByZXNwb25kcy5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UmVzdWx0cyhkYXRhLCByZXN1bHRzKSB7XG4gICAgZGlzcGxheUxvY2F0aW9uKGRhdGEubmFtZSwgZGF0YS5zeXMuY291bnRyeSk7XG4gICAgZGlzcGxheURhdGVUaW1lKCk7XG4gICAgZGlzcGxheVdlYXRoZXIoZGF0YSwgcmVzdWx0cyk7XG59XG4iLCJjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG5sZXQgbG9jYXRpb24gPSAnTmV3IFlvcmsnO1xuXG4vLyBDbGVhciBzZWFyY2ggaW5wdXQgYWZ0ZXIgdGhlIHVzZXIgaGFzIHN1Ym1pdHRlZFxuZnVuY3Rpb24gY2xlYXJJbnB1dCgpIHtcbiAgICBzZWFyY2hCYXIudmFsdWUgPSAnJztcbn1cblxuLy8gUmVhY2hlZCBhZnRlciBhIHZhbGlkaXR5IGlzc3VlIGhhcyBiZWVuIGZvdW5kIGZyb20gdGhlIHVzZXIgaW5wdXQuXG5mdW5jdGlvbiBzaG93U2VhcmNoRXJyb3IoKSB7XG4gICAgaWYgKHNlYXJjaEJhci52YWxpZGl0eS52YWx1ZU1pc3NpbmcpIHtcbiAgICAgICAgc2VhcmNoQmFyLnNldEN1c3RvbVZhbGlkaXR5KCdQbGVhc2UgZW50ZXIgYSBjaXR5Jyk7XG4gICAgfSBlbHNlIGlmIChzZWFyY2hCYXIudmFsaWRpdHkucGF0dGVybk1pc21hdGNoKSB7XG4gICAgICAgIHNlYXJjaEJhci5zZXRDdXN0b21WYWxpZGl0eSgnUGxlYXNlIG9ubHkgZW50ZXIgYSBjaXR5IG9yIGEgY2l0eSBmb2xsb3dlZCB3aXRoIGEgY29tbWEgYW5kIGVpdGhlciBhIHN0YXRlIChVUyBvbmx5KSBvciBhIGNvdW50cnkgY29kZS4gRXg6IERlbnZlciwgQ29sb3JhZG8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hCYXIuc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XG4gICAgfVxuXG4gICAgc2VhcmNoQmFyLnJlcG9ydFZhbGlkaXR5KCk7XG59XG5cbi8vIFJlYWNoZWQgYWZ0ZXIgdGhlIHVzZXIgaGFzIHN1Ym1pdHRlZCB0aGVpciBpbnB1dC5cbmZ1bmN0aW9uIHZhbGlkYXRlSW5wdXQoKSB7XG4gICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgIGxvY2F0aW9uID0gc2VhcmNoQmFyLnZhbHVlO1xuICAgICAgICBjbGVhcklucHV0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gXG5cbiAgICBzaG93U2VhcmNoRXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCB7IGxvY2F0aW9uLCB2YWxpZGF0ZUlucHV0IH0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5MzI0MTtcXG4gIG1hcmdpbjogMDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuZGl2LmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q1YTgwO1xcbiAgY29sb3I6ICMyOTMyNDE7XFxuICB3aWR0aDogMTAwdnc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbmZvcm0ge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBmYmZjO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGNvbG9yOiAjM2Q1YTgwO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG5sYWJlbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaW5wdXQge1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIxNCwgMjEyLCAyMTIpO1xcbn1cXG5cXG5mb3JtID4gZGl2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgYm9yZGVyOiAwO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZTZjNGQ7XFxuICBjb2xvcjogI2UwZmJmYztcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNzQyMTU7XFxufVxcblxcbmRpdi5jb250ZW50IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5OGMxZDk7XFxuICBjb2xvcjogIzNkNWE4MDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICB3aWR0aDogNTAlO1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmgyIHtcXG4gIG1hcmdpbjogMDtcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcblxcbmRpdi5kYXRlVGltZSB7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG5kaXYuY29uZGl0aW9ucyB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbnAge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5kaXYudGVtcCA+IGRpdjpsYXN0LWNoaWxkIHtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuZGl2LndpbmQgPiBkaXY6bGFzdC1jaGlsZCB7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdi5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkNWE4MDtcXG4gIGNvbG9yOiAjMjkzMjQxO1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYSB7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsU0FBUztFQUNULGFBQWE7RUFDYixhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixjQUFjO0VBQ2QsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixTQUFTO0VBQ1Qsa0JBQWtCO0VBQ2xCLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsbUJBQW1CO0VBQ25CLHlCQUF5QjtFQUN6QixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLHFCQUFxQjtBQUN2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTMyNDE7XFxuICBtYXJnaW46IDA7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbmRpdi5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkNWE4MDtcXG4gIGNvbG9yOiAjMjkzMjQxO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG5mb3JtIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZmJmYztcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBjb2xvcjogIzNkNWE4MDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxubGFiZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmlucHV0IHtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTQsIDIxMiwgMjEyKTtcXG59XFxuXFxuZm9ybSA+IGRpdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWU2YzRkO1xcbiAgY29sb3I6ICNlMGZiZmM7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjc0MjE1O1xcbn1cXG5cXG5kaXYuY29udGVudCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOThjMWQ5O1xcbiAgY29sb3I6ICMzZDVhODA7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgd2lkdGg6IDUwJTtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5oMiB7XFxuICBtYXJnaW46IDA7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG5kaXYuZGF0ZVRpbWUge1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG59XFxuXFxuZGl2LmNvbmRpdGlvbnMge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5wIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuZGl2LnRlbXAgPiBkaXY6bGFzdC1jaGlsZCB7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdi53aW5kID4gZGl2Omxhc3QtY2hpbGQge1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzZDVhODA7XFxuICBjb2xvcjogIzI5MzI0MTtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmEge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBjb252ZXJ0Tm9kZXNUb0FycmF5LCBjb252ZXJ0VGVtcCwgY29udmVydFdpbmRVbml0cywgY29udmVydFJlc3VsdHMgfSBmcm9tICcuL2NvbnZlcnNpb25zJztcbmltcG9ydCB7IGRpc3BsYXlUZW1wcywgZGlzcGxheVdpbmQsIGRpc3BsYXlSZXN1bHRzIH0gZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCB7IGxvY2F0aW9uLCB2YWxpZGF0ZUlucHV0IH0gZnJvbSAnLi92YWxpZGF0ZSc7XG5cbmNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPXN1Ym1pdF0nKTtcbmNvbnN0IHRlbXBOdW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3Bhbi50ZW1wTnVtJyk7XG5jb25zdCBjaGFuZ2VUZW1wQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LnRlbXA+ZGl2PmJ1dHRvbicpO1xuY29uc3Qgd2luZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzcGFuI3dpbmQnKTtcbmNvbnN0IGNoYW5nZVdpbmRTcGVlZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi53aW5kPmRpdj5idXR0b24nKTtcblxuLy8gUmV0cmlldmUgdGV4dCBmb3IgYWxsIHRlbXBlcmF0dXJlIGluZm9ybWF0aW9uIGZyb20gdGhlIERPTSB0byBiZSBjb252ZXJ0ZWQgYXQgdGhlIHVzZXIncyByZXF1ZXN0LlxuZnVuY3Rpb24gZ2V0VGVtcFRleHQoZWxlbWVudEFycmF5LCBzZXBhcmF0b3IpIHtcbiAgICBjb25zdCB0ZXh0QXJyYXkgPSBbXTtcblxuICAgIGVsZW1lbnRBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIHRleHRBcnJheS5wdXNoKGVsZW1lbnQudGV4dENvbnRlbnQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXJyYXlTdHJpbmcgPSB0ZXh0QXJyYXkuam9pbignJyk7XG4gICAgY29uc3QgdGVtcG9yYXJ5QXJyYXkgPSBhcnJheVN0cmluZy5zcGxpdChzZXBhcmF0b3IpO1xuICAgIHJldHVybiBbdGVtcG9yYXJ5QXJyYXlbMF0sIHRlbXBvcmFyeUFycmF5WzFdLnN1YnN0cmluZygxLCAzKSwgdGVtcG9yYXJ5QXJyYXlbMl0uc3Vic3RyaW5nKDEsIDMpLCB0ZW1wb3JhcnlBcnJheVszXS5zdWJzdHJpbmcoMSwgMyksIHRlbXBvcmFyeUFycmF5WzRdXTtcbn1cblxuLy8gUmV0cmlldmVzIEFQSSByZXNwb25zZSBmcm9tIE9wZW5XZWF0aGVyIEFQSSBvbiB0aGUgcGFnZSBsb2FkaW5nLlxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcigpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JmFwcGlkPWZhZWZiMjFiMzY0ZDIzNjUzNGNjOWY4YjAyMTZmMjk0YCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBjb252ZXJ0UmVzdWx0cyhkYXRhKTtcbiAgICAgICAgZGlzcGxheVJlc3VsdHMoZGF0YSwgcmVzdWx0cyk7XG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICBhbGVydChlcnJvcik7XG4gICAgfVxufVxuXG4vLyBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXIgaGFzIGVudGVyZWQgYW5kIHN1Ym1pdHRlZCBhIGxvY2F0aW9uIGluIHRoZSBzZWFyY2ggYmFyLlxuc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB2YWxpZElucHV0ID0gdmFsaWRhdGVJbnB1dCgpO1xuXG4gICAgaWYgKHZhbGlkSW5wdXQpIHtcbiAgICAgICAgZ2V0V2VhdGhlcigpO1xuICAgIH1cbn0pO1xuXG4vLyBJbml0aWF0ZXMgdGhlIEFQSSBjYWxsIHdpdGggZGVmYXVsdCBkYXRhIG9uIHRoZSBwYWdlIGxvYWRpbmcuXG5nZXRXZWF0aGVyKCk7XG5cbi8vIFRyaWdnZXJlZCBhZnRlciB0aGUgdXNlciBoYXMgc2VsZWN0ZWQgdG8gY2hhbmdlIHRoZSBjdXJyZW50IHRlbXBlcmF0dXJlIHVuaXRzLlxuY2hhbmdlVGVtcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCB0ZW1wRWxlbWVudEFycmF5ID0gY29udmVydE5vZGVzVG9BcnJheSh0ZW1wTnVtcyk7XG4gICAgY29uc3QgdGVtcEFycmF5ID0gZ2V0VGVtcFRleHQodGVtcEVsZW1lbnRBcnJheSwgJ1xceEIwJyk7XG4gICAgY29uc3QgdGVtcE51bUFycmF5ID0gY29udmVydFRlbXAodGVtcEFycmF5WzBdLCB0ZW1wQXJyYXlbMV0sIHRlbXBBcnJheVsyXSwgdGVtcEFycmF5WzNdLCB0ZW1wQXJyYXlbNF0pO1xuICAgIGRpc3BsYXlUZW1wcyh0ZW1wTnVtQXJyYXkpO1xufSk7XG5cbi8vIFRyaWdnZXJlZCBhZnRlciB0aGUgdXNlciBoYXMgc2VsZWN0ZWQgdG8gY2hhbmdlIHRoZSBjdXJyZW50IHdpbmQgc3BlZWQgdW5pdHMuXG5jaGFuZ2VXaW5kU3BlZWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgd2luZEFycmF5ID0gd2luZEVsZW1lbnQudGV4dENvbnRlbnQuc3BsaXQoJyAnKTtcbiAgICBjb25zdCBjb252ZXJ0ZWRXaW5kID0gY29udmVydFdpbmRVbml0cyh3aW5kQXJyYXlbMV0sIHdpbmRBcnJheVsyXSk7XG4gICAgZGlzcGxheVdpbmQod2luZEFycmF5WzBdLCBjb252ZXJ0ZWRXaW5kLmNvbnZlcnRlZFdpbmRTcGVlZCwgY29udmVydGVkV2luZC5jb252ZXJ0ZWRVbml0cyk7XG59KTsiXSwibmFtZXMiOlsiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwic3RyaW5nIiwid29yZHMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJjb252ZXJ0Tm9kZXNUb0FycmF5Iiwibm9kZUxpc3QiLCJBcnJheSIsImZyb20iLCJjb252ZXJ0U3RyaW5nVG9OdW0iLCJudW1iZXJzIiwic3RyaW5ncyIsImZvckVhY2giLCJudW1iZXIiLCJwYXJzZUZsb2F0IiwicHVzaCIsImNvbnZlcnRUZW1wIiwiY3VycmVudFRlbXAiLCJmZWVsVGVtcCIsImhpZ2hUZW1wIiwibG93VGVtcCIsInRlbXBVbml0cyIsInRlbXBzIiwidGVtcENlbHNpdXMiLCJ0ZW1wRmFocmVuaGVpdCIsIk1hdGgiLCJyb3VuZCIsInRlbXBLZWx2aW4iLCJjb252ZXJ0V2luZERpcmVjdGlvbiIsImRpcmVjdGlvbiIsImNhcmRpbmFsRGlyZWN0aW9uIiwiY29udmVydFdpbmRVbml0cyIsIndpbmRTcGVlZCIsInVuaXRzIiwid2luZFNwZWVkTnVtIiwiY29udmVydGVkV2luZFNwZWVkIiwiY29udmVydGVkVW5pdHMiLCJjb252ZXJ0UHJlc3N1cmUiLCJwcmVzc3VyZSIsInRvRml4ZWQiLCJjb252ZXJ0UmVzdWx0cyIsImRhdGEiLCJjb252ZXJ0ZWRUZW1wcyIsIm1haW4iLCJ0ZW1wIiwiZmVlbHNfbGlrZSIsInRlbXBfbWF4IiwidGVtcF9taW4iLCJjb252ZXJ0ZWREaXJlY3Rpb24iLCJ3aW5kIiwiZGVnIiwiY29udmVydGVkU3BlZWRVbml0cyIsInNwZWVkIiwiY29udmVydGVkUHJlc3N1cmUiLCJlYXJ0aCIsIndpbmRFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGlzcGxheURhdGVUaW1lIiwiY3VycmVudERhdGUiLCJEYXRlIiwibW9udGgiLCJnZXRNb250aCIsImRhdGUiLCJnZXREYXRlIiwiZGF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImdldEZ1bGxZZWFyIiwidGltZUVsZW1lbnQiLCJob3VycyIsImdldEhvdXJzIiwibWludXRlcyIsImdldE1pbnV0ZXMiLCJkaXNwbGF5TG9jYXRpb24iLCJjaXR5IiwiY291bnRyeSIsImhlYWRlciIsImRpc3BsYXlUZW1wcyIsImN1cnJlbnRUZW1wRWxlbWVudCIsImZlZWxUZW1wRWxlbWVudCIsImhpZ2hUZW1wRWxlbWVudCIsImxvd1RlbXBFbGVtZW50IiwiZGlzcGxheVdlYXRoZXJJY29uIiwiaWNvbiIsIndlYXRoZXJJY29uRWxlbWVudCIsInVybCIsImltYWdlIiwic3JjIiwiZXJyb3IiLCJhbGVydCIsImRpc3BsYXlEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiZGVzY3JpcHRpb25FbGVtZW50IiwiZGVzY3JpcHRpb25Gb3JtYXR0ZWQiLCJkaXNwbGF5SHVtaWRpdHkiLCJodW1pZGl0eSIsImh1bWlkaXR5RWxlbWVudCIsImRpc3BsYXlXaW5kIiwiZGlzcGxheVByZXNzdXJlIiwicHJlc3N1cmVFbGVtZW50IiwiZGlzcGxheVdlYXRoZXIiLCJyZXN1bHRzIiwid2VhdGhlciIsImRpc3BsYXlSZXN1bHRzIiwibmFtZSIsInN5cyIsImZvcm0iLCJzZWFyY2hCYXIiLCJsb2NhdGlvbiIsImNsZWFySW5wdXQiLCJ2YWx1ZSIsInNob3dTZWFyY2hFcnJvciIsInZhbGlkaXR5IiwidmFsdWVNaXNzaW5nIiwic2V0Q3VzdG9tVmFsaWRpdHkiLCJwYXR0ZXJuTWlzbWF0Y2giLCJyZXBvcnRWYWxpZGl0eSIsInZhbGlkYXRlSW5wdXQiLCJjaGVja1ZhbGlkaXR5Iiwic3VibWl0QnV0dG9uIiwidGVtcE51bXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2hhbmdlVGVtcEJ1dHRvbiIsImNoYW5nZVdpbmRTcGVlZEJ1dHRvbiIsImdldFRlbXBUZXh0IiwiZWxlbWVudEFycmF5Iiwic2VwYXJhdG9yIiwidGV4dEFycmF5IiwiZWxlbWVudCIsImFycmF5U3RyaW5nIiwidGVtcG9yYXJ5QXJyYXkiLCJnZXRXZWF0aGVyIiwicmVzcG9uc2UiLCJmZXRjaCIsImpzb24iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInZhbGlkSW5wdXQiLCJ0ZW1wRWxlbWVudEFycmF5IiwidGVtcEFycmF5IiwidGVtcE51bUFycmF5Iiwid2luZEFycmF5IiwiY29udmVydGVkV2luZCJdLCJzb3VyY2VSb290IjoiIn0=