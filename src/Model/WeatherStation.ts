

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
        this.sensors.push(SensorFactory.getSensor('temperature'));
        this.sensors.push(SensorFactory.getSensor('humidity'));
        this.sensors.push(SensorFactory.getSensor('airPressure'));
        console.log(this.sensors)
    }

    setWeatherData() {
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

    public registerObserver(o: Observer): void {
        this.observers.push(o);
    }

    public removeObserver(o: Observer): void {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    }

    //Methode to notify all observers
    public notifyObservers(): void {
        for (let observer of this.observers) {
            observer.updateTemperature(this.temperature);
            observer.updateAirPressure(this.airPressure);
            observer.updateHumidity(this.humidity);
        }
    }

    //Methode to set the weather data depending on the sensor measurements
    simulateNewWeatherdata(sensorliste: Sensor[]) {
        console.log(sensorliste)
        for (let sensor of sensorliste) {
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
        }
        this.setWeatherData();
    }

    //Methode to simulate new weather data every 3 seconds
    startintervall(){
        setInterval(() => {this.simulateNewWeatherdata(this.sensors)}, 3000);
        console.log(this.sensors)
    }
}


// Connect the weather station with the Controller
let weatherStation = new WeatherStation();
let tempDisplay = new WeatherController(weatherStation);
weatherStation.startintervall();

