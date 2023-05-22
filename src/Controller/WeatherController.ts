import {WeatherdataDisplay} from "../View/WeatherdataDisplay";

import {Chart} from "chart.js/auto";
import * as timers from "timers";

export class WeatherController{

    private subject: Subject;
    weatherdataDisplay = new WeatherdataDisplay(this);
    public temperatureArray = new Array<number>();

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);

        this.weatherdataDisplay = new WeatherdataDisplay(this);
    }


    //Methode um die Durchschnittstemperatur zu berechnen
    public updateAverageTemperature(): void {
        const averageTemperature = this.temperatureArray.reduce((a, b) => a + b, 0) / this.temperatureArray.length;
        this.weatherdataDisplay.updateAverageTemperatureView(averageTemperature);
    }

    //Methode um die Minimaltemperatur zu berechnen
    public updateMinTemperature(): void {
        const minTemperature = Math.min(...this.temperatureArray);
        this.weatherdataDisplay.updateMinTemperatureView(minTemperature);
    }

    //Methode um die Maximaltemperatur zu berechnen
    public updateMaxTemperature(): void {
        const maxTemperature = Math.max(...this.temperatureArray);
        this.weatherdataDisplay.updateMaxTemperatureView(maxTemperature);
    }



    private messurementTimeStamps = new Array<string>();

    private ctx = document.getElementById("temperatureChart") as HTMLCanvasElement;
    private temperatureChart = new Chart(this.ctx, {
        type: 'line',
        data: {
            labels: this.messurementTimeStamps,

            datasets: [
                {
                    label: 'Temperatur',
                    data: this.temperatureArray,
                }
            ]
        },

    });




    public updateChart(): void {

        this.temperatureChart.data.datasets[0].data = this.temperatureArray;
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;
        this.messurementTimeStamps.push(dateTime);
        this.temperatureChart.update();

    }


    //Methode um die Temperatur zu aktualisieren und alle davon abhängigen Methoden aufzurufen
    public updateTemperature(temperature: number): void {
        this.temperatureArray.push(temperature);
        if (this.temperatureArray.length > 10) this.temperatureArray.shift(), this.messurementTimeStamps.shift();
        this.updateMinTemperature();
        this.updateMaxTemperature();
        this.updateAverageTemperature();
        this.updateChart();

        this.weatherdataDisplay.updateTemperatureView(temperature);

    }

    //Methode um den Luftdruck zu aktualisieren
    public updateAirPressure(airPressure: number): void {
        this.updateForecast(airPressure);
        this.weatherdataDisplay.updateAirPressureView(airPressure)
    }

    //Methode um die Luftfeuchtigkeit zu aktualisieren
    public updateHumidity(humidity: number): void {
        this.weatherdataDisplay.updateHumidityView(humidity)
    }

    //Methode um die Wettervorhersage anhand des Luftdruckes zu bestimmen
    public getForecast(airPressure: number): string {
        if (airPressure < 980) return 'sehr tief, stürmisch';
        if (airPressure < 1000) return 'tief, regnerisch';
        if (airPressure < 1020) return 'normal, wechselhaft';
        if (airPressure < 1040) return 'hoch, sonnig';
        return 'sehr hoch, sehr trocken';

    }

    //Methode um die Wettervorhersage zu aktualisieren
    public updateForecast(airPressure: number): void {
        const forecast = this.getForecast(airPressure);
        this.weatherdataDisplay.updateForecastView(forecast);
    }






}


