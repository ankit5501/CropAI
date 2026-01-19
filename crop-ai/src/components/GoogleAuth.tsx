import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';

interface GoogleAuthProps {
  onSuccess: (token: string, user: User) => void;
  text: string;
}


declare global {
  interface Window {
    google: any;
  }
}

// Local env object for development
const env = {
  VITE_API_BASE_URL: 'http://localhost:8000',
  VITE_GOOGLE_CLIENT_ID: '1002582734668-b0pkrghq2i45damhmmtnhu58c5qn58ks.apps.googleusercontent.com',
};


const GoogleAuth: React.FC<GoogleAuthProps> = ({ onSuccess, text }) => {
  const { login } = useAuth();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Identity Services button
    if (window.google && buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'continue_with',
      });
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      // Send id_token to backend POST endpoint
      const apiResponse = await fetch(`${env.VITE_API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to authenticate with backend.');
      }

      const data: { token: string; user: User } = await apiResponse.json();

      // Save token and user in AuthContext
      login(data.token, data.user);
      onSuccess(data.token, data.user);


    } catch (error) {
      console.error('Google OAuth failed:', error);
    }
  };

  return (
    <div className="w-full">
      <div ref={buttonRef} id="google-signin-button" className="w-full"></div>
      <div className="mt-2 w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
        <span className="text-gray-700 font-medium">{text}</span>
      </div>
    </div>
  );
};

export default GoogleAuth;



// import React, { useEffect, useRef } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { User } from '../types';

// declare global {
//   interface Window {
//     google: any;
//   }
// }

// const GoogleAuth: React.FC<{ text: string }> = ({ text }) => {
//   const { login } = useAuth();
//   const buttonRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (window.google && buttonRef.current) {
//       window.google.accounts.id.initialize({
//         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(buttonRef.current, {
//         theme: 'outline',
//         size: 'large',
//         width: '100%',
//         text: 'continue_with',
//       });
//     }
//   }, []);

//   const handleCredentialResponse = async (response: any) => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token: response.credential }),
//       });

//       if (!res.ok) throw new Error('Backend authentication failed');

//       const data: { token: string; user: User } = await res.json();
//       login(data.token, data.user);

//     } catch (err) {
//       console.error('Google login failed:', err);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div ref={buttonRef} id="google-signin-button" className="w-full"></div>
//       <div className="mt-2 w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer">
//         <span className="text-gray-700 font-medium">{text}</span>
//       </div>
//     </div>
//   );
// };

// export default GoogleAuth;
