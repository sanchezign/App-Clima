import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { WiDaySunny, WiRain, WiCloudy, WiSnowflakeCold, WiThunderstorm, WiFog, WiTornado, WiRaindrops, WiDust, WiStrongWind } from "react-icons/wi";  // Importamos más íconos
import { MdOutlineWifiTetheringError } from "react-icons/md";

const MainWeather = () => {

  const { weatherData, city } = useContext(WeatherContext)

  //Validar datos
  if (!weatherData || weatherData.cod !== 200) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-300 dark:bg-zinc-800 p-8 rounded-lg text-zinc-800 dark:text-white">
        <h2 className="text-2xl">No se encontró la ciudad: <span className="font-bold">{city}</span>.</h2>
        Por favor, intenta con una ubicación válida.
        <MdOutlineWifiTetheringError className="text-[230px] font-bold text-red-600" />
      </div>
    )
  }

  // Extraer datos necesarios
  const {
    main: { temp },
    weather,
    dt,
  } = weatherData;

  const description = weather[0]?.description || "Sin descripción";
  const icon = weather[0]?.main; 

  // Función para formatear la fecha
  const formatDate = (timestamp) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(timestamp * 1000).toLocaleDateString('es-ES', options);
  };

  // Elegir el ícono según el estado del clima
  const renderWeatherIcon = (icon) => {
    switch (icon) {
      case "Clear":
        return <WiDaySunny className="text-[9rem] font-bold text-yellow-600" />;
      case "Rain":
        return <WiRain className="text-[9rem] font-bold text-blue-600" />;
      case "Clouds":
        return <WiCloudy className="text-[9rem] font-bold text-gray-600" />;
      case "Snow":
        return <WiSnowflakeCold className="text-[9rem] font-bold text-blue-300" />;
      case "Thunderstorm":
        return <WiThunderstorm className="text-[9rem] font-bold text-yellow-500" />;
      case "Mist":
        return <WiFog className="text-[9rem] font-bold text-gray-500" />;
      case "Drizzle":
        return <WiRaindrops className="text-[9rem] font-bold text-blue-400" />;
      case "Tornado":
        return <WiTornado className="text-[9rem] font-bold text-red-500" />;
      case "Dust":
        return <WiDust className="text-[9rem] font-bold text-yellow-600" />;
      case "Sand":
        return <WiDust className="text-[9rem] font-bold text-yellow-500" />;
      case "Haze":
        return <WiFog className="text-[9rem] font-bold text-gray-600" />;
      case "Wind":
        return <WiStrongWind className="text-[9rem] font-bold text-gray-400" />;
      default:
        return <WiDaySunny className="text-[9rem] font-bold text-yellow-600" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-300 dark:bg-zinc-800 p-8 rounded-lg text-zinc-800 dark:text-white">
      <div className="rounded-lg mb-4 flex flex-row items-center gap-12">
        <h1 className="text-4xl">{city}</h1>
        <p className="text-xl">{formatDate(dt)}</p>
      </div>
      <div className="flex items-center gap-12 p-[20px]">
        <h2 className="text-9xl font-bold mr-4">{Math.round(temp)}°C</h2>
        <div className="flex flex-col items-center">
          {renderWeatherIcon(icon)}
          <p className="text-3xl mt-2">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default MainWeather;
