// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useLocation } from './LocationContext';

// interface WeatherData {
//     temperature: number | string;
//     humidity: number | string;
//     rainfall: number | string;
// }

// interface WeatherContextType {
//     weatherData: WeatherData | null;
//     weatherLoading: boolean;
//     weatherError: string | null;
// }

// const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const { currentLocation } = useLocation();
//     const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//     const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
//     const [weatherError, setWeatherError] = useState<string | null>(null);

//     // This function fetches the weather data from the API
//     const fetchWeatherData = async (latitude: number, longitude: number) => {
//         setWeatherLoading(true);
//         setWeatherError(null);
//         try {
//             const hourlyVars = `temperature_2m,relative_humidity_2m,precipitation,uv_index,soil_moisture_9_to_27cm,windspeed_10m`;
//             const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars}&alerts=true&timezone=auto`;
//             const res = await fetch(url);
//             const json = await res.json();
//             if (!res.ok) throw new Error(json.reason || 'Failed to fetch weather data');
            
//             const h = json.hourly;
//             const now = new Date();
//             const idx = h.time.findIndex((t: string) => Math.abs(new Date(t).getTime() - now.getTime()) < 3600000);

//             const toNumberArray = (arr: any[] | undefined): number[] => {
//                 if (!Array.isArray(arr)) return [];
//                 return arr.map(v => typeof v === 'number' ? v : Number(v)).filter(v => !isNaN(v));
//             };

//             const getNumeric = (arr: number[]) => {
//                 const v = arr[idx];
//                 return v === undefined || Number.isNaN(v) ? "—" : Math.round((v + Number.EPSILON) * 100) / 100;
//             };

//             const data = {
//                 temperature: getNumeric(toNumberArray(h.temperature_2m)),
//                 humidity: getNumeric(toNumberArray(h.relative_humidity_2m)),
//                 rainfall: getNumeric(toNumberArray(h.precipitation)),
//                 soil_moisture: getNumeric(toNumberArray(h.soil_moisture_9_to_27cm)),
//             };

//             setWeatherData(data);
//         } catch (error: any) {
//             setWeatherError(error.message);
//         } finally {
//             setWeatherLoading(false);
//         }
//     };

//     // Trigger data fetch whenever the location changes
//     useEffect(() => {
//         if (currentLocation) {
//             fetchWeatherData(currentLocation.latitude, currentLocation.longitude);
//         }
//     }, [currentLocation]);

//     const value = { weatherData, weatherLoading, weatherError };

//     return (
//         <WeatherContext.Provider value={value}>
//             {children}
//         </WeatherContext.Provider>
//     );
// };

// export const useWeather = () => {
//     const context = useContext(WeatherContext);
//     if (context === undefined) {
//         throw new Error('useWeather must be used within a WeatherProvider');
//     }
//     return context;
// };



import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from './LocationContext';

interface WeatherData {
    temperature: number | string;
    humidity: number | string;
    rainfall: number | string;
    soil_moisture: number | string;
}

interface WeatherContextType {
    weatherData: WeatherData | null;
    weatherLoading: boolean;
    weatherError: string | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { currentLocation } = useLocation();
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
    const [weatherError, setWeatherError] = useState<string | null>(null);

    const fetchWeatherData = async (latitude: number, longitude: number) => {
        setWeatherLoading(true);
        setWeatherError(null);
        try {
            const hourlyVars = `temperature_2m,relative_humidity_2m,precipitation,uv_index,soil_moisture_9_to_27cm,windspeed_10m`;
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars}&timezone=auto`;
            const res = await fetch(url);
            const json = await res.json();
            if (!res.ok) throw new Error(json.reason || 'Failed to fetch weather data');

            const h = json.hourly;
            const now = new Date();
            const idx = h.time.findIndex((t: string) => Math.abs(new Date(t).getTime() - now.getTime()) < 3600000);

            const toNumberArray = (arr: any[] | undefined): number[] => {
                if (!Array.isArray(arr)) return [];
                return arr.map(v => typeof v === 'number' ? v : Number(v)).filter(v => !isNaN(v));
            };

            const getNumeric = (arr: number[]) => {
                const v = arr[idx];
                return v === undefined || Number.isNaN(v) ? "—" : Math.round((v + Number.EPSILON) * 100) / 100;
            };

            const data: WeatherData = {
                temperature: getNumeric(toNumberArray(h.temperature_2m)),
                humidity: getNumeric(toNumberArray(h.relative_humidity_2m)),
                rainfall: getNumeric(toNumberArray(h.precipitation)),
                soil_moisture: getNumeric(toNumberArray(h.soil_moisture_9_to_27cm)),
            };

            setWeatherData(data);
        } catch (error: any) {
            setWeatherError(error.message || 'Error fetching weather data');
            setWeatherData(null);
        } finally {
            setWeatherLoading(false);
        }
    };

    useEffect(() => {
        if (currentLocation?.latitude && currentLocation?.longitude) {
            fetchWeatherData(currentLocation.latitude, currentLocation.longitude);
        }
    }, [currentLocation]);

    return (
        <WeatherContext.Provider value={{ weatherData, weatherLoading, weatherError }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};
