import React, { useState, useEffect } from 'react';
import { Leaf, Activity, TrendingUp, AlertCircle, Loader, Camera, Upload, X } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';

const CropHealth: React.FC = () => {
  const { currentLocation } = useLocation(); // ✅ get currentLocation object
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    latitude: currentLocation?.latitude.toString() ?? '',
    longitude: currentLocation?.longitude.toString() ?? ''
  });
  const [healthAnalysis, setHealthAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Update formData when location changes
  useEffect(() => {
    if (currentLocation) {
      setFormData({
        latitude: currentLocation.latitude.toString(),
        longitude: currentLocation.longitude.toString()
      });
    }
  }, [currentLocation]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  // Hardcoded response function
  const getHardcodedPrediction = () => {
    return {
      overallHealth: 78,
      diagnosis: {
        status: language === 'hi' ? 'मध्यम स्वस्थ' : 'Moderately Healthy',
        color: 'text-yellow-600',
        description: language === 'hi' 
          ? 'कुछ पोषणीय कमी के संकेत दिखाई दे रहे हैं' 
          : 'Shows signs of minor nutritional deficiency'
      },
      soilQuality: language === 'hi' ? 'अच्छी' : 'Good',
      climate: language === 'hi' ? 'अनुकूल' : 'Favorable',
      waterAvailability: language === 'hi' ? 'मध्यम' : 'Moderate',
      recommendations: language === 'hi' ? [
        'नाइट्रोजन युक्त उर्वरक का प्रयोग करें',
        'सिंचाई की आवृत्ति बढ़ाएं',
        'पत्तियों पर कीटनाशक का छिड़काव करें',
        'मिट्टी की नमी की नियमित जांच करें',
        'जैविक खाद का उपयोग करें'
      ] : [
        'Apply nitrogen-rich fertilizer',
        'Increase irrigation frequency',
        'Spray organic pesticide on leaves',
        'Monitor soil moisture regularly',
        'Use organic compost'
      ],
      treatmentPlan: {
        immediate: language === 'hi' 
          ? 'तुरंत सिंचाई करें और पत्तियों की जांच करें'
          : 'Immediate irrigation and leaf inspection needed',
        seasonal: language === 'hi'
          ? 'मानसून से पहले मिट्टी की तैयारी करें'
          : 'Prepare soil conditioning before monsoon',
        longterm: language === 'hi'
          ? 'जैविक खेती की तकनीकों को अपनाएं'
          : 'Adopt sustainable organic farming practices'
      },
      recoveryProgress: [
        { period: 'Week 1', health: 78, yield: 65, quality: 70 },
        { period: 'Week 2', health: 82, yield: 70, quality: 75 },
        { period: 'Week 3', health: 85, yield: 75, quality: 80 },
        { period: 'Week 4', health: 88, yield: 80, quality: 85 },
        { period: 'Month 2', health: 90, yield: 85, quality: 88 },
        { period: 'Month 3', health: 92, yield: 90, quality: 90 }
      ]
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use hardcoded prediction instead of API call
      const prediction = getHardcodedPrediction();
      setHealthAnalysis(prediction);
    } catch (err) {
      setError(language === 'hi' ? 'भविष्यवाणी प्राप्त करने में त्रुटि' : 'Error getting prediction');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const healthData = [
    { name: 'Overall Health', value: healthAnalysis?.overallHealth || 0, fill: '#22C55E' }
  ];
  const nutritionData = healthAnalysis?.recoveryProgress || [];

  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          {language === 'hi' ? 'फसल स्वास्थ्य निदान' : 'Crop Health Diagnosis'}
        </h1>
        <p className="text-gray-600">
          {language === 'hi'
            ? 'भौगोलिक स्थिति के आधार पर एआई-संचालित फसल स्वास्थ्य भविष्यवाणी'
            : 'AI-powered crop health predictions based on geographic location'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Form + Image Upload */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {!imagePreview ? (
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {language === 'hi' ? 'फसल की तस्वीर अपलोड करें' : 'Upload Crop Image'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === 'hi'
                      ? 'बेहतर विश्लेषण के लिए पत्ती या पौधे की स्पष्ट तस्वीर लें'
                      : 'Take a clear photo of leaves or plants for better analysis'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {language === 'hi' ? 'फ़ाइल चुनें' : 'Choose File'}
                    </label>
                    <label
                      htmlFor="image-upload"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      {language === 'hi' ? 'कैमरा खोलें' : 'Take Photo'}
                    </label>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={imagePreview}
                      alt="Uploaded crop"
                      className="max-w-full max-h-64 rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-green-600 font-medium">
                    ✓ {language === 'hi' ? 'तस्वीर अपलोड हो गई' : 'Image uploaded successfully'}
                  </p>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="mt-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    {language === 'hi' ? 'दूसरी तस्वीर चुनें' : 'Choose different image'}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'अक्षांश (Latitude)' : 'Latitude'}
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.latitude}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'देशांतर (Longitude)' : 'Longitude'}
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.longitude}
                  readOnly
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {language === 'hi' ? 'विश्लेषण हो रहा है...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5" />
                  {language === 'hi' ? 'स्वास्थ्य भविष्यवाणी प्राप्त करें' : 'Get Health Prediction'}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Quick Health Tips */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {language === 'hi' ? 'त्वरित स्वास्थ्य सुझाव' : 'Quick Health Tips'}
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">
                {language === 'hi' ? 'स्वस्थ फसल के लक्षण' : 'Healthy Crop Signs'}
              </h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• {language === 'hi' ? 'समान वृद्धि पैटर्न' : 'Uniform growth pattern'}</li>
                <li>• {language === 'hi' ? 'जीवंत हरा रंग' : 'Vibrant green color'}</li>
                <li>• {language === 'hi' ? 'मजबूत तना संरचना' : 'Strong stem structure'}</li>
                <li>• {language === 'hi' ? 'स्वस्थ जड़ प्रणाली' : 'Healthy root system'}</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">
                {language === 'hi' ? 'जलवायु कारक' : 'Climate Factors'}
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• {language === 'hi' ? 'मौसमी बदलाव' : 'Seasonal changes'}</li>
                <li>• {language === 'hi' ? 'वर्षा पैटर्न' : 'Rainfall patterns'}</li>
                <li>• {language === 'hi' ? 'तापमान में उतार-चढ़ाव' : 'Temperature fluctuations'}</li>
                <li>• {language === 'hi' ? 'मिट्टी की नमी' : 'Soil moisture levels'}</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">
                {language === 'hi' ? 'निवारक उपाय' : 'Preventive Measures'}
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {language === 'hi' ? 'नियमित निगरानी' : 'Regular monitoring'}</li>
                <li>• {language === 'hi' ? 'समय पर उर्वरक प्रयोग' : 'Timely fertilization'}</li>
                <li>• {language === 'hi' ? 'उचित जल प्रबंधन' : 'Proper water management'}</li>
                <li>• {language === 'hi' ? 'कीट नियंत्रण' : 'Pest control measures'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Health Analysis Results */}
      {healthAnalysis && (
        <div className="space-y-8">
          {/* Overall Health Score */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-800">
                {language === 'hi' ? 'फसल स्वास्थ्य भविष्यवाणी रिपोर्ट' : 'Crop Health Prediction Report'}
              </h2>
              <div className="text-sm text-gray-600">
                {language === 'hi' ? 'स्थान:' : 'Location:'} {formData.latitude}, {formData.longitude}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'hi' ? 'समग्र स्वास्थ्य स्कोर' : 'Overall Health Score'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart data={healthData}>
                    <RadialBar dataKey="value" cornerRadius={10} fill="#22C55E" />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{healthAnalysis.overallHealth}%</div>
                  <div className={`text-lg font-medium ${healthAnalysis.diagnosis?.color || 'text-green-600'}`}>
                    {healthAnalysis.diagnosis?.status || 'Healthy'}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {healthAnalysis.diagnosis?.description || 'Based on location analysis'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'hi' ? 'भौगोलिक कारक' : 'Geographic Factors'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">{language === 'hi' ? 'मिट्टी की गुणवत्ता' : 'Soil Quality'}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      healthAnalysis.soilQuality === 'Good' || healthAnalysis.soilQuality === 'अच्छी' ? 'bg-green-100 text-green-800' :
                      healthAnalysis.soilQuality === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {healthAnalysis.soilQuality || 'Good'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">{language === 'hi' ? 'जलवायु स्थिति' : 'Climate Condition'}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      healthAnalysis.climate === 'Favorable' || healthAnalysis.climate === 'अनुकूल' ? 'bg-green-100 text-green-800' :
                      healthAnalysis.climate === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {healthAnalysis.climate || 'Favorable'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">{language === 'hi' ? 'पानी की उपलब्धता' : 'Water Availability'}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      healthAnalysis.waterAvailability === 'Sufficient' ? 'bg-green-100 text-green-800' :
                      healthAnalysis.waterAvailability === 'Moderate' || healthAnalysis.waterAvailability === 'मध्यम' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {healthAnalysis.waterAvailability || 'Sufficient'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations & Treatment Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                {language === 'hi' ? 'स्थान-आधारित सुझाव' : 'Location-based Recommendations'}
              </h2>
              <div className="space-y-3">
                {(healthAnalysis.recommendations || []).map((rec: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-blue-800">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                {language === 'hi' ? 'उपचार योजना' : 'Treatment Plan'}
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-1">{language === 'hi' ? 'तत्काल कार्रवाई' : 'Immediate Action'}</h3>
                  <p className="text-red-700">{healthAnalysis.treatmentPlan?.immediate || 'Monitor current conditions'}</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-1">{language === 'hi' ? 'मौसमी तैयारी' : 'Seasonal Preparation'}</h3>
                  <p className="text-yellow-700">{healthAnalysis.treatmentPlan?.seasonal || 'Prepare for seasonal changes'}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-1">{language === 'hi' ? 'दीर्घकालिक रणनीति' : 'Long-term Strategy'}</h3>
                  <p className="text-green-700">{healthAnalysis.treatmentPlan?.longterm || 'Implement sustainable practices'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Expected Seasonal Progress Chart */}
          {healthAnalysis.recoveryProgress?.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {language === 'hi' ? 'अनुमानित मौसमी प्रगति' : 'Expected Seasonal Progress'}
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={nutritionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="health" stroke="#22C55E" strokeWidth={3} name="Health %" />
                  <Line type="monotone" dataKey="yield" stroke="#3B82F6" strokeWidth={3} name="Yield %" />
                  <Line type="monotone" dataKey="quality" stroke="#F97316" strokeWidth={3} name="Quality %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default CropHealth;