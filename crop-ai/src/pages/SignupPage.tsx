// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Sunrise, User, Mail, Lock, Globe } from 'lucide-react';
// import GoogleAuth from '../components/GoogleAuth';
// import { useAuth } from '../contexts/AuthContext';
// import { useLanguage } from '../contexts/LanguageContext';
// import { User as UserType } from '../types';

// const BACKEND_URL = 'http://localhost:8000'; // Replace with your actual backend URL

// const SignupPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     preferredLanguage: 'en' as 'en' | 'hi'
//   });
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const { getTranslation } = useLanguage();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       // 1️⃣ Signup (send only expected fields)
//       const signupResponse = await fetch(`${BACKEND_URL}/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: formData.username,
//           email: formData.email,
//           password: formData.password
//         }),
//       });

//       if (!signupResponse.ok) {
//         const errorData = await signupResponse.json();
//         throw new Error(JSON.stringify(errorData.detail) || 'Signup failed');

//       }

//       // 2️⃣ Login immediately after signup
//       const loginResponse = await fetch(`${BACKEND_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: formData.username,
//           password: formData.password
//         }),
//       });

//       if (!loginResponse.ok) {
//         const errorData = await loginResponse.json();
//         throw new Error(errorData.detail || 'Login failed after signup');
//       }

//       const { access_token, user: backendUser } = await loginResponse.json();

//       // Construct frontend UserType object
//       const user: UserType = {
//         id: backendUser.id,
//         username: backendUser.username,
//         email: backendUser.email,
//         preferredLanguage: formData.preferredLanguage,
//         // name is optional; backend does not return it
//       };

//       login(access_token, user);
//       navigate('/dashboard');

//     } catch (err: any) {
//       console.error('Signup/Login error:', err);
//       setError(err.message || 'Something went wrong');
//     }
//   };

//   const handleGoogleSuccess = (token: string, userData: UserType) => {
//     login(token, userData);
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
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Join CropAI</h1>
//             <p className="text-gray-600">{getTranslation('smartFarmingAI')}</p>
//           </div>

//           {/* Google Login */}
//           <GoogleAuth
//             onSuccess={handleGoogleSuccess}
//             text={getTranslation('continueWithGoogle')}
//           />

//           <div className="relative mb-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">or</span>
//             </div>
//           </div>

//           {/* Error message */}
//           {error && (
//             <div className="mb-4 text-red-600 font-medium text-sm text-center">{error}</div>
//           )}

//           {/* Signup Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <User className="w-4 h-4 inline mr-2" />
//                 Username
//               </label>
//               <input
//                 type="text"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//                 value={formData.username}
//                 onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                 placeholder="Create a unique username"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Mail className="w-4 h-4 inline mr-2" />
//                 {getTranslation('email')} 📧
//               </label>
//               <input
//                 type="email"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 placeholder="Enter your email address"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Lock className="w-4 h-4 inline mr-2" />
//                 {getTranslation('password')} 🔑
//               </label>
//               <input
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 placeholder="Create a strong password"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Globe className="w-4 h-4 inline mr-2" />
//                 {getTranslation('preferredLanguage')} 🌐
//               </label>
//               <select
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//                 value={formData.preferredLanguage}
//                 onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value as 'en' | 'hi' })}
//               >
//                 <option value="en">English</option>
//                 <option value="hi">हिंदी (Hindi)</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
//             >
//               {getTranslation('signUp')}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               {getTranslation('alreadyHaveAccount')}{' '}
//               <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
//                 {getTranslation('login')}
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sunrise, User, Mail, Lock, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { User as UserType } from '../types';

// 🚨 Removed backend dependency

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    preferredLanguage: 'en' as 'en' | 'hi'
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { getTranslation } = useLanguage();
  const navigate = useNavigate();

  // Fake signup handler (no backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // ✅ Basic validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    try {
      // 🔹 Create a fake user object
      const user: UserType = {
        id: Date.now().toString(), // random id
        username: formData.username || formData.email.split('@')[0],
        email: formData.email,
        preferredLanguage: formData.preferredLanguage,
      };

      // 🔹 Fake token for demo
      const fakeToken = 'demo-token-' + Date.now();

      // 🔹 Save into auth context
      login(fakeToken, user);

      // 🔹 Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Demo login error:', err);
      setError('Something went wrong');
    }
  };

  // Fake Google login handler
  const handleGoogleDemo = () => {
    const user: UserType = {
      id: Date.now().toString(),
      username: 'googleUser',
      email: 'demo@gmail.com',
      preferredLanguage: 'en',
    };
    const fakeToken = 'google-demo-token';
    login(fakeToken, user);
    navigate('/dashboard');
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join CropAI</h1>
            <p className="text-gray-600">{getTranslation('smartFarmingAI')}</p>
          </div>

          {/* Google Login (Fake for demo) */}
          <button
            onClick={handleGoogleDemo}
            className="w-full mb-6 bg-white border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center hover:bg-gray-50 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            {getTranslation('continueWithGoogle')}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 text-red-600 font-medium text-sm text-center">{error}</div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Create a unique username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                {getTranslation('email')} 📧
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                {getTranslation('password')} 🔑
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a strong password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                {getTranslation('preferredLanguage')} 🌐
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                value={formData.preferredLanguage}
                onChange={(e) =>
                  setFormData({ ...formData, preferredLanguage: e.target.value as 'en' | 'hi' })
                }
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              {getTranslation('signUp')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {getTranslation('alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                {getTranslation('login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
