import {Sensor} from "./Sensor";

export class HumiditySensor implements Sensor {
    private humidity: number;



    constructor() {
        this.getValue();
    }

    getValue(): number {

        const currentHumidity = this.humidity;

        //Upper and lower limit of deviation
        const maxDeviation = 5;
        const minDeviation = -5;

        //Upper and lower limit of humidity
        const maxHumidity = 100;
        const minHumidity = 0;




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

        // Return random humidity value
        return this.humidity;
    }
}