// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   TrendingUp, 
//   FileText, 
//   Bot, 
//   Cloud, 
//   AlertTriangle,
//   Droplets,
//   Thermometer,
//   Wind,
//   MapPin
// } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useLanguage } from '../contexts/LanguageContext';
// import { useLocation } from '../contexts/LocationContext';

// const Dashboard: React.FC = () => {
//   const { user } = useAuth();
//   const { getTranslation } = useLanguage();
//   const { currentLocation } = useLocation();

//   const quickStats = [
//     {
//       title: 'Last Prediction',
//       value: '26.4 ' + (getTranslation('quintalsPerAcre')),
//       icon: TrendingUp,
//       color: 'bg-green-500',
//       change: '+12%'
//     },
//     {
//       title: 'Weather Status',
//       value: getTranslation('favorable'),
//       icon: Cloud,
//       color: 'bg-blue-500',
//       change: 'Good'
//     },
//     {
//       title: 'Crop Alerts',
//       value: '2 Active',
//       icon: AlertTriangle,
//       color: 'bg-yellow-500',
//       change: 'New'
//     },
//     {
//       title: 'Soil Health',
//       value: getTranslation('excellent'),
//       icon: Droplets,
//       color: 'bg-emerald-500',
//       change: '92%'
//     }
//   ];

//   const weatherData = [
//     { icon: Thermometer, label: getTranslation('temperature'), value: '28°C', color: 'text-orange-600' },
//     { icon: Droplets, label: getTranslation('humidity'), value: '65%', color: 'text-blue-600' },
//     { icon: Wind, label: getTranslation('windSpeed'), value: '12 km/h', color: 'text-gray-600' },
//     { icon: Cloud, label: getTranslation('rainfall'), value: '2.5mm', color: 'text-indigo-600' }
//   ];

//   const quickActions = [
//     {
//       title: getTranslation('predictYield'),
//       description: 'Get AI-powered yield predictions',
//       icon: TrendingUp,
//       color: 'bg-green-500',
//       link: '/crop-prediction'
//     },
//     {
//       title: getTranslation('viewReports'),
//       description: 'Access your farming reports',
//       icon: FileText,
//       color: 'bg-blue-500',
//       link: '/reports'
//     },
//     {
//       title: getTranslation('chatWithAI'),
//       description: 'Get instant farming guidance',
//       icon: Bot,
//       color: 'bg-purple-500',
//       link: '/ai-assistant'
//     }
//   ];

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Welcome Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           👋 {getTranslation('welcome')}, {user?.username || 'Farmer'}!
//         </h1>
//         <p className="text-gray-600">
//           {getTranslation('farmingOverview')}
//         </p>
//       </div>

//       {/* --- Location Display --- */}
//       {currentLocation && (
//         <div className="flex items-center gap-2 mb-4 text-gray-700">
//           <MapPin className="w-5 h-5 text-gray-500" />
//           <p className="font-medium">
//             {getTranslation('yourLocation')}: {currentLocation.displayName}
//           </p>
//         </div>
//       )}

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {quickStats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
//             <div className="flex items-center justify-between mb-4">
//               <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
//                 <stat.icon className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
//                 {stat.change}
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
//             <p className="text-gray-600 text-sm">{stat.title}</p>
//           </div>
//         ))}
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//         {/* Weather Snapshot */}
//         <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//             <Cloud className="w-5 h-5 text-blue-600" />
//             {getTranslation('weatherSnapshot')}
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {weatherData.map((item, index) => (
//               <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
//                 <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
//                 <p className="text-sm text-gray-600 mb-1">{item.label}</p>
//                 <p className="font-semibold text-gray-900">{item.value}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Crop Alerts */}
//         <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//             <AlertTriangle className="w-5 h-5 text-yellow-600" />
//             {getTranslation('cropAlerts')}
//           </h2>
//           <div className="space-y-3">
//             <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
//               <p className="text-sm font-medium text-yellow-800">
//                 ⚠ {getTranslation('pestWarning')}
//               </p>
//               <p className="text-xs text-yellow-600 mt-1">
//                 {getTranslation('pestRiskRice')}
//               </p>
//             </div>
//             <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
//               <p className="text-sm font-medium text-blue-800">
//                 💧 {getTranslation('irrigationReminder')}
//               </p>
//               <p className="text-xs text-blue-600 mt-1">
//                 {getTranslation('irrigationSchedule')}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//         <h2 className="text-xl font-semibold text-gray-900 mb-6">
//           {getTranslation('quickActions')}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {quickActions.map((action, index) => (
//             <Link
//               key={index}
//               to={action.link}
//               className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-green-300 group"
//             >
//               <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                 <action.icon className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
//               <p className="text-gray-600 text-sm">{action.description}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  FileText, 
  Bot, 
  Cloud, 
  AlertTriangle,
  Droplets,
  Thermometer,
  Wind,
  MapPin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';
import LocationSelector from '../components/Location'; // adjust path if needed

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getTranslation } = useLanguage();
  const { currentLocation } = useLocation();

  const quickStats = [
    {
      title: 'Last Prediction',
      value: '26.4 ' + (getTranslation('quintalsPerAcre')),
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+12%'
    },
    {
      title: 'Weather Status',
      value: getTranslation('favorable'),
      icon: Cloud,
      color: 'bg-blue-500',
      change: 'Good'
    },
    {
      title: 'Crop Alerts',
      value: '2 Active',
      icon: AlertTriangle,
      color: 'bg-yellow-500',
      change: 'New'
    },
    {
      title: 'Soil Health',
      value: getTranslation('excellent'),
      icon: Droplets,
      color: 'bg-emerald-500',
      change: '92%'
    }
  ];

  const weatherData = [
    { icon: Thermometer, label: getTranslation('temperature'), value: '28°C', color: 'text-orange-600' },
    { icon: Droplets, label: getTranslation('humidity'), value: '65%', color: 'text-blue-600' },
    { icon: Wind, label: getTranslation('windSpeed'), value: '12 km/h', color: 'text-gray-600' },
    { icon: Cloud, label: getTranslation('rainfall'), value: '2.5mm', color: 'text-indigo-600' }
  ];

  const quickActions = [
    {
      title: getTranslation('predictYield'),
      description: 'Get AI-powered yield predictions',
      icon: TrendingUp,
      color: 'bg-green-500',
      link: '/crop-prediction'
    },
    {
      title: getTranslation('viewReports'),
      description: 'Access your farming reports',
      icon: FileText,
      color: 'bg-blue-500',
      link: '/reports'
    },
    {
      title: getTranslation('chatWithAI'),
      description: 'Get instant farming guidance',
      icon: Bot,
      color: 'bg-purple-500',
      link: '/ai-assistant'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          👋 {getTranslation('welcome')}, {user?.username || 'Farmer'}!
        </h1>
        <p className="text-gray-600">
          {getTranslation('farmingOverview')}
        </p>
      </div>

            
      {/* Location Selector */}
      <div className="mb-8">
        <LocationSelector />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weather Snapshot */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-600" />
            {getTranslation('weatherSnapshot')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weatherData.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                <p className="font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            {getTranslation('cropAlerts')}
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm font-medium text-yellow-800">
                ⚠ {getTranslation('pestWarning')}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                {getTranslation('pestRiskRice')}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-800">
                💧 {getTranslation('irrigationReminder')}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {getTranslation('irrigationSchedule')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Selector */}
      <div className="mb-8">
        <LocationSelector />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {getTranslation('quickActions')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-green-300 group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
