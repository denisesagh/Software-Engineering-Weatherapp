/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controller/WeatherController.ts":
/*!*********************************************!*\
  !*** ./src/Controller/WeatherController.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeatherController = void 0;
var WeatherdataDisplay_1 = __webpack_require__(/*! ../View/WeatherdataDisplay */ "./src/View/WeatherdataDisplay.ts");
var WeatherController = /** @class */ (function () {
    function WeatherController(weatherStation) {
        this.weatherdataDisplay = new WeatherdataDisplay_1.WeatherdataDisplay(this);
        this.temperatureArray = new Array();
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
        this.weatherdataDisplay = new WeatherdataDisplay_1.WeatherdataDisplay(this);
    }
    //Methode um die Durchschnittstemperatur zu berechnen
    WeatherController.prototype.updateAverageTemperature = function () {
        var averageTemperature = this.temperatureArray.reduce(function (a, b) { return a + b; }, 0) / this.temperatureArray.length;
        this.weatherdataDisplay.updateAverageTemperatureView(averageTemperature);
    };
    //Methode um die Minimaltemperatur zu berechnen
    WeatherController.prototype.updateMinTemperature = function () {
        var minTemperature = Math.min.apply(Math, this.temperatureArray);
        this.weatherdataDisplay.updateMinTemperatureView(minTemperature);
    };
    //Methode um die Maximaltemperatur zu berechnen
    WeatherController.prototype.updateMaxTemperature = function () {
        var maxTemperature = Math.max.apply(Math, this.temperatureArray);
        this.weatherdataDisplay.updateMaxTemperatureView(maxTemperature);
    };
    //Methode um die Temperatur zu aktualisieren und alle davon abhängigen Methoden aufzurufen
    WeatherController.prototype.updateTemperature = function (temperature) {
        this.temperatureArray.push(temperature);
        this.updateMinTemperature();
        this.updateMaxTemperature();
        this.updateAverageTemperature();
        this.weatherdataDisplay.updateTemperatureView(temperature);
    };
    //Methode um den Luftdruck zu aktualisieren
    WeatherController.prototype.updateAirPressure = function (airPressure) {
        this.updateForecast(airPressure);
        this.weatherdataDisplay.updateAirPressureView(airPressure);
    };
    //Methode um die Luftfeuchtigkeit zu aktualisieren
    WeatherController.prototype.updateHumidity = function (humidity) {
        this.weatherdataDisplay.updateHumidityView(humidity);
    };
    //Methode um die Wettervorhersage anhand des Luftdruckes zu bestimmen
    WeatherController.prototype.getForecast = function (airPressure) {
        if (airPressure < 980)
            return 'sehr tief, stürmisch';
        if (airPressure < 1000)
            return 'tief, regnerisch';
        if (airPressure < 1020)
            return 'normal, wechselhaft';
        if (airPressure < 1040)
            return 'hoch, sonnig';
        return 'sehr hoch, sehr trocken';
    };
    //Methode um die Wettervorhersage zu aktualisieren
    WeatherController.prototype.updateForecast = function (airPressure) {
        var forecast = this.getForecast(airPressure);
        this.weatherdataDisplay.updateForecastView(forecast);
    };
    return WeatherController;
}());
exports.WeatherController = WeatherController;


/***/ }),

/***/ "./src/View/WeatherdataDisplay.ts":
/*!****************************************!*\
  !*** ./src/View/WeatherdataDisplay.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeatherdataDisplay = void 0;
var WeatherdataDisplay = /** @class */ (function () {
    function WeatherdataDisplay(weatherController) {
        this.controller = weatherController;
        this.addChangeTemperatureButtonListener();
    }
    WeatherdataDisplay.prototype.updateTemperatureView = function (temperature) {
        var temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = "".concat(temperature.toFixed(2), " \u00B0C");
        console.log("TemperaturDisplay: I need to update my display to ".concat(temperature));
    };
    WeatherdataDisplay.prototype.updateAirPressureView = function (airPressure) {
        var airPressureElement = document.getElementById("airPressure");
        airPressureElement.textContent = "".concat(airPressure.toFixed(2), " hPa");
        console.log("AirPressureDisplay: I need to update my display to ".concat(airPressure));
    };
    WeatherdataDisplay.prototype.updateHumidityView = function (humidity) {
        var humidityElement = document.getElementById("humidity");
        humidityElement.textContent = "".concat(humidity.toFixed(2), " %");
        console.log("HumidityDisplay: I need to update my display to ".concat(humidity));
    };
    WeatherdataDisplay.prototype.updateForecastView = function (forecast) {
        var forecastElement = document.getElementById("forecast");
        forecastElement.textContent = "".concat(forecast);
        console.log("ForecastDisplay: I need to update my display to ".concat(forecast));
    };
    WeatherdataDisplay.prototype.updateMaxTemperatureView = function (maxTemperature) {
        var maxTemperatureElement = document.getElementById("maximalTemperature");
        maxTemperatureElement.textContent = "".concat(maxTemperature.toFixed(2), " \u00B0C");
    };
    WeatherdataDisplay.prototype.updateMinTemperatureView = function (minTemperature) {
        var minTemperatureElement = document.getElementById("minimalTemperature");
        minTemperatureElement.textContent = "".concat(minTemperature.toFixed(2), " \u00B0C");
    };
    WeatherdataDisplay.prototype.updateAverageTemperatureView = function (averageTemperature) {
        var averageTemperatureElement = document.getElementById("averageTemperature");
        averageTemperatureElement.textContent = "".concat(averageTemperature.toFixed(2), " \u00B0C");
    };
    WeatherdataDisplay.prototype.addChangeTemperatureButtonListener = function () {
        var _this = this;
        var gettemperaturebutton = document.getElementById("gettemperaturebutton");
        if (gettemperaturebutton) {
            gettemperaturebutton.addEventListener("click", function () { return _this.onChangeTemperatureButtonClick(); });
        }
    };
    WeatherdataDisplay.prototype.onChangeTemperatureButtonClick = function () {
        // Hier können Sie die gewünschte Temperaturänderung angeben
        var manualTemperature = document.getElementById("temperatureinput");
        console.log("Temperature change requested to ".concat(manualTemperature.value));
        if (!isNaN(Number(manualTemperature.value))) {
            this.controller.updateTemperature(Number(manualTemperature.value));
        }
    };
    return WeatherdataDisplay;
}());
exports.WeatherdataDisplay = WeatherdataDisplay;


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
/******/ 			// no module.id needed
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************************!*\
  !*** ./src/Model/WeatherStation.ts ***!
  \*************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var WeatherController_1 = __webpack_require__(/*! ../Controller/WeatherController */ "./src/Controller/WeatherController.ts");
var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
    }
    WeatherStation.prototype.setWeatherData = function () {
        console.log('WeatherStation: Temp: ' + this.temperature + ' Luftdruck: ' + this.airPressure + ' Luftfeuchtigkeit: ' + this.humidity);
        this.notifyObservers();
    };
    WeatherStation.prototype.setAirPressure = function (_airPressure) {
        this.airPressure = _airPressure;
    };
    WeatherStation.prototype.setHumidity = function (_humidity) {
        this.humidity = _humidity;
    };
    WeatherStation.prototype.setTemperature = function (_temperature) {
        this.temperature = _temperature;
    };
    // Observer Pattern
    WeatherStation.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        var index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    };
    WeatherStation.prototype.notifyObservers = function () {
        console.log("Wurde aufgerufen");
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.updateTemperature(this.temperature);
            observer.updateAirPressure(this.airPressure);
            observer.updateHumidity(this.humidity);
            // Easily extendable for more weather data like wind speed, wind direction, etc.
        }
    };
    WeatherStation.prototype.simulateNewWeatherdata = function () {
        //Get current weather data
        var currentTemperature = this.temperature;
        var currentAirPressure = this.airPressure;
        var currentHumidity = this.humidity;
        //Upper and lower limit of deviation
        var maxDeviation = 5;
        var minDeviation = -5;
        //Upper and lower limit of humidity
        var maxHumidity = 100;
        var minHumidity = 0;
        //Upper and lower limit of temperature
        var maxTemperature = 50;
        var minTemperature = -20;
        //Upper and lower limit of air pressure
        var minAirPressure = 970;
        var maxAirPressure = 1060;
        //Simulate new weather data
        //If there is no current weather data, it will generate random data
        //If there is current weather data, it will generate random data in a range of +-5, so it is more realistic
        if (!isNaN(currentTemperature)) {
            var randomTemperatureDeviation = Math.floor(Math.random() * (maxDeviation - minDeviation + 1) + minDeviation);
            if (currentTemperature + randomTemperatureDeviation > maxTemperature || currentTemperature + randomTemperatureDeviation < minTemperature) {
                this.temperature = currentTemperature + randomTemperatureDeviation * -1;
            }
            else {
                this.temperature = currentTemperature + randomTemperatureDeviation;
            }
        }
        else {
            this.temperature = Math.floor(Math.random() * (maxTemperature - minTemperature + 1) + minTemperature);
        }
        if (!isNaN(currentHumidity)) {
            var randomHumidityDeviation = Math.floor(Math.random() * (maxDeviation - minDeviation + 1) + minDeviation);
            if (currentHumidity + randomHumidityDeviation > maxHumidity || currentHumidity + randomHumidityDeviation < minHumidity) {
                this.humidity = currentHumidity + randomHumidityDeviation * -1;
            }
            else {
                this.humidity = currentHumidity + randomHumidityDeviation;
            }
        }
        else {
            this.humidity = Math.floor(Math.random() * 100);
        }
        if (!isNaN(currentAirPressure)) {
            var randomAirPressureDeviation = Math.floor(Math.random() * (maxDeviation - minDeviation + 1) + minDeviation);
            if (currentAirPressure + randomAirPressureDeviation > maxAirPressure || currentAirPressure + randomAirPressureDeviation < minAirPressure) {
                this.airPressure = currentAirPressure + randomAirPressureDeviation * -1;
            }
            else {
                this.airPressure = currentAirPressure + randomAirPressureDeviation;
            }
        }
        else {
            this.airPressure = Math.random() * (maxAirPressure - minAirPressure + 1) + minAirPressure;
        }
        //Set the new weather data
        weatherStation.setAirPressure(this.airPressure);
        weatherStation.setHumidity(this.humidity);
        weatherStation.setTemperature(this.temperature);
        //Call the method to notify the observers about the new weather data
        weatherStation.setWeatherData();
    };
    WeatherStation.prototype.startintervall = function () {
        //Call the method to simulate new weather data every second
        setInterval(this.simulateNewWeatherdata, 1000);
    };
    return WeatherStation;
}());
// Connect the weather station with the Controller
var weatherStation = new WeatherStation();
var tempDisplay = new WeatherController_1.WeatherController(weatherStation);
weatherStation.startintervall();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2VhdGhlclN0YXRpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHlCQUF5QjtBQUN6QiwyQkFBMkIsbUJBQU8sQ0FBQyxvRUFBNEI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YsZUFBZTtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHlCQUF5Qjs7Ozs7Ozs7Ozs7QUMvRFo7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsZ0RBQWdEO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsMEJBQTBCOzs7Ozs7O1VDekQxQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDBCQUEwQixtQkFBTyxDQUFDLDhFQUFpQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FiZ2FiZTMvLi9zcmMvQ29udHJvbGxlci9XZWF0aGVyQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9hYmdhYmUzLy4vc3JjL1ZpZXcvV2VhdGhlcmRhdGFEaXNwbGF5LnRzIiwid2VicGFjazovL2FiZ2FiZTMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYWJnYWJlMy8uL3NyYy9Nb2RlbC9XZWF0aGVyU3RhdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV2VhdGhlckNvbnRyb2xsZXIgPSB2b2lkIDA7XG52YXIgV2VhdGhlcmRhdGFEaXNwbGF5XzEgPSByZXF1aXJlKFwiLi4vVmlldy9XZWF0aGVyZGF0YURpc3BsYXlcIik7XG52YXIgV2VhdGhlckNvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV2VhdGhlckNvbnRyb2xsZXIod2VhdGhlclN0YXRpb24pIHtcbiAgICAgICAgdGhpcy53ZWF0aGVyZGF0YURpc3BsYXkgPSBuZXcgV2VhdGhlcmRhdGFEaXNwbGF5XzEuV2VhdGhlcmRhdGFEaXNwbGF5KHRoaXMpO1xuICAgICAgICB0aGlzLnRlbXBlcmF0dXJlQXJyYXkgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gd2VhdGhlclN0YXRpb247XG4gICAgICAgIHdlYXRoZXJTdGF0aW9uLnJlZ2lzdGVyT2JzZXJ2ZXIodGhpcyk7XG4gICAgICAgIHRoaXMud2VhdGhlcmRhdGFEaXNwbGF5ID0gbmV3IFdlYXRoZXJkYXRhRGlzcGxheV8xLldlYXRoZXJkYXRhRGlzcGxheSh0aGlzKTtcbiAgICB9XG4gICAgLy9NZXRob2RlIHVtIGRpZSBEdXJjaHNjaG5pdHRzdGVtcGVyYXR1ciB6dSBiZXJlY2huZW5cbiAgICBXZWF0aGVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlQXZlcmFnZVRlbXBlcmF0dXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXZlcmFnZVRlbXBlcmF0dXJlID0gdGhpcy50ZW1wZXJhdHVyZUFycmF5LnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0sIDApIC8gdGhpcy50ZW1wZXJhdHVyZUFycmF5Lmxlbmd0aDtcbiAgICAgICAgdGhpcy53ZWF0aGVyZGF0YURpc3BsYXkudXBkYXRlQXZlcmFnZVRlbXBlcmF0dXJlVmlldyhhdmVyYWdlVGVtcGVyYXR1cmUpO1xuICAgIH07XG4gICAgLy9NZXRob2RlIHVtIGRpZSBNaW5pbWFsdGVtcGVyYXR1ciB6dSBiZXJlY2huZW5cbiAgICBXZWF0aGVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlTWluVGVtcGVyYXR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtaW5UZW1wZXJhdHVyZSA9IE1hdGgubWluLmFwcGx5KE1hdGgsIHRoaXMudGVtcGVyYXR1cmVBcnJheSk7XG4gICAgICAgIHRoaXMud2VhdGhlcmRhdGFEaXNwbGF5LnVwZGF0ZU1pblRlbXBlcmF0dXJlVmlldyhtaW5UZW1wZXJhdHVyZSk7XG4gICAgfTtcbiAgICAvL01ldGhvZGUgdW0gZGllIE1heGltYWx0ZW1wZXJhdHVyIHp1IGJlcmVjaG5lblxuICAgIFdlYXRoZXJDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVNYXhUZW1wZXJhdHVyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1heFRlbXBlcmF0dXJlID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgdGhpcy50ZW1wZXJhdHVyZUFycmF5KTtcbiAgICAgICAgdGhpcy53ZWF0aGVyZGF0YURpc3BsYXkudXBkYXRlTWF4VGVtcGVyYXR1cmVWaWV3KG1heFRlbXBlcmF0dXJlKTtcbiAgICB9O1xuICAgIC8vTWV0aG9kZSB1bSBkaWUgVGVtcGVyYXR1ciB6dSBha3R1YWxpc2llcmVuIHVuZCBhbGxlIGRhdm9uIGFiaMOkbmdpZ2VuIE1ldGhvZGVuIGF1Znp1cnVmZW5cbiAgICBXZWF0aGVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlVGVtcGVyYXR1cmUgPSBmdW5jdGlvbiAodGVtcGVyYXR1cmUpIHtcbiAgICAgICAgdGhpcy50ZW1wZXJhdHVyZUFycmF5LnB1c2godGVtcGVyYXR1cmUpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1pblRlbXBlcmF0dXJlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWF4VGVtcGVyYXR1cmUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVBdmVyYWdlVGVtcGVyYXR1cmUoKTtcbiAgICAgICAgdGhpcy53ZWF0aGVyZGF0YURpc3BsYXkudXBkYXRlVGVtcGVyYXR1cmVWaWV3KHRlbXBlcmF0dXJlKTtcbiAgICB9O1xuICAgIC8vTWV0aG9kZSB1bSBkZW4gTHVmdGRydWNrIHp1IGFrdHVhbGlzaWVyZW5cbiAgICBXZWF0aGVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlQWlyUHJlc3N1cmUgPSBmdW5jdGlvbiAoYWlyUHJlc3N1cmUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGb3JlY2FzdChhaXJQcmVzc3VyZSk7XG4gICAgICAgIHRoaXMud2VhdGhlcmRhdGFEaXNwbGF5LnVwZGF0ZUFpclByZXNzdXJlVmlldyhhaXJQcmVzc3VyZSk7XG4gICAgfTtcbiAgICAvL01ldGhvZGUgdW0gZGllIEx1ZnRmZXVjaHRpZ2tlaXQgenUgYWt0dWFsaXNpZXJlblxuICAgIFdlYXRoZXJDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVIdW1pZGl0eSA9IGZ1bmN0aW9uIChodW1pZGl0eSkge1xuICAgICAgICB0aGlzLndlYXRoZXJkYXRhRGlzcGxheS51cGRhdGVIdW1pZGl0eVZpZXcoaHVtaWRpdHkpO1xuICAgIH07XG4gICAgLy9NZXRob2RlIHVtIGRpZSBXZXR0ZXJ2b3JoZXJzYWdlIGFuaGFuZCBkZXMgTHVmdGRydWNrZXMgenUgYmVzdGltbWVuXG4gICAgV2VhdGhlckNvbnRyb2xsZXIucHJvdG90eXBlLmdldEZvcmVjYXN0ID0gZnVuY3Rpb24gKGFpclByZXNzdXJlKSB7XG4gICAgICAgIGlmIChhaXJQcmVzc3VyZSA8IDk4MClcbiAgICAgICAgICAgIHJldHVybiAnc2VociB0aWVmLCBzdMO8cm1pc2NoJztcbiAgICAgICAgaWYgKGFpclByZXNzdXJlIDwgMTAwMClcbiAgICAgICAgICAgIHJldHVybiAndGllZiwgcmVnbmVyaXNjaCc7XG4gICAgICAgIGlmIChhaXJQcmVzc3VyZSA8IDEwMjApXG4gICAgICAgICAgICByZXR1cm4gJ25vcm1hbCwgd2VjaHNlbGhhZnQnO1xuICAgICAgICBpZiAoYWlyUHJlc3N1cmUgPCAxMDQwKVxuICAgICAgICAgICAgcmV0dXJuICdob2NoLCBzb25uaWcnO1xuICAgICAgICByZXR1cm4gJ3NlaHIgaG9jaCwgc2VociB0cm9ja2VuJztcbiAgICB9O1xuICAgIC8vTWV0aG9kZSB1bSBkaWUgV2V0dGVydm9yaGVyc2FnZSB6dSBha3R1YWxpc2llcmVuXG4gICAgV2VhdGhlckNvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZUZvcmVjYXN0ID0gZnVuY3Rpb24gKGFpclByZXNzdXJlKSB7XG4gICAgICAgIHZhciBmb3JlY2FzdCA9IHRoaXMuZ2V0Rm9yZWNhc3QoYWlyUHJlc3N1cmUpO1xuICAgICAgICB0aGlzLndlYXRoZXJkYXRhRGlzcGxheS51cGRhdGVGb3JlY2FzdFZpZXcoZm9yZWNhc3QpO1xuICAgIH07XG4gICAgcmV0dXJuIFdlYXRoZXJDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydHMuV2VhdGhlckNvbnRyb2xsZXIgPSBXZWF0aGVyQ29udHJvbGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5XZWF0aGVyZGF0YURpc3BsYXkgPSB2b2lkIDA7XG52YXIgV2VhdGhlcmRhdGFEaXNwbGF5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdlYXRoZXJkYXRhRGlzcGxheSh3ZWF0aGVyQ29udHJvbGxlcikge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSB3ZWF0aGVyQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5hZGRDaGFuZ2VUZW1wZXJhdHVyZUJ1dHRvbkxpc3RlbmVyKCk7XG4gICAgfVxuICAgIFdlYXRoZXJkYXRhRGlzcGxheS5wcm90b3R5cGUudXBkYXRlVGVtcGVyYXR1cmVWaWV3ID0gZnVuY3Rpb24gKHRlbXBlcmF0dXJlKSB7XG4gICAgICAgIHZhciB0ZW1wZXJhdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbXBlcmF0dXJlXCIpO1xuICAgICAgICB0ZW1wZXJhdHVyZUVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiLmNvbmNhdCh0ZW1wZXJhdHVyZS50b0ZpeGVkKDIpLCBcIiBcXHUwMEIwQ1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJUZW1wZXJhdHVyRGlzcGxheTogSSBuZWVkIHRvIHVwZGF0ZSBteSBkaXNwbGF5IHRvIFwiLmNvbmNhdCh0ZW1wZXJhdHVyZSkpO1xuICAgIH07XG4gICAgV2VhdGhlcmRhdGFEaXNwbGF5LnByb3RvdHlwZS51cGRhdGVBaXJQcmVzc3VyZVZpZXcgPSBmdW5jdGlvbiAoYWlyUHJlc3N1cmUpIHtcbiAgICAgICAgdmFyIGFpclByZXNzdXJlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWlyUHJlc3N1cmVcIik7XG4gICAgICAgIGFpclByZXNzdXJlRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCIuY29uY2F0KGFpclByZXNzdXJlLnRvRml4ZWQoMiksIFwiIGhQYVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJBaXJQcmVzc3VyZURpc3BsYXk6IEkgbmVlZCB0byB1cGRhdGUgbXkgZGlzcGxheSB0byBcIi5jb25jYXQoYWlyUHJlc3N1cmUpKTtcbiAgICB9O1xuICAgIFdlYXRoZXJkYXRhRGlzcGxheS5wcm90b3R5cGUudXBkYXRlSHVtaWRpdHlWaWV3ID0gZnVuY3Rpb24gKGh1bWlkaXR5KSB7XG4gICAgICAgIHZhciBodW1pZGl0eUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5XCIpO1xuICAgICAgICBodW1pZGl0eUVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiLmNvbmNhdChodW1pZGl0eS50b0ZpeGVkKDIpLCBcIiAlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkh1bWlkaXR5RGlzcGxheTogSSBuZWVkIHRvIHVwZGF0ZSBteSBkaXNwbGF5IHRvIFwiLmNvbmNhdChodW1pZGl0eSkpO1xuICAgIH07XG4gICAgV2VhdGhlcmRhdGFEaXNwbGF5LnByb3RvdHlwZS51cGRhdGVGb3JlY2FzdFZpZXcgPSBmdW5jdGlvbiAoZm9yZWNhc3QpIHtcbiAgICAgICAgdmFyIGZvcmVjYXN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZWNhc3RcIik7XG4gICAgICAgIGZvcmVjYXN0RWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCIuY29uY2F0KGZvcmVjYXN0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3JlY2FzdERpc3BsYXk6IEkgbmVlZCB0byB1cGRhdGUgbXkgZGlzcGxheSB0byBcIi5jb25jYXQoZm9yZWNhc3QpKTtcbiAgICB9O1xuICAgIFdlYXRoZXJkYXRhRGlzcGxheS5wcm90b3R5cGUudXBkYXRlTWF4VGVtcGVyYXR1cmVWaWV3ID0gZnVuY3Rpb24gKG1heFRlbXBlcmF0dXJlKSB7XG4gICAgICAgIHZhciBtYXhUZW1wZXJhdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1heGltYWxUZW1wZXJhdHVyZVwiKTtcbiAgICAgICAgbWF4VGVtcGVyYXR1cmVFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIi5jb25jYXQobWF4VGVtcGVyYXR1cmUudG9GaXhlZCgyKSwgXCIgXFx1MDBCMENcIik7XG4gICAgfTtcbiAgICBXZWF0aGVyZGF0YURpc3BsYXkucHJvdG90eXBlLnVwZGF0ZU1pblRlbXBlcmF0dXJlVmlldyA9IGZ1bmN0aW9uIChtaW5UZW1wZXJhdHVyZSkge1xuICAgICAgICB2YXIgbWluVGVtcGVyYXR1cmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW5pbWFsVGVtcGVyYXR1cmVcIik7XG4gICAgICAgIG1pblRlbXBlcmF0dXJlRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCIuY29uY2F0KG1pblRlbXBlcmF0dXJlLnRvRml4ZWQoMiksIFwiIFxcdTAwQjBDXCIpO1xuICAgIH07XG4gICAgV2VhdGhlcmRhdGFEaXNwbGF5LnByb3RvdHlwZS51cGRhdGVBdmVyYWdlVGVtcGVyYXR1cmVWaWV3ID0gZnVuY3Rpb24gKGF2ZXJhZ2VUZW1wZXJhdHVyZSkge1xuICAgICAgICB2YXIgYXZlcmFnZVRlbXBlcmF0dXJlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXZlcmFnZVRlbXBlcmF0dXJlXCIpO1xuICAgICAgICBhdmVyYWdlVGVtcGVyYXR1cmVFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIi5jb25jYXQoYXZlcmFnZVRlbXBlcmF0dXJlLnRvRml4ZWQoMiksIFwiIFxcdTAwQjBDXCIpO1xuICAgIH07XG4gICAgV2VhdGhlcmRhdGFEaXNwbGF5LnByb3RvdHlwZS5hZGRDaGFuZ2VUZW1wZXJhdHVyZUJ1dHRvbkxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZ2V0dGVtcGVyYXR1cmVidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdldHRlbXBlcmF0dXJlYnV0dG9uXCIpO1xuICAgICAgICBpZiAoZ2V0dGVtcGVyYXR1cmVidXR0b24pIHtcbiAgICAgICAgICAgIGdldHRlbXBlcmF0dXJlYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5vbkNoYW5nZVRlbXBlcmF0dXJlQnV0dG9uQ2xpY2soKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFdlYXRoZXJkYXRhRGlzcGxheS5wcm90b3R5cGUub25DaGFuZ2VUZW1wZXJhdHVyZUJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBIaWVyIGvDtm5uZW4gU2llIGRpZSBnZXfDvG5zY2h0ZSBUZW1wZXJhdHVyw6RuZGVydW5nIGFuZ2ViZW5cbiAgICAgICAgdmFyIG1hbnVhbFRlbXBlcmF0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZW1wZXJhdHVyZWlucHV0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRlbXBlcmF0dXJlIGNoYW5nZSByZXF1ZXN0ZWQgdG8gXCIuY29uY2F0KG1hbnVhbFRlbXBlcmF0dXJlLnZhbHVlKSk7XG4gICAgICAgIGlmICghaXNOYU4oTnVtYmVyKG1hbnVhbFRlbXBlcmF0dXJlLnZhbHVlKSkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci51cGRhdGVUZW1wZXJhdHVyZShOdW1iZXIobWFudWFsVGVtcGVyYXR1cmUudmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFdlYXRoZXJkYXRhRGlzcGxheTtcbn0oKSk7XG5leHBvcnRzLldlYXRoZXJkYXRhRGlzcGxheSA9IFdlYXRoZXJkYXRhRGlzcGxheTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBXZWF0aGVyQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4uL0NvbnRyb2xsZXIvV2VhdGhlckNvbnRyb2xsZXJcIik7XG52YXIgV2VhdGhlclN0YXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV2VhdGhlclN0YXRpb24oKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gW107XG4gICAgfVxuICAgIFdlYXRoZXJTdGF0aW9uLnByb3RvdHlwZS5zZXRXZWF0aGVyRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1dlYXRoZXJTdGF0aW9uOiBUZW1wOiAnICsgdGhpcy50ZW1wZXJhdHVyZSArICcgTHVmdGRydWNrOiAnICsgdGhpcy5haXJQcmVzc3VyZSArICcgTHVmdGZldWNodGlna2VpdDogJyArIHRoaXMuaHVtaWRpdHkpO1xuICAgICAgICB0aGlzLm5vdGlmeU9ic2VydmVycygpO1xuICAgIH07XG4gICAgV2VhdGhlclN0YXRpb24ucHJvdG90eXBlLnNldEFpclByZXNzdXJlID0gZnVuY3Rpb24gKF9haXJQcmVzc3VyZSkge1xuICAgICAgICB0aGlzLmFpclByZXNzdXJlID0gX2FpclByZXNzdXJlO1xuICAgIH07XG4gICAgV2VhdGhlclN0YXRpb24ucHJvdG90eXBlLnNldEh1bWlkaXR5ID0gZnVuY3Rpb24gKF9odW1pZGl0eSkge1xuICAgICAgICB0aGlzLmh1bWlkaXR5ID0gX2h1bWlkaXR5O1xuICAgIH07XG4gICAgV2VhdGhlclN0YXRpb24ucHJvdG90eXBlLnNldFRlbXBlcmF0dXJlID0gZnVuY3Rpb24gKF90ZW1wZXJhdHVyZSkge1xuICAgICAgICB0aGlzLnRlbXBlcmF0dXJlID0gX3RlbXBlcmF0dXJlO1xuICAgIH07XG4gICAgLy8gT2JzZXJ2ZXIgUGF0dGVyblxuICAgIFdlYXRoZXJTdGF0aW9uLnByb3RvdHlwZS5yZWdpc3Rlck9ic2VydmVyID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvKTtcbiAgICB9O1xuICAgIFdlYXRoZXJTdGF0aW9uLnByb3RvdHlwZS5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMub2JzZXJ2ZXJzLmluZGV4T2Yobyk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgICBXZWF0aGVyU3RhdGlvbi5wcm90b3R5cGUubm90aWZ5T2JzZXJ2ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIld1cmRlIGF1ZmdlcnVmZW5cIik7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLm9ic2VydmVyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IF9hW19pXTtcbiAgICAgICAgICAgIG9ic2VydmVyLnVwZGF0ZVRlbXBlcmF0dXJlKHRoaXMudGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIudXBkYXRlQWlyUHJlc3N1cmUodGhpcy5haXJQcmVzc3VyZSk7XG4gICAgICAgICAgICBvYnNlcnZlci51cGRhdGVIdW1pZGl0eSh0aGlzLmh1bWlkaXR5KTtcbiAgICAgICAgICAgIC8vIEVhc2lseSBleHRlbmRhYmxlIGZvciBtb3JlIHdlYXRoZXIgZGF0YSBsaWtlIHdpbmQgc3BlZWQsIHdpbmQgZGlyZWN0aW9uLCBldGMuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIFdlYXRoZXJTdGF0aW9uLnByb3RvdHlwZS5zaW11bGF0ZU5ld1dlYXRoZXJkYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL0dldCBjdXJyZW50IHdlYXRoZXIgZGF0YVxuICAgICAgICB2YXIgY3VycmVudFRlbXBlcmF0dXJlID0gdGhpcy50ZW1wZXJhdHVyZTtcbiAgICAgICAgdmFyIGN1cnJlbnRBaXJQcmVzc3VyZSA9IHRoaXMuYWlyUHJlc3N1cmU7XG4gICAgICAgIHZhciBjdXJyZW50SHVtaWRpdHkgPSB0aGlzLmh1bWlkaXR5O1xuICAgICAgICAvL1VwcGVyIGFuZCBsb3dlciBsaW1pdCBvZiBkZXZpYXRpb25cbiAgICAgICAgdmFyIG1heERldmlhdGlvbiA9IDU7XG4gICAgICAgIHZhciBtaW5EZXZpYXRpb24gPSAtNTtcbiAgICAgICAgLy9VcHBlciBhbmQgbG93ZXIgbGltaXQgb2YgaHVtaWRpdHlcbiAgICAgICAgdmFyIG1heEh1bWlkaXR5ID0gMTAwO1xuICAgICAgICB2YXIgbWluSHVtaWRpdHkgPSAwO1xuICAgICAgICAvL1VwcGVyIGFuZCBsb3dlciBsaW1pdCBvZiB0ZW1wZXJhdHVyZVxuICAgICAgICB2YXIgbWF4VGVtcGVyYXR1cmUgPSA1MDtcbiAgICAgICAgdmFyIG1pblRlbXBlcmF0dXJlID0gLTIwO1xuICAgICAgICAvL1VwcGVyIGFuZCBsb3dlciBsaW1pdCBvZiBhaXIgcHJlc3N1cmVcbiAgICAgICAgdmFyIG1pbkFpclByZXNzdXJlID0gOTcwO1xuICAgICAgICB2YXIgbWF4QWlyUHJlc3N1cmUgPSAxMDYwO1xuICAgICAgICAvL1NpbXVsYXRlIG5ldyB3ZWF0aGVyIGRhdGFcbiAgICAgICAgLy9JZiB0aGVyZSBpcyBubyBjdXJyZW50IHdlYXRoZXIgZGF0YSwgaXQgd2lsbCBnZW5lcmF0ZSByYW5kb20gZGF0YVxuICAgICAgICAvL0lmIHRoZXJlIGlzIGN1cnJlbnQgd2VhdGhlciBkYXRhLCBpdCB3aWxsIGdlbmVyYXRlIHJhbmRvbSBkYXRhIGluIGEgcmFuZ2Ugb2YgKy01LCBzbyBpdCBpcyBtb3JlIHJlYWxpc3RpY1xuICAgICAgICBpZiAoIWlzTmFOKGN1cnJlbnRUZW1wZXJhdHVyZSkpIHtcbiAgICAgICAgICAgIHZhciByYW5kb21UZW1wZXJhdHVyZURldmlhdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhEZXZpYXRpb24gLSBtaW5EZXZpYXRpb24gKyAxKSArIG1pbkRldmlhdGlvbik7XG4gICAgICAgICAgICBpZiAoY3VycmVudFRlbXBlcmF0dXJlICsgcmFuZG9tVGVtcGVyYXR1cmVEZXZpYXRpb24gPiBtYXhUZW1wZXJhdHVyZSB8fCBjdXJyZW50VGVtcGVyYXR1cmUgKyByYW5kb21UZW1wZXJhdHVyZURldmlhdGlvbiA8IG1pblRlbXBlcmF0dXJlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wZXJhdHVyZSA9IGN1cnJlbnRUZW1wZXJhdHVyZSArIHJhbmRvbVRlbXBlcmF0dXJlRGV2aWF0aW9uICogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBlcmF0dXJlID0gY3VycmVudFRlbXBlcmF0dXJlICsgcmFuZG9tVGVtcGVyYXR1cmVEZXZpYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRlbXBlcmF0dXJlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heFRlbXBlcmF0dXJlIC0gbWluVGVtcGVyYXR1cmUgKyAxKSArIG1pblRlbXBlcmF0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzTmFOKGN1cnJlbnRIdW1pZGl0eSkpIHtcbiAgICAgICAgICAgIHZhciByYW5kb21IdW1pZGl0eURldmlhdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhEZXZpYXRpb24gLSBtaW5EZXZpYXRpb24gKyAxKSArIG1pbkRldmlhdGlvbik7XG4gICAgICAgICAgICBpZiAoY3VycmVudEh1bWlkaXR5ICsgcmFuZG9tSHVtaWRpdHlEZXZpYXRpb24gPiBtYXhIdW1pZGl0eSB8fCBjdXJyZW50SHVtaWRpdHkgKyByYW5kb21IdW1pZGl0eURldmlhdGlvbiA8IG1pbkh1bWlkaXR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5odW1pZGl0eSA9IGN1cnJlbnRIdW1pZGl0eSArIHJhbmRvbUh1bWlkaXR5RGV2aWF0aW9uICogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmh1bWlkaXR5ID0gY3VycmVudEh1bWlkaXR5ICsgcmFuZG9tSHVtaWRpdHlEZXZpYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmh1bWlkaXR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzTmFOKGN1cnJlbnRBaXJQcmVzc3VyZSkpIHtcbiAgICAgICAgICAgIHZhciByYW5kb21BaXJQcmVzc3VyZURldmlhdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhEZXZpYXRpb24gLSBtaW5EZXZpYXRpb24gKyAxKSArIG1pbkRldmlhdGlvbik7XG4gICAgICAgICAgICBpZiAoY3VycmVudEFpclByZXNzdXJlICsgcmFuZG9tQWlyUHJlc3N1cmVEZXZpYXRpb24gPiBtYXhBaXJQcmVzc3VyZSB8fCBjdXJyZW50QWlyUHJlc3N1cmUgKyByYW5kb21BaXJQcmVzc3VyZURldmlhdGlvbiA8IG1pbkFpclByZXNzdXJlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5haXJQcmVzc3VyZSA9IGN1cnJlbnRBaXJQcmVzc3VyZSArIHJhbmRvbUFpclByZXNzdXJlRGV2aWF0aW9uICogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFpclByZXNzdXJlID0gY3VycmVudEFpclByZXNzdXJlICsgcmFuZG9tQWlyUHJlc3N1cmVEZXZpYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFpclByZXNzdXJlID0gTWF0aC5yYW5kb20oKSAqIChtYXhBaXJQcmVzc3VyZSAtIG1pbkFpclByZXNzdXJlICsgMSkgKyBtaW5BaXJQcmVzc3VyZTtcbiAgICAgICAgfVxuICAgICAgICAvL1NldCB0aGUgbmV3IHdlYXRoZXIgZGF0YVxuICAgICAgICB3ZWF0aGVyU3RhdGlvbi5zZXRBaXJQcmVzc3VyZSh0aGlzLmFpclByZXNzdXJlKTtcbiAgICAgICAgd2VhdGhlclN0YXRpb24uc2V0SHVtaWRpdHkodGhpcy5odW1pZGl0eSk7XG4gICAgICAgIHdlYXRoZXJTdGF0aW9uLnNldFRlbXBlcmF0dXJlKHRoaXMudGVtcGVyYXR1cmUpO1xuICAgICAgICAvL0NhbGwgdGhlIG1ldGhvZCB0byBub3RpZnkgdGhlIG9ic2VydmVycyBhYm91dCB0aGUgbmV3IHdlYXRoZXIgZGF0YVxuICAgICAgICB3ZWF0aGVyU3RhdGlvbi5zZXRXZWF0aGVyRGF0YSgpO1xuICAgIH07XG4gICAgV2VhdGhlclN0YXRpb24ucHJvdG90eXBlLnN0YXJ0aW50ZXJ2YWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL0NhbGwgdGhlIG1ldGhvZCB0byBzaW11bGF0ZSBuZXcgd2VhdGhlciBkYXRhIGV2ZXJ5IHNlY29uZFxuICAgICAgICBzZXRJbnRlcnZhbCh0aGlzLnNpbXVsYXRlTmV3V2VhdGhlcmRhdGEsIDEwMDApO1xuICAgIH07XG4gICAgcmV0dXJuIFdlYXRoZXJTdGF0aW9uO1xufSgpKTtcbi8vIENvbm5lY3QgdGhlIHdlYXRoZXIgc3RhdGlvbiB3aXRoIHRoZSBDb250cm9sbGVyXG52YXIgd2VhdGhlclN0YXRpb24gPSBuZXcgV2VhdGhlclN0YXRpb24oKTtcbnZhciB0ZW1wRGlzcGxheSA9IG5ldyBXZWF0aGVyQ29udHJvbGxlcl8xLldlYXRoZXJDb250cm9sbGVyKHdlYXRoZXJTdGF0aW9uKTtcbndlYXRoZXJTdGF0aW9uLnN0YXJ0aW50ZXJ2YWxsKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=