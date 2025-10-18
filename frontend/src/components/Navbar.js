import { Menu, Sun, Moon, LogOut, Shield } from 'lucide-react';
import './Navbar.css';

function Navbar({ darkMode, toggleTheme, toggleSidebar, onLogout, userRole }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div className="logo">
            <Shield size={28} className="logo-icon" />
            <span className="logo-text">
              Fast<span className="logo-gradient">VPN</span>
            </span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="user-role">
            {userRole === 'admin' ? '👑 Admin' : '👤 User'}
          </div>
          <button className="icon-btn" onClick={toggleTheme}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="icon-btn logout-btn" onClick={onLogout}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;