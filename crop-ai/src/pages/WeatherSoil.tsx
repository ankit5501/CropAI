import React, { useEffect, useState } from "react";
import { Cloud, Thermometer, Droplets, Wind, Sun, Eye, AlertCircle, Loader } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';

interface FullWeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
    uv_index: number[];
    soil_moisture_9_to_27cm: number[];
    windspeed_10m: number[];
  };
  current_units?: {
    temperature_2m: string;
    relative_humidity_2m: string;
    precipitation: string;
    windspeed_10m: string;
    uv_index: string;
  };
  alerts?: {
    event: string;
    start: string;
    end: string;
    description: string;
  }[];
}

const WeatherSoil: React.FC = () => {
  const { language } = useLanguage();
  const { currentLocation } = useLocation();
  const [fullWeatherData, setFullWeatherData] = useState<FullWeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchFullWeather = async () => {
      if (!currentLocation || !currentLocation.latitude || !currentLocation.longitude) {
        setWeatherLoading(false);
        setWeatherError("Location data is not available.");
        return;
      }

      setWeatherLoading(true);
      setWeatherError(null);

      const hourlyVars = `temperature_2m,relative_humidity_2m,precipitation,uv_index,soil_moisture_9_to_27cm,windspeed_10m`;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&hourly=${hourlyVars}&alerts=true&timezone=auto`;
      
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`API returned status: ${res.status}`);
        }
        const json = await res.json();
        if (!cancelled) {
          setFullWeatherData(json);
          setWeatherLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch full weather data:", err);
          setWeatherError(`Failed to fetch weather data. Please try again later.`);
          setWeatherLoading(false);
        }
      }
    };
    fetchFullWeather();
    return () => { cancelled = true; };
  }, [currentLocation]);

  if (weatherLoading) {
    return (
      <div className="flex justify-center items-center h-48 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
        <p className="ml-4 text-gray-600">Loading weather data...</p>
      </div>
    );
  }

  if (weatherError) {
    return (
      <div className="flex justify-center items-center h-48 bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center text-red-700">
        <p>Error: {weatherError}</p>
      </div>
    );
  }

  if (!fullWeatherData) {
    return null;
  }

  const currentWeather = {
    temperature: fullWeatherData.hourly.temperature_2m[0],
    humidity: fullWeatherData.hourly.relative_humidity_2m[0],
    rainfall: fullWeatherData.hourly.precipitation[0],
    soil_moisture: fullWeatherData.hourly.soil_moisture_9_to_27cm[0],
    windSpeed: fullWeatherData.hourly.windspeed_10m[0],
    uv: fullWeatherData.hourly.uv_index[0],
    visibility: "—" // Open-Meteo API doesn't provide visibility
  };

  const soilData = {
    ph: 6.8,
    nitrogen: 'Medium',
    phosphorus: 'High',
    potassium: 'Medium',
    organicMatter: 'Good',
    moisture: currentWeather.soil_moisture
  };

  const chartData = fullWeatherData.hourly.time.slice(0, 24).map((t, i) => ({
    day: new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: fullWeatherData.hourly.temperature_2m[i],
    rainfall: fullWeatherData.hourly.precipitation[i]
  }));

  const forecast = Array(7).fill(null).map((_, i) => ({
    day: `Day ${i + 1}`,
    temp: fullWeatherData.hourly.temperature_2m[i * 24],
    condition: fullWeatherData.hourly.precipitation[i * 24] > 0.1 ? 'Rainy' : 'Clear',
    rain: fullWeatherData.hourly.precipitation[i * 24]
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Current Weather */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{language === 'hi' ? 'वर्तमान मौसम' : 'Current Weather'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Thermometer className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-700">{currentWeather.temperature.toFixed(1)}°C</p>
            <p className="text-sm text-gray-600">{language === 'hi' ? 'तापमान' : 'Temperature'}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-700">{currentWeather.humidity.toFixed(0)}%</p>
            <p className="text-sm text-gray-600">{language === 'hi' ? 'नमी' : 'Humidity'}</p>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <Cloud className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-indigo-700">{currentWeather.rainfall.toFixed(1)}mm</p>
            <p className="text-sm text-gray-600">{language === 'hi' ? 'बारिश' : 'Rainfall'}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Wind className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-700">{currentWeather.windSpeed.toFixed(1)} km/h</p>
            <p className="text-sm text-gray-600">{language === 'hi' ? 'हवा की गति' : 'Wind Speed'}</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Sun className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-700">{currentWeather.uv.toFixed(1)}</p>
            <p className="text-sm text-gray-600">UV {language === 'hi' ? 'सूचकांक' : 'Index'}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-700">{currentWeather.visibility} km</p>
            <p className="text-sm text-gray-600">{language === 'hi' ? 'दृश्यता' : 'Visibility'}</p>
          </div>
        </div>
      </div>

      {/* Soil Moisture */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-800">{language === 'hi' ? 'मिट्टी की नमी' : 'Soil Moisture'}</span>
        </div>
        <p className="text-lg font-bold text-blue-700">{soilData.moisture.toFixed(2)} %</p>
      </div>

      {/* Weather Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{language === 'hi' ? 'मौसम का रुझान' : 'Weather Trend'}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="temp" orientation="left" />
            <YAxis yAxisId="rain" orientation="right" />
            <Tooltip />
            <Line yAxisId="temp" type="monotone" dataKey="temp" stroke="#F97316" strokeWidth={2} name="Temperature (°C)" />
            <Line yAxisId="rain" type="monotone" dataKey="rainfall" stroke="#3B82F6" strokeWidth={2} name="Rainfall (mm)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 7-Day Forecast + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forecast */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{language === 'hi' ? '7 दिन का पूर्वानुमान' : '7-Day Forecast'}</h2>
          <div className="space-y-3">
            {forecast.map((day, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{day.day}</p>
                    <p className="text-sm text-gray-600">{day.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{day.temp.toFixed(1)}°C</p>
                  <p className="text-sm text-blue-600">{day.rain.toFixed(1)}mm</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-red-50 rounded-xl p-6 shadow-lg border border-red-100">
          <h2 className="text-xl font-semibold text-red-700 mb-6">{language === 'hi' ? 'मौसम अलर्ट' : 'Weather Alerts'}</h2>
          {fullWeatherData?.alerts && fullWeatherData.alerts.length > 0 ? (
            <div className="space-y-3">
              {fullWeatherData.alerts.map((a, i) => (
                <div key={i} className="p-3 bg-red-100 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-800">{a.event}</span>
                  </div>
                  <p className="text-sm text-red-700">{a.description || `${a.start} - ${a.end}`}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-700">{language === 'hi' ? 'कोई अलर्ट नहीं' : 'No alerts'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherSoil;
