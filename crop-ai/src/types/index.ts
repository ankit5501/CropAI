export interface User {
  id?: string;
  username: string;
  email: string;
  preferredLanguage: 'en' | 'hi';
  googleId?: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}


export interface Translation {
  en: string;
  hi: string;
}