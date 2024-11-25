import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  // Refresh token endpoint
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/refresh', {
        refreshToken: localStorage.getItem('refreshToken'),
      });

      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        localStorage.setItem('accessToken', response.data.accessToken);
      }
    } catch {
      setIsAuthenticated(false);
      localStorage.clear();
    }
  };

  // Initial token validation
  useEffect(() => {
    const savedAccessToken = localStorage.getItem('accessToken');
    const savedRefreshToken = localStorage.getItem('refreshToken');

    if (savedAccessToken && savedRefreshToken) {
      setAccessToken(savedAccessToken);
      setIsAuthenticated(true);

      // Automatically refresh token before expiry
      const interval = setInterval(refreshAccessToken, 2 * 60 * 1000); // Refresh time
      return () => clearInterval(interval);
    }
  }, []);

  const handleLogin = (tokens) => {
    const { accessToken, refreshToken } = tokens;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    axios.post('http://localhost:5000/logout', { refreshToken: localStorage.getItem('refreshToken') });
    localStorage.clear();
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard token={accessToken} onLogout={handleLogout} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
