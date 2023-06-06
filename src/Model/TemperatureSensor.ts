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

        //If the current air pressure is NaN (e.g. at the beginning of the program), a random value is generated.
        //Otherwise, the current air pressure is used as the basis for the deviation.
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

        // Return temperature value
        return this.temperature;


    }
}