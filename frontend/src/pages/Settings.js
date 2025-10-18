import { useState } from 'react';
import { Shield, Bell, Globe, Lock, Zap, Eye } from 'lucide-react';
import './Settings.css';

function Settings({ darkMode }) {
  const [settings, setSettings] = useState({
    autoConnect: true,
    killSwitch: true,
    notifications: false,
    startOnBoot: false,
    ipv6: false,
    dns: 'auto',
    protocol: 'wireguard',
  });

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const handleSelectChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="subtitle">Customize your VPN experience</p>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <div className="section-header">
            <Shield size={24} className="section-icon" />
            <h2>Connection</h2>
          </div>
          
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Auto Connect</p>
                <p className="setting-description">Automatically connect to VPN on startup</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.autoConnect}
                  onChange={() => handleToggle('autoConnect')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Kill Switch</p>
                <p className="setting-description">Block internet if VPN disconnects</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.killSwitch}
                  onChange={() => handleToggle('killSwitch')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Start on Boot</p>
                <p className="setting-description">Launch VPN when system starts</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.startOnBoot}
                  onChange={() => handleToggle('startOnBoot')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Zap size={24} className="section-icon" />
            <h2>Protocol</h2>
          </div>
          
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">VPN Protocol</p>
                <p className="setting-description">Choose your preferred protocol</p>
              </div>
              <select
                className="setting-select"
                value={settings.protocol}
                onChange={(e) => handleSelectChange('protocol', e.target.value)}
              >
                <option value="wireguard">WireGuard</option>
                <option value="openvpn">OpenVPN</option>
                <option value="ikev2">IKEv2</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Globe size={24} className="section-icon" />
            <h2>Network</h2>
          </div>
          
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">DNS Server</p>
                <p className="setting-description">Select DNS provider</p>
              </div>
              <select
                className="setting-select"
                value={settings.dns}
                onChange={(e) => handleSelectChange('dns', e.target.value)}
              >
                <option value="auto">Automatic</option>
                <option value="cloudflare">Cloudflare</option>
                <option value="google">Google</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">IPv6</p>
                <p className="setting-description">Enable IPv6 support</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.ipv6}
                  onChange={() => handleToggle('ipv6')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Bell size={24} className="section-icon" />
            <h2>Notifications</h2>
          </div>
          
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <p className="setting-label">Push Notifications</p>
                <p className="setting-description">Receive connection alerts</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleToggle('notifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-primary">Save Changes</button>
        <button className="btn-secondary">Reset to Default</button>
      </div>
    </div>
  );
}

export default Settings;