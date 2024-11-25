import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(''); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }, {
        withCredentials: true,
      });
      console.log(response.data.message)
      if (response.data.message === 'Login successful') {
        onLogin(response.data.accessToken, response.data.refreshToken); // Pass tokens to onLogin
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'The email or password is incorrect');
      }
    } catch (error) { 
      setError(error.response?.data?.message || 'Server error. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); 

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false); 
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });

      if (response.data.message === 'User registered successfully') {
        alert('Signup successful. Please log in.');
        setIsLogin(true);
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Server error. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" disabled={loading}>{loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="toggle-link" onClick={toggleMode}>
        {isLogin ? (
          <>
            Do not have an account? <span>Sign Up</span>
          </>
        ) : (
          <>
            Already have an account? <span>Login</span>
          </>
        )}
      </p>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
