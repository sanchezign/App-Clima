import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const WeeklyForecast = () => {

  const { forecastData } = useContext(WeatherContext);

  if (!forecastData || !forecastData.list) {
    return (
      <div className="bg-slate-300 dark:bg-zinc-800 p-4 rounded-lg max-w-[1120px] w-full mx-auto text-center" >
        <p className="text-4xl">No se encontró el pronóstico semanal</p>
      </div>
    );
  }

  const renderWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return <WiDaySunny className="text-yellow-600 text-4xl" />;
      case 'Clouds':
        return <WiCloudy className="text-gray-600 text-4xl" />;
      case 'Rain':
        return <WiRain className="text-blue-500 text-4xl" />;
      case 'Snow':
        return <WiSnow className="text-blue-300 text-4xl" />;
      case 'Thunderstorm':
        return <WiThunderstorm className="text-purple-600 text-4xl" />;
      default:
        return <WiDaySunny className="text-yellow-600 text-4xl" />;
    }
  };

  const dailyForecast = forecastData.list.filter((item) =>
    item.dt_txt.includes('12:00:00')
  );

  return (
    <div className="bg-slate-300 dark:bg-zinc-800 p-4 rounded-lg max-w-[1120px] w-full mx-auto">
      <div className="flex justify-around text-zinc-800 dark:text-white">
        {dailyForecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            {/* Fecha del día */}
            <p className="text-lg font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long' })}
            </p>
            {/* Ícono del clima */}
            <div>{renderWeatherIcon(day.weather[0].main)}</div>
            {/* Temperatura promedio */}
            <p className="text-xl">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;