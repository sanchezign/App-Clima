import React, { useContext } from 'react';
import { WiHumidity, WiStrongWind, WiBarometer, WiDayFog } from "react-icons/wi";
import { WeatherContext } from '../context/WeatherContext';
import { TfiAlert } from "react-icons/tfi";

const WeatherDetails = () => {
    const { weatherData } = useContext(WeatherContext);

    // Si no hay datos se muestra error
    if (!weatherData || !weatherData.main || !weatherData.wind || !weatherData.visibility) {
        return (
            <div className="bg-slate-300 dark:bg-zinc-800 p-8 rounded-lg text-center text-zinc-800 dark:text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">No fue posible cargar los detalles atmosféricos...</h1>
                <TfiAlert className="text-[206px] text-red-600" />
            </div>
        );
    }

    // Extraemos los datos necesarios
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const pressure = weatherData.main.pressure;
    const visibility = (weatherData.visibility / 1000).toFixed(1);

    return (
        <div className="bg-slate-300 dark:bg-zinc-800 p-8 rounded-lg text-zinc-800 dark:text-white flex flex-col gap-7">
            <h1 className="text-3xl font-bold mb-4">Detalles Atmosféricos</h1>
            <div className="flex items-center gap-3">
                <WiHumidity className="text-3xl text-blue-500" />
                <p>Humedad: {humidity}%</p>
            </div>
            <div className="flex items-center gap-3">
                <WiStrongWind className="text-3xl text-green-500" />
                <p>Viento: {windSpeed} km/h</p>
            </div>
            <div className="flex items-center gap-3">
                <WiBarometer className="text-3xl text-purple-500" />
                <p>Presión: {pressure} hPa</p>
            </div>
            <div className="flex items-center gap-3">
                <WiDayFog className="text-3xl text-gray-500" />
                <p>Visibilidad: {visibility} km</p>
            </div>
        </div>
    );
};

export default WeatherDetails;
