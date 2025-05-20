"use client"

import { useState, useEffect } from 'react';
import LoginView from '../../components/auth/LoginView';
import GetStarted from '../../components/auth/GetStarted';

const Login = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Update screen size state on component mount and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust 1024px to your desired mobile breakpoint
    };

    handleResize(); // Call initially to set the correct state

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {!isMobile && <GetStarted />}
      <LoginView />
    </div>
  );
};

export default Login;
