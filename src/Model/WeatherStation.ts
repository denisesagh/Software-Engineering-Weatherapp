

import { WeatherController } from "../Controller/WeatherController";
class WeatherStation implements Subject{

    private temperature: number;
    private airPressure: number;
    private humidity: number;

    private observers: Observer[] = [];


    setWeatherData() {
        console.log('WeatherStation: Temp: ' + this.temperature + ' Luftdruck: ' + this.airPressure + ' Luftfeuchtigkeit: ' + this.humidity);
        this.notifyObservers()
    }

    setAirPressure(_airPressure: number) {
        this.airPressure = _airPressure;
    }
    setHumidity(_humidity: number) {
        this.humidity = _humidity;
    }

    setTemperature(_temperature: number) {
        this.temperature = _temperature;
    }

    // Observer Pattern
    public registerObserver(o: Observer): void {
        this.observers.push(o);
    }

    public removeObserver(o: Observer): void {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    }

    public notifyObservers(): void {
        console.log("Wurde aufgerufen")
        for (let observer of this.observers) {
            observer.updateTemperature(this.temperature);
            observer.updateAirPressure(this.airPressure);
            observer.updateHumidity(this.humidity);
            // Easily extendable for more weather data like wind speed, wind direction, etc.
        }
    }



    simulateNewWeatherdata() {

        //Get current weather data
        const currentTemperature = this.temperature;
        const currentAirPressure = this.airPressure;
        const currentHumidity = this.humidity;

        //Upper and lower limit of deviation
        const maxDeviation = 5;
        const minDeviation = -5;

        //Upper and lower limit of humidity
        const maxHumidity = 100;
        const minHumidity = 0;

        //Upper and lower limit of temperature
        const maxTemperature = 50;
        const minTemperature = -20;

        //Upper and lower limit of air pressure
        const minAirPressure = 970;
        const maxAirPressure = 1060;

        //Simulate new weather data
        //If there is no current weather data, it will generate random data
        //If there is current weather data, it will generate random data in a range of +-5, so it is more realistic
        if(!isNaN(currentTemperature)) {
            const randomTemperatureDeviation = Math.floor(Math.random()  * (maxDeviation - minDeviation + 1) + minDeviation);
            if (currentTemperature + randomTemperatureDeviation > maxTemperature || currentTemperature + randomTemperatureDeviation < minTemperature) {
                this.temperature = currentTemperature + randomTemperatureDeviation * -1;
            }else{
                this.temperature = currentTemperature + randomTemperatureDeviation;
            }
        }else{
            this.temperature = Math.floor(Math.random() * (maxTemperature - minTemperature + 1) + minTemperature);
        }

        if(!isNaN(currentHumidity)) {
            const randomHumidityDeviation = Math.floor(Math.random()  * (maxDeviation - minDeviation + 1) + minDeviation);
            if(currentHumidity + randomHumidityDeviation > maxHumidity || currentHumidity + randomHumidityDeviation < minHumidity) {
                this.humidity = currentHumidity + randomHumidityDeviation * -1;
            }else{
                this.humidity = currentHumidity + randomHumidityDeviation;
            }
        }else{
            this.humidity = Math.floor(Math.random() * 100);
        }

        if(!isNaN(currentAirPressure)) {
            const randomAirPressureDeviation = Math.floor(Math.random()  * (maxDeviation - minDeviation + 1) + minDeviation);
            if (currentAirPressure + randomAirPressureDeviation > maxAirPressure || currentAirPressure + randomAirPressureDeviation < minAirPressure) {
                this.airPressure = currentAirPressure + randomAirPressureDeviation * -1;
            }else{
                this.airPressure = currentAirPressure + randomAirPressureDeviation;
            }
        }else{
            this.airPressure = Math.random() * (maxAirPressure - minAirPressure + 1) + minAirPressure;
        }



        //Set the new weather data
        weatherStation.setAirPressure(this.airPressure);
        weatherStation.setHumidity(this.humidity);
        weatherStation.setTemperature(this.temperature);

        //Call the method to notify the observers about the new weather data
        weatherStation.setWeatherData();
    }

    startintervall(){
        //Call the method to simulate new weather data every second
        setInterval(this.simulateNewWeatherdata, 1000);
    }
}


// Connect the weather station with the Controller
let weatherStation = new WeatherStation();
let tempDisplay = new WeatherController(weatherStation);
weatherStation.startintervall();

