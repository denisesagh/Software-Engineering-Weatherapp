import {WeatherController} from "../Controller/WeatherController";

export class WeatherdataDisplay {
    private controller: WeatherController;

    constructor(weatherController: WeatherController) {
        this.controller = weatherController;
        this.addChangeTemperatureButtonListener();
    }

    updateTemperatureView(temperature: number) {
        const temperatureElement= document.getElementById("temperature");
        temperatureElement!.textContent = `${temperature.toFixed(2)} °C`;
        console.log(`TemperaturDisplay: I need to update my display to ${temperature}`);
    }

    updateAirPressureView(airPressure: number) {
        const airPressureElement = document.getElementById("airPressure");
        airPressureElement!.textContent = `${airPressure.toFixed(2)} hPa`;
        console.log(`AirPressureDisplay: I need to update my display to ${airPressure}`);
    }

    updateHumidityView(humidity: number) {
        const humidityElement = document.getElementById("humidity");
        humidityElement!.textContent = `${humidity.toFixed(2)} %`;
        console.log(`HumidityDisplay: I need to update my display to ${humidity}`);
    }

    updateForecastView(forecast: string) {
        const forecastElement = document.getElementById("forecast");
        forecastElement!.textContent = `${forecast}`;
        console.log(`ForecastDisplay: I need to update my display to ${forecast}`);
    }

    updateMaxTemperatureView(maxTemperature: number) {
        const maxTemperatureElement = document.getElementById("maximalTemperature");
        maxTemperatureElement!.textContent = `${maxTemperature.toFixed(2)} °C`;
    }

    updateMinTemperatureView(minTemperature: number) {
        const minTemperatureElement = document.getElementById("minimalTemperature");
        minTemperatureElement!.textContent = `${minTemperature.toFixed(2)} °C`;
    }

    updateAverageTemperatureView(averageTemperature: number) {
        const averageTemperatureElement = document.getElementById("averageTemperature");
        averageTemperatureElement!.textContent = `${averageTemperature.toFixed(2)} °C`;
    }

    private addChangeTemperatureButtonListener() {
        const gettemperaturebutton = document.getElementById("gettemperaturebutton");
        if (gettemperaturebutton) {
            gettemperaturebutton.addEventListener("click", () => this.onChangeTemperatureButtonClick());
        }
    }

    private onChangeTemperatureButtonClick(): void {
        // Hier können Sie die gewünschte Temperaturänderung angeben
        const manualTemperature = document.getElementById("temperatureinput") as HTMLInputElement;
        console.log(`Temperature change requested to ${manualTemperature.value}`)
        if(!isNaN(Number(manualTemperature.value))) {
            this.controller.updateTemperature(Number(manualTemperature.value));

        }
    }
}


