// import React, { createContext, useContext, useState } from 'react';
// import { Translation } from '../types';

// type Language = 'en' | 'hi';

// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: (key: string) => string;
// }

// const translations: Record<string, Translation> = {
//   welcome: { en: 'Welcome', hi: 'स्वागत' },
//   dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
//   weather: { en: 'Weather & Soil', hi: 'मौसम और मिट्टी' },
//   fertilization: { en: 'Fertilization', hi: 'उर्वरक' },
//   pestControl: { en: 'Yield Prediction', hi: 'उपज की भविष्यवाणी' },
//   cropPrediction: { en: 'Crop Prediction', hi: 'फसल भविष्यवाणी' },
//   cropHealth: { en: 'Crop Health', hi: 'फसल स्वास्थ्य' },
//   reports: { en: 'Reports', hi: 'रिपोर्ट' },
//   aiAssistant: { en: 'AI Assistant', hi: 'एआई सहायक' },
//   logout: { en: 'Logout', hi: 'लॉग आउट' },
//   expectedYield: { en: 'Expected Yield', hi: 'अनुमानित उपज' },
//   quintalsPerAcre: { en: 'Quintals per Acre', hi: 'क्विंटल प्रति एकड़' },
//   smartFarmingAI: { en: 'Smart Farming with AI', hi: 'एआई के साथ स्मार्ट खेती' },
//   getStarted: { en: 'Get Started', hi: 'शुरू करें' },
//   signUp: { en: 'Sign Up', hi: 'साइन अप' },
//   login: { en: 'Login', hi: 'लॉगिन' },
//   name: { en: 'Name', hi: 'नाम' },
//   email: { en: 'Email', hi: 'ईमेल' },
//   password: { en: 'Password', hi: 'पासवर्ड' },
//   preferredLanguage: { en: 'Preferred Language', hi: 'पसंदीदा भाषा' },
//   dontHaveAccount: { en: "Don't have an account?", hi: 'खाता नहीं है?' },
//   alreadyHaveAccount: { en: 'Already have an account?', hi: 'पहले से खाता है?' },
//   continueWithGoogle: { en: 'Continue with Google', hi: 'Google के साथ जारी रखें' }
// };

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (context === undefined) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// };

// export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [language, setLanguage] = useState<Language>('en');

//   const t = (key: string): string => {
//     return translations[key]?.[language] || key;
//   };

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getTranslation: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  welcome: { en: 'Welcome', hi: 'स्वागत' },
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  weather: { en: 'Weather & Soil', hi: 'मौसम और मिट्टी' },
  fertilization: { en: 'Fertilization', hi: 'उर्वरक' },
  pestControl: { en: 'Yield Prediction', hi: 'उपज की भविष्यवाणी' },
  cropPrediction: { en: 'Crop Prediction', hi: 'फसल भविष्यवाणी' },
  cropHealth: { en: 'Crop Health', hi: 'फसल स्वास्थ्य' },
  reports: { en: 'Reports', hi: 'रिपोर्ट' },
  aiAssistant: { en: 'AI Assistant', hi: 'एआई सहायक' },
  logout: { en: 'Logout', hi: 'लॉग आउट' },
  expectedYield: { en: 'Expected Yield', hi: 'अनुमानित उपज' },
  quintalsPerAcre: { en: 'Quintals per Acre', hi: 'क्विंटल प्रति एकड़' },
  smartFarmingAI: { en: 'Smart Farming with AI', hi: 'एआई के साथ स्मार्ट खेती' },
  getStarted: { en: 'Get Started', hi: 'शुरू करें' },
  signUp: { en: 'Sign Up', hi: 'साइन अप' },
  login: { en: 'Login', hi: 'लॉगिन' },
  name: { en: 'Name', hi: 'नाम' },
  email: { en: 'Email', hi: 'ईमेल' },
  password: { en: 'Password', hi: 'पासवर्ड' },
  preferredLanguage: { en: 'Preferred Language', hi: 'पसंदीदा भाषा' },
  dontHaveAccount: { en: "Don't have an account?", hi: 'खाता नहीं है?' },
  alreadyHaveAccount: { en: 'Already have an account?', hi: 'पहले से खाता है?' },
  continueWithGoogle: { en: 'Continue with Google', hi: 'Google के साथ जारी रखें' },
  selectLocation: { en: "Select Location", hi: "स्थान चुनें" },
  enterLocationPlaceholder: { en: "Enter city, state, or area...", hi: "शहर, राज्य या क्षेत्र दर्ज करें..." },
  search: { en: "Search", hi: "खोजें" },
  locationNotFound: { en: "Location not found. Please try a different search.", hi: "स्थान नहीं मिला। कृपया कोई भिन्न खोज करें।" },
  locationFetchError: { en: "Failed to fetch location data. Please try again.", hi: "स्थान डेटा लाने में विफल। कृपया पुन: प्रयास करें।" },
  gettingLocation: { en: "Getting Location...", hi: "स्थान प्राप्त कर रहा है..." },
  useCurrentLocation: { en: "Use Current Location", hi: "वर्तमान स्थान का उपयोग करें" },
  mapView: { en: "Map View", hi: "मानचित्र दृश्य" },
  yourLocation: { en: "Your Location", hi: "आपका स्थान" },
  locationCoordinates: { en: "Location Coordinates", hi: "स्थान निर्देशांक" },
  latitude: { en: "Latitude", hi: "अक्षांश" },
  longitude: { en: "Longitude", hi: "देशांतर" },
  northSouthPosition: { en: "North/South Position", hi: "उत्तर/दक्षिण स्थिति" },
  eastWestPosition: { en: "East/West Position", hi: "पूर्व/पश्चिम स्थिति" },
  geolocationError: { en: "Geolocation error: Please enable location services.", hi: "भू-स्थान त्रुटि: कृपया स्थान सेवाएँ सक्षम करें।" },
  geolocationNotSupported: { en: "Geolocation is not supported by your browser.", hi: "भू-स्थान आपके ब्राउज़र द्वारा समर्थित नहीं है।" }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const getTranslation = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};
