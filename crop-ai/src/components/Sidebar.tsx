import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Cloud,
  Sprout,
  Leaf,
  FileText,
  Bot,
  LogOut,
  Languages,
  Sunrise,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

type MenuItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // ✅ fixed type
  label: string;
  path: string;
  color: string;
};

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { getTranslation } = useLanguage();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const menuItems: MenuItem[] = [
    { icon: Home, label: getTranslation('dashboard'), path: '/dashboard', color: 'text-green-600' },
    { icon: Cloud, label: getTranslation('weather'), path: '/weather', color: 'text-blue-600' },
    { icon: Sprout, label: getTranslation('fertilization'), path: '/fertilization', color: 'text-emerald-600' },
    // { icon: Wheat, label: getTranslation('cropPrediction'), path: '/crop-prediction', color: 'text-amber-600' },
    { icon: Leaf, label: getTranslation('cropHealth'), path: '/crop-health', color: 'text-green-500' },
    { icon: FileText, label: getTranslation('reports'), path: '/reports', color: 'text-indigo-600' },
    { icon: Bot, label: getTranslation('aiAssistant'), path: '/ai-assistant', color: 'text-purple-600' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-green-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Sunrise className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">CropAI</h1>
            <p className="text-green-200 text-sm">Smart Farming</p>
          </div>
        </div>
      </div>

      {/* Welcome */}
      <div className="p-4 border-b border-green-700">
        <p className="text-green-200 text-sm">
          👋 {language === 'hi' ? 'नमस्ते' : 'Welcome'}, {user?.username || 'Farmer'}!
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon; // ✅ cast to proper React component
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                 className={({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-green-700 ${
    isActive ? 'bg-green-700 shadow-lg' : ''
  }`
}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Language & Logout */}
      <div className="p-4 border-t border-green-700 space-y-2">
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Languages className="w-5 h-5 text-blue-400" />
          <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-400" />
          <span>{getTranslation('logout')}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
