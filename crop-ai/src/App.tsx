// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { LanguageProvider } from './contexts/LanguageContext';
// import { LocationProvider } from './contexts/LocationContext';
// import { useAuth } from './contexts/AuthContext';
// import Sidebar from './components/Sidebar';
// import LandingPage from './pages/LandingPage';
// import SignupPage from './pages/SignupPage';
// import LoginPage from './pages/LoginPage';
// import Dashboard from './pages/Dashboard';
// import WeatherSoil from './pages/WeatherSoil';
// import Fertilization from './pages/Fertilization';
// import CropHealth from './pages/CropHealth';
// import AIAssistant from './pages/AIAssistant';

// // Component to protect routes based on authentication state
// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
// };

// // Component that provides the consistent dashboard layout
// const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <main className="flex-1 overflow-auto">
//         {children}
//       </main>
//     </div>
//   );
// };

// // Main application content and routing logic
// const AppContent: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/login" element={<LoginPage />} />
        
//         <Route path="/dashboard" element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Dashboard />
//             </DashboardLayout>
//           </ProtectedRoute>
//         } />
        
        
//         <Route path="/weather" element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <WeatherSoil />
//             </DashboardLayout>
//           </ProtectedRoute>
//         } />
        
//         <Route path="/fertilization" element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <Fertilization />
//             </DashboardLayout>
//           </ProtectedRoute>
//         } />
        
        
//         <Route path="/crop-health" element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <CropHealth />
//             </DashboardLayout>
//           </ProtectedRoute>
//         } />
        
//         <Route path="/ai-assistant" element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <AIAssistant />
//             </DashboardLayout>
//           </ProtectedRoute>
//         } />

//         {/* Placeholder route for reports */}
//         <Route path="/reports" element={
//           <ProtectedRoute>
//             <DashboardLayout>
//               <div className="p-6">
//                 <h1 className="text-2xl font-bold">Reports & Downloads - Coming Soon!</h1>
//               </div>
//             </DashboardLayout>
//           </ProtectedRoute>
//         } />
//       </Routes>
//     </Router>
//   );
// };

// function App() {
//   return (
//     // The order of providers is important for the context to be available
//     <AuthProvider>
//       <LanguageProvider>
//         <LocationProvider>
//           <AppContent />
//         </LocationProvider>
//       </LanguageProvider>
//     </AuthProvider>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { LocationProvider } from './contexts/LocationContext';
import { WeatherProvider } from './contexts/WeatherContext';

// Components & Pages
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import WeatherSoil from './pages/WeatherSoil';
import Fertilization from './pages/Fertilization';
import CropHealth from './pages/CropHealth';
import AIAssistant from './pages/AIAssistant';

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Dashboard layout wrapper
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

// Main routing component
const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <WeatherSoil />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/fertilization"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Fertilization />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop-health"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CropHealth />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AIAssistant />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Placeholder route for reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Reports & Downloads - Coming Soon!</h1>
                </div>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

// App entry point with all providers
function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <LocationProvider>
          <WeatherProvider>
            <AppContent />
          </WeatherProvider>
        </LocationProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
