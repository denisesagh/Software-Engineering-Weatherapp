import {WeatherdataDisplay} from "../View/WeatherdataDisplay";
import Chart from "chart.js/auto";

//Wetter Controller Klasse. Hier werden die Daten verarbeitet und an die View weitergegeben
export class WeatherController{

    private subject: Subject;
    weatherdataDisplay = new WeatherdataDisplay(this);
    public temperatureArray = new Array<number>();
    private messurementTimeStamps = new Array<string>();

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }

    //Methode to calculate the average temperature
    public updateAverageTemperature(): void {
        const averageTemperature = this.temperatureArray.reduce((a, b) => a + b, 0) / this.temperatureArray.length;
        this.weatherdataDisplay.updateAverageTemperatureView(averageTemperature);
    }

    //Methode to calculate the minimum temperature
    public updateMinTemperature(): void {
        const minTemperature = Math.min(...this.temperatureArray);
        this.weatherdataDisplay.updateMinTemperatureView(minTemperature);
    }

    //Methode to calculate the maximum temperature
    public updateMaxTemperature(): void {
        const maxTemperature = Math.max(...this.temperatureArray);
        this.weatherdataDisplay.updateMaxTemperatureView(maxTemperature);
    }

    //Methode to process the data for the chart and to pass it to the chart in the view
    public updateChart(): void {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;
        this.messurementTimeStamps.push(dateTime);
        this.weatherdataDisplay.updateChartData(this.messurementTimeStamps, this.temperatureArray)
    }

    //Method to update the temperature and call all dependent methods
    public updateTemperature(temperature: number): void {
        this.temperatureArray.push(temperature);
        if (this.temperatureArray.length > 10) this.temperatureArray.shift(), this.messurementTimeStamps.shift();
        this.updateMinTemperature();
        this.updateMaxTemperature();
        this.updateAverageTemperature();
        this.updateChart();
        this.weatherdataDisplay.updateTemperatureView(temperature);

    }

    //Methode to update the air pressure
    public updateAirPressure(airPressure: number): void {
        this.updateForecast(airPressure);
        this.weatherdataDisplay.updateAirPressureView(airPressure)
    }

    //Methode to update the humidity
    public updateHumidity(humidity: number): void {
        this.weatherdataDisplay.updateHumidityView(humidity)
    }

    //Methode to determine the weather forecast based on the air pressure
    public getForecast(airPressure: number): string {
        if (airPressure < 980) return 'sehr tief, stürmisch';
        if (airPressure < 1000) return 'tief, regnerisch';
        if (airPressure < 1020) return 'normal, wechselhaft';
        if (airPressure < 1040) return 'hoch, sonnig';
        return 'sehr hoch, sehr trocken';

    }

    //Methode to update the weather forecast
    public updateForecast(airPressure: number): void {
        const forecast = this.getForecast(airPressure);
        this.weatherdataDisplay.updateForecastView(forecast);
    }
}


