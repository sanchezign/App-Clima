import React, { useState, useEffect } from 'react';
import { WeatherContext } from './WeatherContext';

export const WeatherProvider = ({ children }) => {
    // Definir los estados
    const [city, setCity] = useState('Buenos Aires');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);

    // Función para obtener datos del clima y pronóstico
    const fetchWeatherData = async (cityName) => {
        const apiKey = 'a4ebb60f26d6254590445bb0b5c4a2e9';

        try {
            // Solicitud de datos del clima actual
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`
            );
            const weatherJson = await weatherResponse.json();
            setWeatherData(weatherJson);

            // Solicitud de datos para el pronóstico general
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=es`
            );
            const forecastJson = await forecastResponse.json();
            setForecastData(forecastJson);
        } catch (error) {
            alert('Error al obtener los datos del clima:', error);
        }
    };

    useEffect(() => {
        console.log("Fetching weather data for city:", city);
        fetchWeatherData(city);
    }, [city]);
    
    //buscar la cuidad
    const searchCity = (cityName) => {
        console.log("Buscando ciudad:", cityName); 
        setCity(cityName); 
    };

    return (
        <WeatherContext.Provider value={{ city, setCity, weatherData, forecastData, searchCity }}>
            {children}
        </WeatherContext.Provider>
    );
};
