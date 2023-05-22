import './WeatherAppStyles.css'
import React from 'react';
export default function WeatherApp() {
    return (
        <div>
            <div id="aktuelleBedingungen">
                <h2>Aktuelle Wetterbedingungen</h2>
                <p>Temperatur: <span id="temperature"></span></p>
                <p>Luftfeuchtigkeit: <span id="humidity"></span></p>
                <p>Luftdruck: <span id="airPressure"></span></p>
            </div>
            <div id="wetterStatistiken">
                <h2>Wetterstatistiken</h2>
                <p>Durchschnittliche Temperatur: <span id="averageTemperature"></span></p>
                <p>Maximale Temperatur: <span id="maximalTemperature"></span></p>
                <p>Minimale Temperatur: <span id="minimalTemperature"></span></p>
            </div>
            <div id="wetterVorhersage">
                <h2>Wettervorhersage</h2>
                <p>Vorhersage-Tendenz: <span id="forecast"></span></p>
            </div>
            <div>
                <input id="temperatureinput" placeholder="Temperatur eingeben" />
                <button id="gettemperaturebutton">Temperatur hinzufügen</button>
            </div>
        </div>
    )
}

