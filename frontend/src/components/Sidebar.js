import { Home, Server, Settings, Users, BarChart3 } from 'lucide-react';
import './Sidebar.css';

function Sidebar({ isOpen, darkMode, navigateTo, currentPage, userRole }) {
  const userMenuItems = [
    { id: 'userDashboard', icon: Home, label: 'Dashboard' },
    { id: 'servers', icon: Server, label: 'Servers' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const adminMenuItems = [
    { id: 'adminDashboard', icon: Home, label: 'Dashboard' },
    { id: 'servers', icon: Server, label: 'Servers' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} />
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => navigateTo(item.id)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;