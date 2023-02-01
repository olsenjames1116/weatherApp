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
    const image = await fetch(`https://openweathermap.org/img/wn/${icon}@2x.png`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FqQixxQkFBcUIsQ0FBQ1csZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDbEQsTUFBTU8sU0FBUyxHQUFHdkYsV0FBVyxDQUFDVyxXQUFXLENBQUNuRSxLQUFLLENBQUMsR0FBRyxDQUFDO0VBQ3BELE1BQU1nSixhQUFhLEdBQUdoSCw4REFBZ0IsQ0FBQytHLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRUEsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xFNUMscURBQVcsQ0FBQzRDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRUMsYUFBYSxDQUFDNUcsa0JBQWtCLEVBQUU0RyxhQUFhLENBQUMzRyxjQUFjLENBQUM7QUFDN0YsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2NhcGl0YWxpemUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9jb252ZXJzaW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlcmFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ2FwaXRhbGl6ZXMgb25seSB0aGUgZmlyc3QgbGV0dGVyIHRvIHByb3ZpZGUgYSBtb3JlIGZvcm1hbCBzdHJpbmdcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcbiAgICBjb25zdCB3b3JkcyA9IHN0cmluZy5zcGxpdCgnICcpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHdvcmRzW2ldID0gd29yZHNbaV1bMF0udG9VcHBlckNhc2UoKSArIHdvcmRzW2ldLnN1YnN0cmluZygxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZHMuam9pbignICcpO1xufVxuIiwiLy8gQ29udmVydHMgbm9kZWxpc3QgdG8gYW4gYXJyYXkgdG8gYWNjZXNzIGFycmF5IHByb3RvdHlwZSBmdW5jdGlvbnNcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0Tm9kZXNUb0FycmF5KG5vZGVMaXN0KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20obm9kZUxpc3QpO1xufVxuXG4vLyBBbnkgYW1vdW50IG9mIHN0cmluZ3Mgd2lsbCBjb252ZXJ0ZWQgdG8gbnVtYmVycyB0byBhbGxvdyBmb3IgbWF0aGVtYXRpY2FsIG9wZXJhdGlvbnNcbmZ1bmN0aW9uIGNvbnZlcnRTdHJpbmdUb051bSguLi5zdHJpbmdzKSB7XG4gICAgY29uc3QgbnVtYmVycyA9IFtdO1xuXG4gICAgc3RyaW5ncy5mb3JFYWNoKChzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgbnVtYmVyID0gcGFyc2VGbG9hdChzdHJpbmcpO1xuICAgICAgICBudW1iZXJzLnB1c2gobnVtYmVyKTtcbiAgICB9KVxuXG4gICAgcmV0dXJuIG51bWJlcnM7XG59XG5cbi8qIFRlbXBlcmF0dXJlIGZyb20gdGhlIEFQSSBjYWxsIGlzIG9yaWdpbmFsbHkgZ2l2ZW4gaW4gS2VsdmluLiBUbyBhbGxvdyBmb3IgYSBtb3JlIHJlY29nbml6YWJsZSBcbiAgICB1bml0IG9mIG1lYXN1cmUsIHRoaXMgaXMgY29udmVydGVkIHRvIEZhaHJlbmhlaXQuIFRoZXJlIGlzIGEgY29udmVyc2lvbiBidXR0b24gb24gdGhlIHBhZ2UgdGhhdFxuICAgIGFsbG93cyB0aGUgdXNlciB0byBjb252ZXJ0IHRvIHRoZWlyIHByZWZlcnJlZCB1bml0cyAoQ2Vsc2l1cyBvciBGYWhyZW5oZWl0KS4gVGhpcyBoYW5kbGVzIGFsbCBvZlxuICAgIHRob3NlIGNvbnZlcnNpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUZW1wKGN1cnJlbnRUZW1wLCBmZWVsVGVtcCwgaGlnaFRlbXAsIGxvd1RlbXAsIHRlbXBVbml0cykge1xuICAgIGNvbnN0IHRlbXBzID0gY29udmVydFN0cmluZ1RvTnVtKGN1cnJlbnRUZW1wLCBmZWVsVGVtcCwgaGlnaFRlbXAsIGxvd1RlbXApO1xuXG4gICAgaWYgKHRlbXBVbml0cyA9PT0gJ0MnKSB7XG4gICAgICAgIC8vIFJlYWNoZWQgaWYgdGhlIHVzZXIgaGFzIHByZXNzZWQgdGhlIGNvbnZlcnNpb24gYnV0dG9uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBDZWxzaXVzID0gdGVtcHNbaV07XG4gICAgICAgICAgICBjb25zdCB0ZW1wRmFocmVuaGVpdCA9IE1hdGgucm91bmQodGVtcENlbHNpdXMgKiA5IC8gNSArIDMyKTtcbiAgICAgICAgICAgIHRlbXBzW2ldID0gdGVtcEZhaHJlbmhlaXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0ZW1wc1s0XSA9ICdGJztcblxuICAgIH0gZWxzZSBpZiAodGVtcFVuaXRzID09PSAnRicpIHtcbiAgICAgICAgLy8gUmVhY2hlZCBpZiB0aGUgdXNlciBoYXMgcHJlc3NlZCB0aGUgY29udmVyc2lvbiBidXR0b25cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgdGVtcEZhaHJlbmhlaXQgPSB0ZW1wc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBDZWxzaXVzID0gTWF0aC5yb3VuZCg1IC8gOSAqICh0ZW1wRmFocmVuaGVpdCAtIDMyKSk7XG4gICAgICAgICAgICB0ZW1wc1tpXSA9IHRlbXBDZWxzaXVzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGVtcHNbNF0gPSAnQyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVhY2hlZCBvZmYgdGhlIGluaXRpYWwgY2FsbCB3aXRoIGRhdGEgZnJvbSB0aGUgQVBJLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wS2VsdmluID0gdGVtcHNbaV07XG4gICAgICAgICAgICBjb25zdCB0ZW1wRmFocmVuaGVpdCA9IE1hdGgucm91bmQoMS44ICogKHRlbXBLZWx2aW4gLSAyNzMuMTUpICsgMzIpO1xuICAgICAgICAgICAgdGVtcHNbaV0gPSB0ZW1wRmFocmVuaGVpdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRlbXBzWzRdID0gJ0YnO1xuICAgIH1cblxuICAgIHJldHVybiB0ZW1wcztcbn1cblxuLyogRGlyZWN0aW9uYWwgZGF0YSBmcm9tIHRoZSBBUEkgY2FsbCBpcyByZXR1cm5lZCBpbiBkZWdyZWVzLiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG9cbiAgICBjcmVhdGUgYSBtb3JlIHJlY29nbml6YWJsZSBtZWFzdXJlbWVudCBmb3IgdGhlIHVzZXIgYnkgY29udmVydGluZyBkaXJlY3Rpb24gdG8gYSBjYXJkaW5hbFxuICAgIGRpcmVjdGlvbi4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRXaW5kRGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgIGxldCBjYXJkaW5hbERpcmVjdGlvbjtcblxuICAgIGlmIChkaXJlY3Rpb24gPj0gMzM3LjUgJiYgZGlyZWN0aW9uIDwgMjIuNSkge1xuICAgICAgICBjYXJkaW5hbERpcmVjdGlvbiA9ICdOJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA+PSAyMi41ICYmIGRpcmVjdGlvbiA8IDY3LjUpIHtcbiAgICAgICAgY2FyZGluYWxEaXJlY3Rpb24gPSAnTkUnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID49IDY3LjUgJiYgZGlyZWN0aW9uIDwgMTEyLjUpIHtcbiAgICAgICAgY2FyZGluYWxEaXJlY3Rpb24gPSAnRSc7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPj0gMTEyLjUgJiYgZGlyZWN0aW9uIDwgMTU3LjUpIHtcbiAgICAgICAgY2FyZGluYWxEaXJlY3Rpb24gPSAnU0UnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID49IDE1Ny41ICYmIGRpcmVjdGlvbiA8IDIwMi41KSB7XG4gICAgICAgIGNhcmRpbmFsRGlyZWN0aW9uID0gJ1MnO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID49IDIwMi41ICYmIGRpcmVjdGlvbiA8IDI0Ny41KSB7XG4gICAgICAgIGNhcmRpbmFsRGlyZWN0aW9uID0gJ1NXJztcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA+PSAyNDcuNSAmJiBkaXJlY3Rpb24gPCAyOTIuNSkge1xuICAgICAgICBjYXJkaW5hbERpcmVjdGlvbiA9ICdXJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYXJkaW5hbERpcmVjdGlvbiA9ICdOVyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcmRpbmFsRGlyZWN0aW9uO1xufVxuXG4vKiBXaW5kIHNwZWVkIGRhdGEgZnJvbSB0aGUgQVBJIGNhbGwgaXMgaW4gbS9zLiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBmaXJzdCB0byBjb252ZXJ0IHVuaXRzXG4gICAgZnJvbSBtL3MgdG8gbXBoLiBUaGlzIHdpbGwgaGVscCBnaXZlIHRoZSB1c2VyIGEgbW9yZSByZWNvZ25pemFibGUgbWVhc3VyZW1lbnQuIEEgY29udmVyc2lvbiBcbiAgICBidXR0b24gaXMgaW5jbHVkZWQgb24gdGhlIHBhZ2UgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gY29udmVydCB0byB0aGVpciBwcmVmZXJyZWQgdW5pdHMgKG1waCBvciBrcGgpLlxuICAgIFRoaXMgZnVuY3Rpb24gd2lsbCBoYW5kbGUgYWxsIG9mIHRob3NlIGNvbnZlcnNpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRXaW5kVW5pdHMod2luZFNwZWVkLCB1bml0cykge1xuICAgIGNvbnN0IHdpbmRTcGVlZE51bSA9IGNvbnZlcnRTdHJpbmdUb051bSh3aW5kU3BlZWQpO1xuICAgIGxldCBjb252ZXJ0ZWRXaW5kU3BlZWQ7XG4gICAgbGV0IGNvbnZlcnRlZFVuaXRzO1xuXG4gICAgaWYgKHVuaXRzID09PSAna3BoJykge1xuICAgICAgICAvLyBSZWFjaGVkIGlmIHRoZSB1c2VyIGhhcyBwcmVzc2VkIHRoZSBjb252ZXJzaW9uIGJ1dHRvblxuICAgICAgICBjb252ZXJ0ZWRXaW5kU3BlZWQgPSBNYXRoLnJvdW5kKHdpbmRTcGVlZE51bSAqIDAuNjIxMzcxKTtcbiAgICAgICAgY29udmVydGVkVW5pdHMgPSAnbXBoJztcbiAgICB9IGVsc2UgaWYgKHVuaXRzID09PSAnbXBoJykge1xuICAgICAgICAvLyBSZWFjaGVkIGlmIHRoZSB1c2VyIGhhcyBwcmVzc2VkIHRoZSBjb252ZXJzaW9uIGJ1dHRvblxuICAgICAgICBjb252ZXJ0ZWRXaW5kU3BlZWQgPSBNYXRoLnJvdW5kKHdpbmRTcGVlZE51bSAqIDEuNjA5MzQpO1xuICAgICAgICBjb252ZXJ0ZWRVbml0cyA9ICdrcGgnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlYWNoZWQgb24gdGhlIGluaXRpYWwgY2FsbCB3aXRoIGRhdGEgZnJvbSB0aGUgQVBJLlxuICAgICAgICBjb252ZXJ0ZWRXaW5kU3BlZWQgPSBNYXRoLnJvdW5kKHdpbmRTcGVlZE51bSAqIDIuMjM2OTQpO1xuICAgICAgICBjb252ZXJ0ZWRVbml0cyA9ICdtcGgnO1xuICAgIH1cblxuICAgIHJldHVybiB7IGNvbnZlcnRlZFdpbmRTcGVlZCwgY29udmVydGVkVW5pdHMgfTtcbn1cblxuLyogUHJlc3N1cmUgZGF0YSBmcm9tIHRoZSBBUEkgY2FsbCBpcyBpbiBocGEuIFRoaXMgZnVuY3Rpb24gY29udmVydHMgZnJvbSBocGEgdG8gSGcuIFRoaXNcbiAgICBwcm92aWRlcyB0aGUgdXNlciB3aXRoIGEgbW9yZSB3aWRlbHkgcmVjb2duaXplZCB1bml0LiAqL1xuZnVuY3Rpb24gY29udmVydFByZXNzdXJlKHByZXNzdXJlKSB7XG4gICAgcmV0dXJuIChwcmVzc3VyZSAqIDAuMDI5NTMpLnRvRml4ZWQoMik7XG59XG5cbi8vIENhbGxlZCBmcm9tIHRoZSBpbmRleCBmaWxlIHRvIHRyaWdnZXIgdGhlIGNvbnZlcnNpb25zIGZyb20gdGhlIG9yaWdpbmFsIEFQSSBjYWxsLlxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRSZXN1bHRzKGRhdGEpIHtcbiAgICBjb25zdCBjb252ZXJ0ZWRUZW1wcyA9IGNvbnZlcnRUZW1wKGRhdGEubWFpbi50ZW1wLCBkYXRhLm1haW4uZmVlbHNfbGlrZSwgZGF0YS5tYWluLnRlbXBfbWF4LCBkYXRhLm1haW4udGVtcF9taW4sICdLJyk7XG4gICAgY29uc3QgY29udmVydGVkRGlyZWN0aW9uID0gY29udmVydFdpbmREaXJlY3Rpb24oZGF0YS53aW5kLmRlZyk7XG4gICAgY29uc3QgY29udmVydGVkU3BlZWRVbml0cyA9IGNvbnZlcnRXaW5kVW5pdHMoZGF0YS53aW5kLnNwZWVkKTtcbiAgICBjb25zdCBjb252ZXJ0ZWRQcmVzc3VyZSA9IGNvbnZlcnRQcmVzc3VyZShkYXRhLm1haW4ucHJlc3N1cmUpO1xuXG4gICAgcmV0dXJuIHsgY29udmVydGVkVGVtcHMsIGNvbnZlcnRlZERpcmVjdGlvbiwgY29udmVydGVkU3BlZWRVbml0cywgY29udmVydGVkUHJlc3N1cmUgfTtcbn0iLCJpbXBvcnQgZWFydGggZnJvbSAnLi9pbWFnZXMvZWFydGgucG5nJztcbmltcG9ydCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgZnJvbSBcIi4vY2FwaXRhbGl6ZVwiO1xuXG5jb25zdCB3aW5kRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4jd2luZCcpO1xuXG4vLyBBZGRzIGEgdGltZXN0YW1wIHRvIHRoZSBwYWdlIGZyb20gZWFjaCB3ZWF0aGVyIHF1ZXJ5XG5mdW5jdGlvbiBkaXNwbGF5RGF0ZVRpbWUoKSB7XG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIFxuICAgIC8qIE1vbnRocyBhcmUgcHJvdmlkZWQgb24gYSBzY2FsZSBzdGFydGluZyB3aXRoIHplcm8uIEFkZGluZyBhIG9uZSBzaGlmdHMgXG4gICAgdGhpcyBzY2FsZSBhbmQgYWxsb3dzIHVzZXJzIHRvIHNlZSBhIG1vcmUgd2lkZWx5IHJlY29nbml6YWJsZSBzY2FsZS4gKi9cbiAgICBsZXQgbW9udGggPSBjdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAvKiBBZGRzIGEgemVybyBpbiBmcm9udCBvZiBzaW5nbGUgZGlnaXQgbW9udGhzIHRvIHByb3ZpZGUgdGhlIHVzZXIgd2l0aCBhIG1vcmUgXG4gICAgd2lkZWx5IHJlY29nbml6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9udGguICovXG4gICAgaWYgKG1vbnRoIDwgMTApIHtcbiAgICAgICAgbW9udGggPSBgMCR7bW9udGh9YDtcbiAgICB9XG5cbiAgICBsZXQgZGF0ZSA9IGN1cnJlbnREYXRlLmdldERhdGUoKTtcbiAgICAvKiBBZGRzIGEgemVybyBpbiBmcm9udCBvZiBzaW5nbGUgZGlnaXQgZGF0ZXMgdG8gcHJvdmlkZSB0aGUgdXNlciB3aXRoIGEgbW9yZSBcbiAgICB3aWRlbHkgcmVjb2duaXphYmxlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlLiAqL1xuICAgIGlmIChkYXRlIDwgMTApIHtcbiAgICAgICAgZGF0ZSA9IGAwJHtkYXRlfWA7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzcGFuI2RhdGUnKTtcbiAgICBkYXRlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke21vbnRofS8ke2RhdGV9LyR7Y3VycmVudERhdGUuZ2V0RnVsbFllYXIoKX1gO1xuICAgIFxuICAgIGNvbnN0IHRpbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbiN0aW1lJyk7XG5cbiAgICBsZXQgaG91cnMgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xuXG4gICAgLyogQWRkcyBhIHplcm8gaW4gZnJvbnQgb2Ygc2luZ2xlIGRpZ2l0IGhvdXJzIHRvIHByb3ZpZGUgdGhlIHVzZXIgd2l0aCBhIG1vcmUgXG4gICAgd2lkZWx5IHJlY29nbml6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgaG91ci4gKi9cbiAgICBpZiAoaG91cnMgPCAxMCkge1xuICAgICAgICBob3VycyA9IGAwJHtob3Vyc31gO1xuICAgIH1cblxuICAgIGxldCBtaW51dGVzID0gY3VycmVudERhdGUuZ2V0TWludXRlcygpO1xuICAgIC8qIEFkZHMgYSB6ZXJvIGluIGZyb250IG9mIHNpbmdsZSBkaWdpdCBtaW51dGVzIHRvIHByb3ZpZGUgdGhlIHVzZXIgd2l0aCBhIG1vcmUgXG4gICAgd2lkZWx5IHJlY29nbml6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWludXRlLiAqL1xuICAgIGlmIChtaW51dGVzIDwgMTApIHtcbiAgICAgICAgbWludXRlcyA9IGAwJHttaW51dGVzfWA7XG4gICAgfVxuXG4gICAgdGltZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtob3Vyc306JHttaW51dGVzfWA7XG59XG5cbi8qIERpc3BsYXlzIHRoZSBxdWVyaWVkIGxvY2F0aW9uIHRvIHRoZSBwYWdlIHNvIHRoZSB1c2VyIGNhbiBjb25maXJtIHRoZXkgYXJlXG4gbG9va2luZyBhdCB0aGVpciByZXF1ZXN0ZWQgd2VhdGhlciBkYXRhLiAqL1xuZnVuY3Rpb24gZGlzcGxheUxvY2F0aW9uKGNpdHksIGNvdW50cnkpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuY29udGVudD5oMicpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGAke2NpdHl9LCAke2NvdW50cnl9YDtcbn1cblxuLyogRGlzcGxheXMgYWxsIHRlbXAgaW5mb3JtYXRpb24gZnJvbSB0aGUgQVBJIGNhbGwgYW5kIHVwZGF0ZXMgd2hlbiB0aGUgdXNlciBcbmNvbnZlcnRzIHdlYXRoZXIgdW5pdHMuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVRlbXBzKHRlbXBzKSB7XG4gICAgY29uc3QgY3VycmVudFRlbXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LnRlbXA+c3BhbjpmaXJzdC1jaGlsZCcpO1xuICAgIGN1cnJlbnRUZW1wRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RlbXBzWzBdfVxceEIwJHt0ZW1wc1s0XX1gO1xuXG4gICAgY29uc3QgZmVlbFRlbXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmZlZWw+c3BhbjpudGgtY2hpbGQoMiknKTtcbiAgICBmZWVsVGVtcEVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHt0ZW1wc1sxXX1cXHhCMCR7dGVtcHNbNF19YDtcblxuICAgIGNvbnN0IGhpZ2hUZW1wRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5oaWdoPnNwYW46bnRoLWNoaWxkKDIpJyk7XG4gICAgaGlnaFRlbXBFbGVtZW50LnRleHRDb250ZW50ID0gYCR7dGVtcHNbMl19XFx4QjAke3RlbXBzWzRdfWA7XG5cbiAgICBjb25zdCBsb3dUZW1wRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5sb3c+c3BhbjpudGgtY2hpbGQoMiknKTtcbiAgICBsb3dUZW1wRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RlbXBzWzNdfVxceEIwJHt0ZW1wc1s0XX1gO1xufVxuXG4vKiBNYWtlcyBhIGNhbGwgdG8gdGhlIE9wZW5XZWF0aGVyIHVybCB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBpY29uIGRhdGEgZnJvbSB0aGUgQVBJIGNhbGxcbiAgICBhbmQgZGlzcGxheXMgaXQgdG8gdGhlIHVzZXIgc28gdGhleSBjYW4gZ2V0IGEgYmV0dGVyIHZpc3VhbCByZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCB3ZWF0aGVyLiAqL1xuYXN5bmMgZnVuY3Rpb24gZGlzcGxheVdlYXRoZXJJY29uKGljb24pIHtcbiAgICBjb25zdCB3ZWF0aGVySWNvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbWcjd2VhdGhlckljb24nKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IGF3YWl0IGZldGNoKGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtpY29ufUAyeC5wbmdgKTtcbiAgICAgICAgY29uc3Qge3VybH0gPSBpbWFnZTtcbiAgICAgICAgd2VhdGhlckljb25FbGVtZW50LnNyYyA9IHVybDtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgIC8vIERpc3BsYXlzIGEgZGVmYXVsdCBpY29uIGFuZCBlcnJvciBpZiB0aGUgcmVxdWVzdGVkIGljb24gY2Fubm90IGJlIHJlYWNoZWRcbiAgICAgICAgd2VhdGhlckljb25FbGVtZW50LnNyYyA9IGVhcnRoO1xuICAgICAgICBhbGVydChlcnJvcik7XG4gICAgfVxufVxuXG4vLyBEaXNwbGF5cyBhIGRlc2NyaXB0aW9uIG9mIHRoZSB3ZWF0aGVyIGZyb20gdGhlIEFQSSBjYWxsIHRvIHRoZSB1c2VyXG5mdW5jdGlvbiBkaXNwbGF5RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICBjb25zdCBkZXNjcmlwdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwI2Rlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb25Gb3JtYXR0ZWQgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoZGVzY3JpcHRpb24pO1xuICAgIGRlc2NyaXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uRm9ybWF0dGVkO1xufVxuXG4vLyBEaXNwbGF5cyB0aGUgaHVtaWRpdHkgZnJvbSB0aGUgQVBJIGNhbGwgdG8gdGhlIHVzZXJcbmZ1bmN0aW9uIGRpc3BsYXlIdW1pZGl0eShodW1pZGl0eSkge1xuICAgIGNvbnN0IGh1bWlkaXR5RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4jaHVtaWRpdHknKTtcbiAgICBodW1pZGl0eUVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtodW1pZGl0eX0lYDtcbn1cblxuLyogRGlzcGxheXMgdGhlIHdpbmQgaW5mb3JtYXRpb24gZnJvbSB0aGUgQVBJIGNhbGwgYXMgd2VsbCBhcyB0aGUgY29udmVydGVkIHdpbmQgaW5mb3JtYXRpb25cbiAgICBhdCB0aGUgdXNlcidzIHJlcXVlc3QuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVdpbmQoZGlyZWN0aW9uLCBzcGVlZCwgdW5pdHMpIHtcbiAgICB3aW5kRWxlbWVudC50ZXh0Q29udGVudCA9IGAke2RpcmVjdGlvbn0gJHtzcGVlZH0gJHt1bml0c31gO1xufVxuXG4vLyBEaXNwbGF5cyB0aGUgY29udmVydGVkIHByZXNzdXJlIGZyb20gdGhlIEFQSSBjYWxsIHRvIHRoZSB1c2VyLlxuZnVuY3Rpb24gZGlzcGxheVByZXNzdXJlKHByZXNzdXJlKSB7XG4gICAgY29uc3QgcHJlc3N1cmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbiNwcmVzc3VyZScpO1xuICAgIHByZXNzdXJlRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3ByZXNzdXJlfVwiYDtcbn1cblxuLy8gQ2FsbHMgYWxsIHRoZSBkaXNwbGF5IHdlYXRoZXIgZnVuY3Rpb25zIGFmdGVyIHRoZSBBUEkgcmVzcG9uZHMuXG5mdW5jdGlvbiBkaXNwbGF5V2VhdGhlcihkYXRhLCByZXN1bHRzKSB7XG4gICAgZGlzcGxheVRlbXBzKHJlc3VsdHMuY29udmVydGVkVGVtcHMpO1xuICAgIGRpc3BsYXlXZWF0aGVySWNvbihkYXRhLndlYXRoZXJbMF0uaWNvbik7XG4gICAgZGlzcGxheURlc2NyaXB0aW9uKGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbik7XG4gICAgZGlzcGxheUh1bWlkaXR5KGRhdGEubWFpbi5odW1pZGl0eSk7XG4gICAgZGlzcGxheVdpbmQocmVzdWx0cy5jb252ZXJ0ZWREaXJlY3Rpb24sIHJlc3VsdHMuY29udmVydGVkU3BlZWRVbml0cy5jb252ZXJ0ZWRXaW5kU3BlZWQsIHJlc3VsdHMuY29udmVydGVkU3BlZWRVbml0cy5jb252ZXJ0ZWRVbml0cyk7XG4gICAgZGlzcGxheVByZXNzdXJlKHJlc3VsdHMuY29udmVydGVkUHJlc3N1cmUpO1xufVxuXG4vLyBDYWxscyBhbGwgdGhlIGRpc3BsYXkgZnVuY3Rpb25zIGFmdGVyIHRoZSBBUEkgcmVzcG9uZHMuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVJlc3VsdHMoZGF0YSwgcmVzdWx0cykge1xuICAgIGRpc3BsYXlMb2NhdGlvbihkYXRhLm5hbWUsIGRhdGEuc3lzLmNvdW50cnkpO1xuICAgIGRpc3BsYXlEYXRlVGltZSgpO1xuICAgIGRpc3BsYXlXZWF0aGVyKGRhdGEsIHJlc3VsdHMpO1xufVxuIiwiY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbmNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1xubGV0IGxvY2F0aW9uID0gJ05ldyBZb3JrJztcblxuLy8gQ2xlYXIgc2VhcmNoIGlucHV0IGFmdGVyIHRoZSB1c2VyIGhhcyBzdWJtaXR0ZWRcbmZ1bmN0aW9uIGNsZWFySW5wdXQoKSB7XG4gICAgc2VhcmNoQmFyLnZhbHVlID0gJyc7XG59XG5cbi8vIFJlYWNoZWQgYWZ0ZXIgYSB2YWxpZGl0eSBpc3N1ZSBoYXMgYmVlbiBmb3VuZCBmcm9tIHRoZSB1c2VyIGlucHV0LlxuZnVuY3Rpb24gc2hvd1NlYXJjaEVycm9yKCkge1xuICAgIGlmIChzZWFyY2hCYXIudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XG4gICAgICAgIHNlYXJjaEJhci5zZXRDdXN0b21WYWxpZGl0eSgnUGxlYXNlIGVudGVyIGEgY2l0eScpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoQmFyLnZhbGlkaXR5LnBhdHRlcm5NaXNtYXRjaCkge1xuICAgICAgICBzZWFyY2hCYXIuc2V0Q3VzdG9tVmFsaWRpdHkoJ1BsZWFzZSBvbmx5IGVudGVyIGEgY2l0eSBvciBhIGNpdHkgZm9sbG93ZWQgd2l0aCBhIGNvbW1hIGFuZCBlaXRoZXIgYSBzdGF0ZSAoVVMgb25seSkgb3IgYSBjb3VudHJ5IGNvZGUuIEV4OiBEZW52ZXIsIENvbG9yYWRvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoQmFyLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICAgIH1cblxuICAgIHNlYXJjaEJhci5yZXBvcnRWYWxpZGl0eSgpO1xufVxuXG4vLyBSZWFjaGVkIGFmdGVyIHRoZSB1c2VyIGhhcyBzdWJtaXR0ZWQgdGhlaXIgaW5wdXQuXG5mdW5jdGlvbiB2YWxpZGF0ZUlucHV0KCkge1xuICAgIGlmIChmb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICBsb2NhdGlvbiA9IHNlYXJjaEJhci52YWx1ZTtcbiAgICAgICAgY2xlYXJJbnB1dCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IFxuXG4gICAgc2hvd1NlYXJjaEVycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgeyBsb2NhdGlvbiwgdmFsaWRhdGVJbnB1dCB9IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTMyNDE7XFxuICBtYXJnaW46IDA7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbmRpdi5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkNWE4MDtcXG4gIGNvbG9yOiAjMjkzMjQxO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG5mb3JtIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UwZmJmYztcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBjb2xvcjogIzNkNWE4MDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxubGFiZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmlucHV0IHtcXG4gIHdpZHRoOiAzMDBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTQsIDIxMiwgMjEyKTtcXG59XFxuXFxuZm9ybSA+IGRpdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWU2YzRkO1xcbiAgY29sb3I6ICNlMGZiZmM7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjc0MjE1O1xcbn1cXG5cXG5kaXYuY29udGVudCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOThjMWQ5O1xcbiAgY29sb3I6ICMzZDVhODA7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgd2lkdGg6IDUwJTtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5oMiB7XFxuICBtYXJnaW46IDA7XFxuICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG5kaXYuZGF0ZVRpbWUge1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG59XFxuXFxuZGl2LmNvbmRpdGlvbnMge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5wIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuZGl2LnRlbXAgPiBkaXY6bGFzdC1jaGlsZCB7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmRpdi53aW5kID4gZGl2Omxhc3QtY2hpbGQge1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYuZm9vdGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzZDVhODA7XFxuICBjb2xvcjogIzI5MzI0MTtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmEge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UseUJBQXlCO0VBQ3pCLFNBQVM7RUFDVCxhQUFhO0VBQ2IsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsY0FBYztFQUNkLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osU0FBUztFQUNULGtCQUFrQjtFQUNsQixvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2IsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixxQkFBcUI7QUFDdkJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkzMjQxO1xcbiAgbWFyZ2luOiAwO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG5kaXYuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzZDVhODA7XFxuICBjb2xvcjogIzI5MzI0MTtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuZm9ybSB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMGZiZmM7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgY29sb3I6ICMzZDVhODA7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbmxhYmVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5pbnB1dCB7XFxuICB3aWR0aDogMzAwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBib3JkZXI6IDA7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjE0LCAyMTIsIDIxMik7XFxufVxcblxcbmZvcm0gPiBkaXYge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBib3JkZXI6IDA7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlNmM0ZDtcXG4gIGNvbG9yOiAjZTBmYmZjO1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y3NDIxNTtcXG59XFxuXFxuZGl2LmNvbnRlbnQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk4YzFkOTtcXG4gIGNvbG9yOiAjM2Q1YTgwO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHdpZHRoOiA1MCU7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaDIge1xcbiAgbWFyZ2luOiAwO1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDtcXG59XFxuXFxuZGl2LmRhdGVUaW1lIHtcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxufVxcblxcbmRpdi5jb25kaXRpb25zIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxucCB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmRpdi50ZW1wID4gZGl2Omxhc3QtY2hpbGQge1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5kaXYud2luZCA+IGRpdjpsYXN0LWNoaWxkIHtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuZGl2LmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q1YTgwO1xcbiAgY29sb3I6ICMyOTMyNDE7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5hIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgY29udmVydE5vZGVzVG9BcnJheSwgY29udmVydFRlbXAsIGNvbnZlcnRXaW5kVW5pdHMsIGNvbnZlcnRSZXN1bHRzIH0gZnJvbSAnLi9jb252ZXJzaW9ucyc7XG5pbXBvcnQgeyBkaXNwbGF5VGVtcHMsIGRpc3BsYXlXaW5kLCBkaXNwbGF5UmVzdWx0cyB9IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgeyBsb2NhdGlvbiwgdmFsaWRhdGVJbnB1dCB9IGZyb20gJy4vdmFsaWRhdGUnO1xuXG5jb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdHlwZT1zdWJtaXRdJyk7XG5jb25zdCB0ZW1wTnVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4udGVtcE51bScpO1xuY29uc3QgY2hhbmdlVGVtcEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi50ZW1wPmRpdj5idXR0b24nKTtcbmNvbnN0IHdpbmRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3BhbiN3aW5kJyk7XG5jb25zdCBjaGFuZ2VXaW5kU3BlZWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYud2luZD5kaXY+YnV0dG9uJyk7XG5cbi8vIFJldHJpZXZlIHRleHQgZm9yIGFsbCB0ZW1wZXJhdHVyZSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBET00gdG8gYmUgY29udmVydGVkIGF0IHRoZSB1c2VyJ3MgcmVxdWVzdC5cbmZ1bmN0aW9uIGdldFRlbXBUZXh0KGVsZW1lbnRBcnJheSwgc2VwYXJhdG9yKSB7XG4gICAgY29uc3QgdGV4dEFycmF5ID0gW107XG5cbiAgICBlbGVtZW50QXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICB0ZXh0QXJyYXkucHVzaChlbGVtZW50LnRleHRDb250ZW50KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFycmF5U3RyaW5nID0gdGV4dEFycmF5LmpvaW4oJycpO1xuICAgIGNvbnN0IHRlbXBvcmFyeUFycmF5ID0gYXJyYXlTdHJpbmcuc3BsaXQoc2VwYXJhdG9yKTtcbiAgICByZXR1cm4gW3RlbXBvcmFyeUFycmF5WzBdLCB0ZW1wb3JhcnlBcnJheVsxXS5zdWJzdHJpbmcoMSwgMyksIHRlbXBvcmFyeUFycmF5WzJdLnN1YnN0cmluZygxLCAzKSwgdGVtcG9yYXJ5QXJyYXlbM10uc3Vic3RyaW5nKDEsIDMpLCB0ZW1wb3JhcnlBcnJheVs0XV07XG59XG5cbi8vIFJldHJpZXZlcyBBUEkgcmVzcG9uc2UgZnJvbSBPcGVuV2VhdGhlciBBUEkgb24gdGhlIHBhZ2UgbG9hZGluZy5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZhcHBpZD1mYWVmYjIxYjM2NGQyMzY1MzRjYzlmOGIwMjE2ZjI5NGApO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zdCByZXN1bHRzID0gY29udmVydFJlc3VsdHMoZGF0YSk7XG4gICAgICAgIGRpc3BsYXlSZXN1bHRzKGRhdGEsIHJlc3VsdHMpO1xuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgYWxlcnQoZXJyb3IpO1xuICAgIH1cbn1cblxuLy8gVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VyIGhhcyBlbnRlcmVkIGFuZCBzdWJtaXR0ZWQgYSBsb2NhdGlvbiBpbiB0aGUgc2VhcmNoIGJhci5cbnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdmFsaWRJbnB1dCA9IHZhbGlkYXRlSW5wdXQoKTtcblxuICAgIGlmICh2YWxpZElucHV0KSB7XG4gICAgICAgIGdldFdlYXRoZXIoKTtcbiAgICB9XG59KTtcblxuLy8gSW5pdGlhdGVzIHRoZSBBUEkgY2FsbCB3aXRoIGRlZmF1bHQgZGF0YSBvbiB0aGUgcGFnZSBsb2FkaW5nLlxuZ2V0V2VhdGhlcigpO1xuXG4vLyBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXIgaGFzIHNlbGVjdGVkIHRvIGNoYW5nZSB0aGUgY3VycmVudCB0ZW1wZXJhdHVyZSB1bml0cy5cbmNoYW5nZVRlbXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgdGVtcEVsZW1lbnRBcnJheSA9IGNvbnZlcnROb2Rlc1RvQXJyYXkodGVtcE51bXMpO1xuICAgIGNvbnN0IHRlbXBBcnJheSA9IGdldFRlbXBUZXh0KHRlbXBFbGVtZW50QXJyYXksICdcXHhCMCcpO1xuICAgIGNvbnN0IHRlbXBOdW1BcnJheSA9IGNvbnZlcnRUZW1wKHRlbXBBcnJheVswXSwgdGVtcEFycmF5WzFdLCB0ZW1wQXJyYXlbMl0sIHRlbXBBcnJheVszXSwgdGVtcEFycmF5WzRdKTtcbiAgICBkaXNwbGF5VGVtcHModGVtcE51bUFycmF5KTtcbn0pO1xuXG4vLyBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHVzZXIgaGFzIHNlbGVjdGVkIHRvIGNoYW5nZSB0aGUgY3VycmVudCB3aW5kIHNwZWVkIHVuaXRzLlxuY2hhbmdlV2luZFNwZWVkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHdpbmRBcnJheSA9IHdpbmRFbGVtZW50LnRleHRDb250ZW50LnNwbGl0KCcgJyk7XG4gICAgY29uc3QgY29udmVydGVkV2luZCA9IGNvbnZlcnRXaW5kVW5pdHMod2luZEFycmF5WzFdLCB3aW5kQXJyYXlbMl0pO1xuICAgIGRpc3BsYXlXaW5kKHdpbmRBcnJheVswXSwgY29udmVydGVkV2luZC5jb252ZXJ0ZWRXaW5kU3BlZWQsIGNvbnZlcnRlZFdpbmQuY29udmVydGVkVW5pdHMpO1xufSk7Il0sIm5hbWVzIjpbImNhcGl0YWxpemVGaXJzdExldHRlciIsInN0cmluZyIsIndvcmRzIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwidG9VcHBlckNhc2UiLCJzdWJzdHJpbmciLCJqb2luIiwiY29udmVydE5vZGVzVG9BcnJheSIsIm5vZGVMaXN0IiwiQXJyYXkiLCJmcm9tIiwiY29udmVydFN0cmluZ1RvTnVtIiwibnVtYmVycyIsInN0cmluZ3MiLCJmb3JFYWNoIiwibnVtYmVyIiwicGFyc2VGbG9hdCIsInB1c2giLCJjb252ZXJ0VGVtcCIsImN1cnJlbnRUZW1wIiwiZmVlbFRlbXAiLCJoaWdoVGVtcCIsImxvd1RlbXAiLCJ0ZW1wVW5pdHMiLCJ0ZW1wcyIsInRlbXBDZWxzaXVzIiwidGVtcEZhaHJlbmhlaXQiLCJNYXRoIiwicm91bmQiLCJ0ZW1wS2VsdmluIiwiY29udmVydFdpbmREaXJlY3Rpb24iLCJkaXJlY3Rpb24iLCJjYXJkaW5hbERpcmVjdGlvbiIsImNvbnZlcnRXaW5kVW5pdHMiLCJ3aW5kU3BlZWQiLCJ1bml0cyIsIndpbmRTcGVlZE51bSIsImNvbnZlcnRlZFdpbmRTcGVlZCIsImNvbnZlcnRlZFVuaXRzIiwiY29udmVydFByZXNzdXJlIiwicHJlc3N1cmUiLCJ0b0ZpeGVkIiwiY29udmVydFJlc3VsdHMiLCJkYXRhIiwiY29udmVydGVkVGVtcHMiLCJtYWluIiwidGVtcCIsImZlZWxzX2xpa2UiLCJ0ZW1wX21heCIsInRlbXBfbWluIiwiY29udmVydGVkRGlyZWN0aW9uIiwid2luZCIsImRlZyIsImNvbnZlcnRlZFNwZWVkVW5pdHMiLCJzcGVlZCIsImNvbnZlcnRlZFByZXNzdXJlIiwiZWFydGgiLCJ3aW5kRWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImRpc3BsYXlEYXRlVGltZSIsImN1cnJlbnREYXRlIiwiRGF0ZSIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXRlIiwiZ2V0RGF0ZSIsImRhdGVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJnZXRGdWxsWWVhciIsInRpbWVFbGVtZW50IiwiaG91cnMiLCJnZXRIb3VycyIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwiZGlzcGxheUxvY2F0aW9uIiwiY2l0eSIsImNvdW50cnkiLCJoZWFkZXIiLCJkaXNwbGF5VGVtcHMiLCJjdXJyZW50VGVtcEVsZW1lbnQiLCJmZWVsVGVtcEVsZW1lbnQiLCJoaWdoVGVtcEVsZW1lbnQiLCJsb3dUZW1wRWxlbWVudCIsImRpc3BsYXlXZWF0aGVySWNvbiIsImljb24iLCJ3ZWF0aGVySWNvbkVsZW1lbnQiLCJpbWFnZSIsImZldGNoIiwidXJsIiwic3JjIiwiZXJyb3IiLCJhbGVydCIsImRpc3BsYXlEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiZGVzY3JpcHRpb25FbGVtZW50IiwiZGVzY3JpcHRpb25Gb3JtYXR0ZWQiLCJkaXNwbGF5SHVtaWRpdHkiLCJodW1pZGl0eSIsImh1bWlkaXR5RWxlbWVudCIsImRpc3BsYXlXaW5kIiwiZGlzcGxheVByZXNzdXJlIiwicHJlc3N1cmVFbGVtZW50IiwiZGlzcGxheVdlYXRoZXIiLCJyZXN1bHRzIiwid2VhdGhlciIsImRpc3BsYXlSZXN1bHRzIiwibmFtZSIsInN5cyIsImZvcm0iLCJzZWFyY2hCYXIiLCJsb2NhdGlvbiIsImNsZWFySW5wdXQiLCJ2YWx1ZSIsInNob3dTZWFyY2hFcnJvciIsInZhbGlkaXR5IiwidmFsdWVNaXNzaW5nIiwic2V0Q3VzdG9tVmFsaWRpdHkiLCJwYXR0ZXJuTWlzbWF0Y2giLCJyZXBvcnRWYWxpZGl0eSIsInZhbGlkYXRlSW5wdXQiLCJjaGVja1ZhbGlkaXR5Iiwic3VibWl0QnV0dG9uIiwidGVtcE51bXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2hhbmdlVGVtcEJ1dHRvbiIsImNoYW5nZVdpbmRTcGVlZEJ1dHRvbiIsImdldFRlbXBUZXh0IiwiZWxlbWVudEFycmF5Iiwic2VwYXJhdG9yIiwidGV4dEFycmF5IiwiZWxlbWVudCIsImFycmF5U3RyaW5nIiwidGVtcG9yYXJ5QXJyYXkiLCJnZXRXZWF0aGVyIiwicmVzcG9uc2UiLCJqc29uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ2YWxpZElucHV0IiwidGVtcEVsZW1lbnRBcnJheSIsInRlbXBBcnJheSIsInRlbXBOdW1BcnJheSIsIndpbmRBcnJheSIsImNvbnZlcnRlZFdpbmQiXSwic291cmNlUm9vdCI6IiJ9