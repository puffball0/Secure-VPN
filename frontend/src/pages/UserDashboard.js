import { useState } from 'react';
import { Power, Wifi, Shield, Globe, Clock, Zap } from 'lucide-react';
import './UserDashboard.css';

function UserDashboard({ darkMode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState('United States');

  const stats = [
    { icon: Clock, label: 'Session Time', value: isConnected ? '00:15:32' : '00:00:00' },
    { icon: Zap, label: 'Speed', value: isConnected ? '85 Mbps' : '0 Mbps' },
    { icon: Globe, label: 'Data Used', value: isConnected ? '1.2 GB' : '0 GB' },
  ];

  const quickServers = [
    { name: 'United States', flag: '🇺🇸', ping: '12ms', load: '45%' },
    { name: 'United Kingdom', flag: '🇬🇧', ping: '28ms', load: '32%' },
    { name: 'Germany', flag: '🇩🇪', ping: '35ms', load: '58%' },
    { name: 'Japan', flag: '🇯🇵', ping: '89ms', load: '23%' },
  ];

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="subtitle">Secure your internet connection with one click</p>
      </div>

      <div className="dashboard-grid">
        <div className="connection-card">
          <div className="connection-status">
            <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
              {isConnected ? (
                <>
                  <Shield className="status-icon" size={32} />
                  <span>Protected</span>
                </>
              ) : (
                <>
                  <Wifi className="status-icon" size={32} />
                  <span>Not Connected</span>
                </>
              )}
            </div>
          </div>

          <button 
            className={`power-button ${isConnected ? 'active' : ''}`}
            onClick={toggleConnection}
          >
            <div className="power-ring">
              <div className="power-ring-inner">
                <Power size={40} />
              </div>
            </div>
          </button>

          <div className="current-server">
            <Globe size={20} />
            <span>{selectedServer}</span>
          </div>

          {isConnected && (
            <div className="connection-info">
              <p className="ip-address">Your IP: 185.225.14.89</p>
            </div>
          )}
        </div>

        <div className="stats-section">
          <h2>Connection Stats</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-card">
                  <Icon size={24} className="stat-icon" />
                  <div className="stat-content">
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-value">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="quick-servers">
        <h2>Quick Connect</h2>
        <div className="servers-grid">
          {quickServers.map((server, index) => (
            <div 
              key={index} 
              className="server-card"
              onClick={() => setSelectedServer(server.name)}
            >
              <div className="server-header">
                <span className="server-flag">{server.flag}</span>
                <span className="server-name">{server.name}</span>
              </div>
              <div className="server-stats">
                <span className="server-ping">{server.ping}</span>
                <span className="server-load">Load: {server.load}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;