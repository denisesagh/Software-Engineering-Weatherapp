import {WeatherController} from "../Controller/WeatherController";
import {Chart} from "chart.js";

export class WeatherdataDisplay {
    private controller: WeatherController;

    private temperatureArray = new Array<number>();
    private messurementTimeStamps = new Array<string>();

    constructor(weatherController: WeatherController) {
        this.controller = weatherController;
        this.addChangeTemperatureButtonListener();
    }

    //Methode to update the temperature view
    updateTemperatureView(temperature: number) {
        const temperatureElement= document.getElementById("temperature");
        temperatureElement!.textContent = `${temperature.toFixed(2)} °C`;
        console.log(`TemperaturDisplay: I need to update my display to ${temperature}`);
    }

    //Methode to update the air pressure view
    updateAirPressureView(airPressure: number) {
        const airPressureElement = document.getElementById("airPressure");
        airPressureElement!.textContent = `${airPressure.toFixed(2)} hPa`;
        console.log(`AirPressureDisplay: I need to update my display to ${airPressure}`);
    }

    //Methode to update the humidity view
    updateHumidityView(humidity: number) {
        const humidityElement = document.getElementById("humidity");
        humidityElement!.textContent = `${humidity.toFixed(2)} %`;
        console.log(`HumidityDisplay: I need to update my display to ${humidity}`);
    }

    //Methode to update the forecast view
    updateForecastView(forecast: string) {
        const forecastElement = document.getElementById("forecast");
        forecastElement!.textContent = `${forecast}`;
        console.log(`ForecastDisplay: I need to update my display to ${forecast}`);
    }

    //Methode to update the maximal temperature view
    updateMaxTemperatureView(maxTemperature: number) {
        const maxTemperatureElement = document.getElementById("maximalTemperature");
        maxTemperatureElement!.textContent = `${maxTemperature.toFixed(2)} °C`;
    }

    //Methode to update the minimal temperature view
    updateMinTemperatureView(minTemperature: number) {
        const minTemperatureElement = document.getElementById("minimalTemperature");
        minTemperatureElement!.textContent = `${minTemperature.toFixed(2)} °C`;
    }

    //Methode to update the average temperature view
    updateAverageTemperatureView(averageTemperature: number) {
        const averageTemperatureElement = document.getElementById("averageTemperature");
        averageTemperatureElement!.textContent = `${averageTemperature.toFixed(2)} °C`;
    }

    //Methode to update the chart view
    updateChartView(messurementTimeStamps: Array<string>, temperatureArray: Array<number>, ) {
        this.temperatureChart.data.datasets[0].data = temperatureArray;
        this.messurementTimeStamps = messurementTimeStamps;
        this.temperatureChart.update();
    }

    //Chart
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

    //Methode to add a listener to the change temperature button
    private addChangeTemperatureButtonListener() {
        const gettemperaturebutton = document.getElementById("gettemperaturebutton");
        if (gettemperaturebutton) {
            gettemperaturebutton.addEventListener("click", () => this.onChangeTemperatureButtonClick());
        }
    }

    //Methode to manually change the temperature
    private onChangeTemperatureButtonClick(): void {
        // Hier können Sie die gewünschte Temperaturänderung angeben
        const manualTemperature = document.getElementById("temperatureinput") as HTMLInputElement;
        console.log(`Temperature change requested to ${manualTemperature.value}`)
        if(!isNaN(Number(manualTemperature.value))) {
            this.controller.updateTemperature(Number(manualTemperature.value));

        }
    }
}



