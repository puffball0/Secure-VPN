import { Users, Server, Activity, TrendingUp } from 'lucide-react';
import './AdminDashboard.css';

function AdminDashboard({ darkMode }) {
  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: '+12%' },
    { icon: Server, label: 'Active Servers', value: '24', change: '+3' },
    { icon: Activity, label: 'Active Connections', value: '856', change: '+8%' },
    { icon: TrendingUp, label: 'Bandwidth Used', value: '12.4 TB', change: '+15%' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Connected to US Server', time: '2 min ago', status: 'success' },
    { user: 'Jane Smith', action: 'Disconnected', time: '5 min ago', status: 'info' },
    { user: 'Bob Johnson', action: 'Connected to UK Server', time: '8 min ago', status: 'success' },
    { user: 'Alice Brown', action: 'Server Switch', time: '12 min ago', status: 'warning' },
  ];

  const serverStatus = [
    { name: 'US East', location: '🇺🇸 New York', users: 145, status: 'online', load: '45%' },
    { name: 'US West', location: '🇺🇸 Los Angeles', users: 132, status: 'online', load: '38%' },
    { name: 'Europe', location: '🇬🇧 London', users: 98, status: 'online', load: '28%' },
    { name: 'Asia', location: '🇯🇵 Tokyo', users: 87, status: 'online', load: '52%' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">Monitor and manage your VPN infrastructure</p>
      </div>

      <div className="stats-overview">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="admin-stat-card">
              <div className="stat-icon-wrapper">
                <Icon size={24} />
              </div>
              <div className="stat-details">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-change">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-content">
        <div className="server-status-section">
          <h2>Server Status</h2>
          <div className="server-list">
            {serverStatus.map((server, index) => (
              <div key={index} className="server-item">
                <div className="server-info">
                  <div className="server-main">
                    <span className="server-status-dot online"></span>
                    <div>
                      <p className="server-name">{server.name}</p>
                      <p className="server-location">{server.location}</p>
                    </div>
                  </div>
                  <div className="server-metrics">
                    <span className="server-users">{server.users} users</span>
                    <span className="server-load">Load: {server.load}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="activity-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-status ${activity.status}`}></div>
                <div className="activity-details">
                  <p className="activity-user">{activity.user}</p>
                  <p className="activity-action">{activity.action}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;