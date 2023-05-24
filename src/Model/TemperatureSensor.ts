import {Sensor} from "./Sensor";

export class TemperatureSensor implements Sensor {

    private temperature: number;
    getValue(): number {
        const currentTemperature = this.temperature;

        //Upper and lower limit of deviation
        const maxDeviation = 5;
        const minDeviation = -5;

        //Upper and lower limit of temperature
        const maxTemperature = 50;
        const minTemperature = -20;

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

        // Return random temperature value
        return this.temperature;


    }
}