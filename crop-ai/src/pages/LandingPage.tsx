import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Sprout, 
  Bug, 
  Leaf, 
  Cloud, 
  FileText, 
  Bot,
  ArrowRight,
  Sunrise,
  Users,
  Award,
  Globe
} from 'lucide-react';
import { User } from '../types/index'; // adjust path as needed
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // adjust path if needed
import { useLocation, useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const { getTranslation } = useLanguage();
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle OAuth token from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');

    if (token) {
      const userData: User = {
        id: email || 'google-user',         // unique identifier
        username: email?.split('@')[0] || 'googleuser', // generate a username
        email: email || '',
        preferredLanguage: 'en',            // default language
        googleId: email || undefined        // optional
      };

      login(token, userData); 
      navigate('/dashboard');
    }
  }, [location, login, navigate]);



  const features = [
    {
      icon: TrendingUp,
      title: 'Crop & Yield Prediction',
      description: 'AI-powered predictions for optimal harvest planning',
      color: 'bg-green-500'
    },
    {
      icon: Sprout,
      title: 'Fertilization Guidance',
      description: 'Smart recommendations for optimal crop nutrition',
      color: 'bg-emerald-500'
    },
    {
      icon: Bug,
      title: 'Pest Control',
      description: 'Early detection and prevention strategies',
      color: 'bg-red-500'
    },
    {
      icon: Leaf,
      title: 'Crop Health Monitoring',
      description: 'Real-time health assessment and diagnostics',
      color: 'bg-green-600'
    },
    {
      icon: Cloud,
      title: 'Weather & Soil Insights',
      description: 'Comprehensive environmental monitoring',
      color: 'bg-blue-500'
    },
    {
      icon: FileText,
      title: 'Reports & Downloads',
      description: 'Detailed analytics and exportable reports',
      color: 'bg-indigo-500'
    },
    {
      icon: Bot,
      title: 'AI Assistant Chatbot',
      description: '24/7 farming support and guidance',
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Farmers' },
    { icon: Leaf, value: '2M+', label: 'Crops Monitored' },
    { icon: Award, value: '98%', label: 'Accuracy Rate' },
    { icon: Globe, value: '15+', label: 'States Covered' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Sunrise className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CropAI</h1>
                <p className="text-green-600 text-sm font-medium">{getTranslation('smartFarmingAI')} 🌾</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                {getTranslation('login')}
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {getTranslation('signUp')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            CropAI – {getTranslation('smartFarmingAI')} 🌾
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionize your farming with AI-powered insights, predictions, and recommendations. 
            Increase your yield, reduce costs, and farm smarter with our comprehensive platform.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {getTranslation('getStarted')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Farming Solutions
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to make data-driven farming decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h3>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers who are already using CropAI to increase their yields and profits.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg"
          >
            {getTranslation('getStarted')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Sunrise className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold">CropAI</h4>
              <p className="text-gray-400 text-sm">Smart Farming with AI</p>
            </div>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2025 CropAI. All rights reserved. Empowering farmers with AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;