import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationState {
  latitude: number;
  longitude: number;
  displayName: string;
}

interface LocationContextType {
  currentLocation: LocationState | null;
  setCurrentLocation: (location: LocationState) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<LocationState | null>(null);

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
