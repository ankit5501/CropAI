import React, { useState, useEffect } from "react";
import { Sprout } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useWeather } from "../contexts/WeatherContext";
import { useLocation } from "../contexts/LocationContext";

interface FormData {
  cropType: string;
  soilType: string;
  temperature: string;
  humidity: string;
  moisture: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
}

const Fertilization: React.FC = () => {
  const { language } = useLanguage();
  const { weatherData, weatherLoading } = useWeather();
  const { currentLocation } = useLocation();

  const [formData, setFormData] = useState<FormData>({
    cropType: "",
    soilType: "",
    temperature: "",
    humidity: "",
    moisture: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });

  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Autofill weather values
  useEffect(() => {
    if (weatherData) {
      setFormData((prev) => ({
        ...prev,
        temperature: weatherData.temperature.toString(),
        humidity: weatherData.humidity.toString(),
        moisture: (Number(weatherData.soil_moisture || 0) * 100).toString(),
      }));
    }
  }, [weatherData]);

  const cropOptions = [
    { value: "rice", label: language === "hi" ? "धान" : "Rice" },
    { value: "wheat", label: language === "hi" ? "गेहूं" : "Wheat" },
    { value: "corn", label: language === "hi" ? "मक्का" : "Corn" },
    { value: "sugarcane", label: language === "hi" ? "गन्ना" : "Sugarcane" },
    { value: "cotton", label: language === "hi" ? "कपास" : "Cotton" },
    { value: "soybean", label: language === "hi" ? "सोयाबीन" : "Soybean" },
  ];

  const soilOptions = [
    { value: "alluvial", label: language === "hi" ? "जलोढ़ मिट्टी" : "Alluvial" },
    { value: "clayey", label: language === "hi" ? "चिकनी मिट्टी" : "Clayey" },
    { value: "loamy", label: language === "hi" ? "दोमट मिट्टी" : "Loamy" },
    { value: "sandy", label: language === "hi" ? "रेतीली मिट्टी" : "Sandy" },
    { value: "black", label: language === "hi" ? "काली मिट्टी" : "Black" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation(null);

    // Show hardcoded result after a short delay
    setTimeout(() => {
      const hardcodedResult = {
        fertilizerName: "NPK 20-10-15",
        nitrogen: "20%",
        phosphorus: "10%",
        potassium: "15%",
        message: language === "hi" 
          ? "उपयुक्त फसल वृद्धि के लिए ऊपर दिए गए उर्वरक का उपयोग करें।"
          : "Apply the above fertilizer doses for optimal crop growth.",
      };
      setRecommendation(hardcodedResult);
      setLoading(false);
    }, 500); // 0.5s delay to mimic loading
  };

  if (weatherLoading) return <p>{language === "hi" ? "मौसम डेटा लोड हो रहा है..." : "Loading weather data..."}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Sprout className="w-6 h-6 text-green-600" />
        {language === "hi" ? "स्मार्ट उर्वरक सिफारिश" : "Smart Fertilization Recommendations"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Crop Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === "hi" ? "फसल का प्रकार" : "Crop Type"}
            </label>
            <select
              required
              value={formData.cropType}
              onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
            >
              <option value="">{language === "hi" ? "फसल चुनें" : "Select Crop"}</option>
              {cropOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === "hi" ? "मिट्टी का प्रकार" : "Soil Type"}
            </label>
            <select
              required
              value={formData.soilType}
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500"
            >
              <option value="">{language === "hi" ? "मिट्टी चुनें" : "Select Soil Type"}</option>
              {soilOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === "hi" ? "तापमान (°C)" : "Temperature (°C)"}
            </label>
            <input type="number" value={formData.temperature} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
          </div>

          {/* Humidity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === "hi" ? "आर्द्रता (%)" : "Humidity (%)"}
            </label>
            <input type="number" value={formData.humidity} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
          </div>

          {/* Moisture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === "hi" ? "मिट्टी की नमी (%)" : "Soil Moisture (%)"}
            </label>
            <input type="number" value={formData.moisture} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
          </div>

          {/* Nitrogen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">N (%)</label>
            <input type="number" value={formData.nitrogen} onChange={(e) => setFormData({ ...formData, nitrogen: e.target.value })} className="w-full border px-3 py-2 rounded" />
          </div>

          {/* Phosphorus */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">P (%)</label>
            <input type="number" value={formData.phosphorus} onChange={(e) => setFormData({ ...formData, phosphorus: e.target.value })} className="w-full border px-3 py-2 rounded" />
          </div>

          {/* Potassium */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">K (%)</label>
            <input type="number" value={formData.potassium} onChange={(e) => setFormData({ ...formData, potassium: e.target.value })} className="w-full border px-3 py-2 rounded" />
          </div>
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          {loading ? (language === "hi" ? "लोड हो रहा है..." : "Loading...") : language === "hi" ? "उर्वरक सिफारिश प्राप्त करें" : "Get Fertilizer Recommendation"}
        </button>
      </form>

      {recommendation && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">{language === "hi" ? "सिफारिश परिणाम" : "Recommendation Result"}</h2>
          <p className="mb-2"><strong>{language === "hi" ? "उर्वरक नाम" : "Fertilizer Name"}:</strong> {recommendation.fertilizerName}</p>
          <pre className="whitespace-pre-wrap">{JSON.stringify(recommendation, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Fertilization;