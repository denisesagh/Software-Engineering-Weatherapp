

import { WeatherController } from "../Controller/WeatherController";
import {Sensor} from "./Sensor";
import {SensorFactory} from "./SensorFactory";
class WeatherStation implements Subject{

    private temperature: number;
    private airPressure: number;
    private humidity: number;

    public sensors: Sensor[] = [];
    private observers: Observer[] = [];

    constructor() {
        console.log("Sensoren sollen gepusht werden")

        this.sensors.push(SensorFactory.getSensor('temperature'));
        this.sensors.push(SensorFactory.getSensor('humidity'));
        this.sensors.push(SensorFactory.getSensor('airPressure'));
        console.log("Sensoren wurden gepusht")

        console.log(this.sensors)

    }


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



    simulateNewWeatherdata(sensoreliste: Sensor[]) {

        console.log(sensoreliste)
        for (let sensor of sensoreliste) {
            const value = sensor.getValue();
            switch (sensor.constructor.name) {
                case 'TemperatureSensor':
                    this.setTemperature(value);
                    break;
                case 'HumiditySensor':
                    this.setHumidity(value);
                    break;
                case 'AirPressureSensor':
                    this.setAirPressure(value);
                    break;
            }

            // Update corresponding weather data based on sensor type
        }
        this.setWeatherData();
    }


    startintervall(){
        //Call the method to simulate new weather data every second
        setInterval(() => {this.simulateNewWeatherdata(this.sensors)}, 3000);
        console.log(this.sensors)

    }

}


// Connect the weather station with the Controller
let weatherStation = new WeatherStation();
let tempDisplay = new WeatherController(weatherStation);
weatherStation.startintervall();

