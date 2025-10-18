import { useState } from 'react';
import { Search, MapPin, Zap, Users } from 'lucide-react';
import './Servers.css';

function Servers({ darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');

  const serversList = [
    { country: 'United States', flag: '🇺🇸', city: 'New York', ping: '12ms', load: '45%', users: 145 },
    { country: 'United States', flag: '🇺🇸', city: 'Los Angeles', ping: '15ms', load: '38%', users: 132 },
    { country: 'United States', flag: '🇺🇸', city: 'Chicago', ping: '18ms', load: '52%', users: 98 },
    { country: 'United Kingdom', flag: '🇬🇧', city: 'London', ping: '28ms', load: '32%', users: 156 },
    { country: 'United Kingdom', flag: '🇬🇧', city: 'Manchester', ping: '30ms', load: '28%', users: 87 },
    { country: 'Germany', flag: '🇩🇪', city: 'Frankfurt', ping: '35ms', load: '58%', users: 142 },
    { country: 'Germany', flag: '🇩🇪', city: 'Berlin', ping: '37ms', load: '41%', users: 103 },
    { country: 'France', flag: '🇫🇷', city: 'Paris', ping: '32ms', load: '36%', users: 121 },
    { country: 'Netherlands', flag: '🇳🇱', city: 'Amsterdam', ping: '29ms', load: '44%', users: 134 },
    { country: 'Canada', flag: '🇨🇦', city: 'Toronto', ping: '22ms', load: '39%', users: 89 },
    { country: 'Japan', flag: '🇯🇵', city: 'Tokyo', ping: '89ms', load: '23%', users: 167 },
    { country: 'Singapore', flag: '🇸🇬', city: 'Singapore', ping: '95ms', load: '31%', users: 145 },
    { country: 'Australia', flag: '🇦🇺', city: 'Sydney', ping: '112ms', load: '27%', users: 92 },
    { country: 'Brazil', flag: '🇧🇷', city: 'São Paulo', ping: '76ms', load: '42%', users: 78 },
    { country: 'India', flag: '🇮🇳', city: 'Mumbai', ping: '88ms', load: '48%', users: 156 },
  ];

  const filteredServers = serversList.filter(server =>
    server.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="servers-page">
      <div className="servers-header">
        <h1>Servers</h1>
        <p className="subtitle">Choose from {serversList.length} servers across the globe</p>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search servers by country or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="servers-list">
        {filteredServers.map((server, index) => (
          <div key={index} className="server-card-full">
            <div className="server-card-header">
              <div className="server-location-info">
                <span className="server-flag-large">{server.flag}</span>
                <div>
                  <h3>{server.country}</h3>
                  <p className="server-city">
                    <MapPin size={14} />
                    {server.city}
                  </p>
                </div>
              </div>
              <button className="connect-btn btn-primary">Connect</button>
            </div>
            
            <div className="server-card-stats">
              <div className="server-stat-item">
                <Zap size={16} className="stat-item-icon" />
                <span>{server.ping}</span>
              </div>
              <div className="server-stat-item">
                <Users size={16} className="stat-item-icon" />
                <span>{server.users} users</span>
              </div>
              <div className="server-stat-item">
                <div className="load-bar">
                  <div className="load-fill" style={{ width: server.load }}></div>
                </div>
                <span>Load: {server.load}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServers.length === 0 && (
        <div className="no-results">
          <p>No servers found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}

export default Servers;