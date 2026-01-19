// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Sunrise, Lock, User } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useLanguage } from '../contexts/LanguageContext';
// import { User as UserType } from '../types';

// const LoginPage: React.FC = () => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [error, setError] = useState<string | null>(null);
//   const { login } = useAuth();
//   const { getTranslation } = useLanguage();
//   const navigate = useNavigate();

//   const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await fetch(`${BACKEND_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: formData.username,
//           password: formData.password,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Login failed. Please check your username and password.');
//       }

//       const data: { access_token: string; user: UserType } = await response.json();

//       // Save token and user in AuthContext
//       login(data.access_token, data.user);

//       navigate('/dashboard');
//     } catch (err: any) {
//       console.error('Login error:', err);
//       setError(err.message || 'Login failed.');
//     }
//   };

//   // This can be updated when your GoogleAuth component returns token + user
//   const handleGoogleSuccess = (token?: string, userData?: UserType) => {
//     if (token && userData) {
//       login(token, userData);
//     }
//     navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <Sunrise className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">{getTranslation('welcome')} Back</h1>
//             <p className="text-gray-600">{getTranslation('signInToAccount')}</p>
//           </div>

//           {/* Google Login */}
//           <div className="mb-6">
//             <a
//               href={`${BACKEND_URL}/auth/google`}
//               className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-2 rounded-lg hover:bg-gray-50 font-semibold w-full justify-center"
//             >
//               {getTranslation('continueWithGoogle')}
//             </a>
//           </div>

//           {/* OR separator */}
//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">{getTranslation('or')}</span>
//             </div>
//           </div>

//           {/* Login Form */}
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <User className="w-4 h-4 inline mr-2" />
//                 {getTranslation('username')}
//               </label>
//               <input
//                 type="text"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//                 value={formData.username}
//                 onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                 placeholder={getTranslation('enterUsername')}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Lock className="w-4 h-4 inline mr-2" />
//                 {getTranslation('password')}
//               </label>
//               <input
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 placeholder={getTranslation('enterPassword')}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
//             >
//               {getTranslation('login')}
//             </button>
//           </form>

//           {/* Signup link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               {getTranslation('dontHaveAccount')}{' '}
//               <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium">
//                 {getTranslation('signUp')}
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sunrise, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { User as UserType } from '../types';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const { getTranslation } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // ✅ Dummy validation
      if (!formData.username || !formData.password) {
        throw new Error('Please enter both username and password');
      }

      // ✅ Fake user object
      const fakeUser: UserType = {
        id: Date.now().toString(),
        username: formData.username,
        email: `${formData.username}@example.com`,
        preferredLanguage: 'en',
      };

      // ✅ Fake token
      const fakeToken = 'dummy-token-' + Date.now();

      login(fakeToken, fakeUser);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sunrise className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getTranslation('welcome')} Back
            </h1>
            <p className="text-gray-600">{getTranslation('signInToAccount')}</p>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                {getTranslation('username')}
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder={getTranslation('enterUsername')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                {getTranslation('password')}
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={getTranslation('enterPassword')}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              {getTranslation('login')}
            </button>
          </form>

          {/* Signup link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {getTranslation('dontHaveAccount')}{' '}
              <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium">
                {getTranslation('signUp')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
