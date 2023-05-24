import {Sensor} from "./Sensor";


export class AirPressureSensor implements Sensor {

    private airPressure: number;

    getValue(): number {
        const currentAirPressure = this.airPressure;

        //Upper and lower limit of deviation
        const maxDeviation = 5;
        const minDeviation = -5;

        //Upper and lower limit of air pressure
        const minAirPressure = 970;
        const maxAirPressure = 1060;

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
        // Return random air pressure value
        return this.airPressure;
    }
}
