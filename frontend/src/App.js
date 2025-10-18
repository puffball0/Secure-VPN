import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Servers from './pages/Servers';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('login');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = (role) => {
    setUserRole(role);
    setCurrentPage(role === 'admin' ? 'adminDashboard' : 'userDashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('login');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (!userRole) {
      return <Login onLogin={handleLogin} darkMode={darkMode} />;
    }

    switch (currentPage) {
      case 'userDashboard':
        return <UserDashboard darkMode={darkMode} />;
      case 'adminDashboard':
        return <AdminDashboard darkMode={darkMode} />;
      case 'servers':
        return <Servers darkMode={darkMode} />;
      case 'settings':
        return <Settings darkMode={darkMode} />;
      default:
        return userRole === 'admin' ? <AdminDashboard darkMode={darkMode} /> : <UserDashboard darkMode={darkMode} />;
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {userRole && (
        <>
          <Navbar
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            toggleSidebar={toggleSidebar}
            onLogout={handleLogout}
            userRole={userRole}
          />
          <div className="app-container">
            <Sidebar
              isOpen={sidebarOpen}
              darkMode={darkMode}
              navigateTo={navigateTo}
              currentPage={currentPage}
              userRole={userRole}
            />
            <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
              {renderPage()}
            </main>
          </div>
        </>
      )}
      {!userRole && renderPage()}
    </div>
  );
}

export default App;