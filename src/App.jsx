import './index.css';
import Header from './components/header';
import MainWeather from './components/MainWeather';
import WeatherDetails from './components/WeatherDetails';
import WeeklyForecast from './components/WeeklyForecast';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-200 dark:bg-zinc-900">
      <div className="w-full max-w-[1120px]">
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      </div>

      {/* Contenedor para el layout, usando clases responsivas */}
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-4 w-full max-w-6xl p-4">
        <div className="col-span-1 sm:col-span-5 h-full">
          <MainWeather />
        </div>
        <div className="col-span-1 sm:col-span-3 h-full">
          <WeatherDetails />
        </div>
      </div>

      {/* El pronóstico semanal también puede adaptarse */}
      <WeeklyForecast />
    </div>
  );
}

export default App;
