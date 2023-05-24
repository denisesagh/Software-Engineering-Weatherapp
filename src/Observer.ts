interface Observer {
    updateTemperature(temperature: number): void;
    updateAirPressure(airPressure: number): void;
    updateHumidity(humidity: number): void;
    updateForecast(airPressure: number): void;
    updateMaxTemperature(temperature: number): void;

}