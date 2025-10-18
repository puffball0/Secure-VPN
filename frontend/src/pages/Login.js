import { useState } from 'react';
import { Shield, Mail, Lock, User, Crown } from 'lucide-react';
import './Login.css';

function Login({ onLogin, lightMode }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginType, setLoginType] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple frontend validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignUp && !formData.name) {
      setError('Please enter your name');
      return;
    }

    // Simple mock authentication - just check if email is provided
    if (formData.email && formData.password) {
      // Mock user data
      const userData = {
        name: formData.name || 'User',
        email: formData.email,
        role: loginType
      };

      // Call the onLogin with the user role
      onLogin(loginType);
      
      // Clear form
      setFormData({
        email: '',
        password: '',
        name: ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-large">
            <Shield size={48} className="logo-icon-large" />
            <h1 className="logo-title">
              Fast<span className="logo-gradient">VPN</span>
            </h1>
          </div>
          <p className="login-subtitle">Secure and Private Internet Access</p>
        </div>

        <div className="login-type-toggle">
          <button
            className={`toggle-btn ${loginType === 'user' ? 'active' : ''}`}
            onClick={() => setLoginType('user')}
          >
            <User size={18} />
            User
          </button>
          <button
            className={`toggle-btn ${loginType === 'admin' ? 'active' : ''}`}
            onClick={() => setLoginType('admin')}
          >
            <Crown size={18} />
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          {isSignUp && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary btn-full">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              className="link-btn" 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              type="button"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;