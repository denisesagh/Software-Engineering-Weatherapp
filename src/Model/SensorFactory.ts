import {Sensor} from "./Sensor";
import {TemperatureSensor} from "./TemperatureSensor";
import {HumiditySensor} from "./HumiditySensor";
import {AirPressureSensor} from "./AirPressureSensor";

export abstract class SensorFactory {

    // Factory Method Pattern checks the type of the sensor and returns the corresponding sensor
    public static getSensor(type: string): Sensor {
        console.log("SensorFactory: " + type)
        switch (type) {
            case 'temperature':
                console.log("TemperatureSensor wird erstellt")
                return new TemperatureSensor();
            case 'humidity':
                return new HumiditySensor();
            case 'airPressure':
                return new AirPressureSensor();
        }

    }
}