import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, Globe, Search, XCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
// This approach is more robust and type-safe than the previous one
const icon = L.icon({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationData {
  searchQuery: string;
  latitude: number;
  longitude: number;
  displayName: string;
}

const LocationSelector: React.FC = () => {
  const { getTranslation } = useLanguage();
  const { currentLocation, setCurrentLocation } = useLocation();

  const [locationData, setLocationData] = useState<LocationData>({
    searchQuery: '',
    latitude: currentLocation?.latitude || 28.6139,
    longitude: currentLocation?.longitude || 77.2090, // Default to Delhi, India
    displayName: currentLocation?.displayName || '',
  });

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'info' } | null>(null);

// useEffect
  useEffect(() => {
    if (currentLocation) {
      setLocationData(prev => ({
        ...prev,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        displayName: currentLocation.displayName,
      }));
    }
  }, [currentLocation]);

  const fetchSuggestions = async (query: string) => {
    if (!query) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query + ' India'
        )}&format=json&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationData({ ...locationData, searchQuery: value });
    setSelectedSuggestion(null);
    fetchSuggestions(value);
  };

  const handleSelectSuggestion = (item: any) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    setCurrentLocation({
      latitude: lat,
      longitude: lon,
      displayName: item.display_name,
    });
    setSuggestions([]);
    setSelectedSuggestion(item);
    setMessage(null);
  };

  const handleSearchClick = async () => {
    if (selectedSuggestion) {
      const lat = parseFloat(selectedSuggestion.lat);
      const lon = parseFloat(selectedSuggestion.lon);
      setCurrentLocation({
        latitude: lat,
        longitude: lon,
        displayName: selectedSuggestion.display_name,
      });
      return;
    }

    if (!locationData.searchQuery) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          locationData.searchQuery + ' India'
        )}&format=json&limit=1`
      );
      const data = await res.json();
      if (data.length === 0) {
        setMessage({ text: getTranslation('locationNotFound'), type: 'error' });
        return;
      }
      const item = data[0];
      const lat = parseFloat(item.lat);
      const lon = parseFloat(item.lon);
      setCurrentLocation({
        latitude: lat,
        longitude: lon,
        displayName: item.display_name,
      });
      setMessage(null);
    } catch (err) {
      console.error('Error fetching location:', err);
      setMessage({ text: getTranslation('locationFetchError'), type: 'error' });
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCurrentLocation({
            latitude: lat,
            longitude: lon,
            displayName: getTranslation('currentLocation'),
          });
          setIsLoading(false);
          setMessage(null);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
          setMessage({ text: getTranslation('geolocationError'), type: 'error' });
        }
      );
    } else {
      setIsLoading(false);
      setMessage({ text: getTranslation('geolocationNotSupported'), type: 'error' });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-green-600" />
        {getTranslation('selectLocation')} 📍
      </h2>

      {/* Search Input with Button */}
      <div className="relative mb-6 flex">
        <input
          type="text"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder={getTranslation('enterLocationPlaceholder')}
          value={locationData.searchQuery}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          {getTranslation('search')}
        </button>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-auto shadow-lg top-full left-0">
            {suggestions.map((item) => (
              <li
                key={item.place_id}
                className="p-2 hover:bg-green-100 cursor-pointer"
                onClick={() => handleSelectSuggestion(item)}
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Message Box for Alerts */}
      {message && (
        <div className={`p-4 mb-4 rounded-lg flex items-center justify-between ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
          <p>{message.text}</p>
          <button onClick={() => setMessage(null)} className="text-gray-500 hover:text-gray-700">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Current Location Button */}
      <div className="mb-6">
        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Navigation className="w-4 h-4" />
          {isLoading
            ? getTranslation('gettingLocation')
            : getTranslation('useCurrentLocation')}
        </button>
      </div>

      {/* Map Display */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          {getTranslation('mapView')} 🗺️
        </h3>
        <div className="h-64 rounded-lg overflow-hidden border border-gray-300">
          <MapContainer
            center={[locationData.latitude, locationData.longitude]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            key={`${locationData.latitude}-${locationData.longitude}`}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[locationData.latitude, locationData.longitude]} icon={icon}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">
                    {getTranslation('yourLocation')}
                  </p>
                  <p className="text-sm text-gray-600">{locationData.displayName}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Coordinates Display */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          {getTranslation('locationCoordinates')} 🧭
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {locationData.latitude.toFixed(6)}°
            </div>
            <div className="text-green-700 font-medium">
              {getTranslation('latitude')}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {getTranslation('northSouthPosition')}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {locationData.longitude.toFixed(6)}°
            </div>
            <div className="text-blue-700 font-medium">
              {getTranslation('longitude')}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {getTranslation('eastWestPosition')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
