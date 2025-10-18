const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let tray;
let vpnStatus = 'disconnected';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Hide app instead of closing it
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  // Use icon from public folder, or create default
  const iconPath = path.join(__dirname, 'icon.png');
  
  try {
    tray = new Tray(iconPath);
  } catch (error) {
    console.log('Icon not found, using default');
    tray = new Tray(path.join(__dirname, '../node_modules/electron/dist/resources/default_app.asar/assets/file.png'));
  }

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    {
      label: 'Hide',
      click: () => {
        if (mainWindow) {
          mainWindow.hide();
        }
      }
    },
    {
      type: 'separator'
    },
    {
      label: `VPN Status: ${vpnStatus}`,
      enabled: false
    },
    {
      type: 'separator'
    },
    {
      label: 'Quick Connect',
      submenu: [
        {
          label: 'US Server',
          click: async () => {
            if (mainWindow) {
              mainWindow.webContents.send('connect-vpn', { server: 'US-1' });
            }
          }
        },
        {
          label: 'UK Server',
          click: async () => {
            if (mainWindow) {
              mainWindow.webContents.send('connect-vpn', { server: 'UK-1' });
            }
          }
        },
        {
          label: 'EU Server',
          click: async () => {
            if (mainWindow) {
              mainWindow.webContents.send('connect-vpn', { server: 'EU-1' });
            }
          }
        }
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Exit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

  // Click tray icon to show/hide
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });

  // Double click to show
  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

app.on('ready', () => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  // Don't quit the app - keep it running in background
  // This allows VPN to keep running even when window is closed
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Allow quitting via menu
app.on('before-quit', () => {
  app.isQuitting = true;
});

// ============================================
// IPC HANDLERS FOR VPN OPERATIONS
// ============================================

ipcMain.handle('start-vpn', async (event, config) => {
  try {
    console.log('Starting VPN with config:', config);
    
    // TODO: Add real VPN connection logic here
    // Example: call backend API, use node-openvpn, etc.
    
    vpnStatus = 'connected';
    
    // Update tray menu with new status
    if (tray) {
      const contextMenu = Menu.buildFromTemplate([
        {
          label: 'Show',
          click: () => {
            if (mainWindow) {
              mainWindow.show();
              mainWindow.focus();
            }
          }
        },
        {
          label: 'Hide',
          click: () => {
            if (mainWindow) {
              mainWindow.hide();
            }
          }
        },
        {
          type: 'separator'
        },
        {
          label: `VPN Status: ${vpnStatus}`,
          enabled: false
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          click: () => {
            app.isQuitting = true;
            app.quit();
          }
        }
      ]);
      tray.setContextMenu(contextMenu);
    }

    return { 
      success: true, 
      message: 'VPN connected',
      server: config.server 
    };
  } catch (error) {
    console.error('VPN connection error:', error);
    return { 
      success: false, 
      message: error.message 
    };
  }
});

ipcMain.handle('stop-vpn', async () => {
  try {
    console.log('Stopping VPN');
    
    // TODO: Add real VPN disconnection logic here
    
    vpnStatus = 'disconnected';
    
    // Update tray menu with new status
    if (tray) {
      const contextMenu = Menu.buildFromTemplate([
        {
          label: 'Show',
          click: () => {
            if (mainWindow) {
              mainWindow.show();
              mainWindow.focus();
            }
          }
        },
        {
          label: 'Hide',
          click: () => {
            if (mainWindow) {
              mainWindow.hide();
            }
          }
        },
        {
          type: 'separator'
        },
        {
          label: `VPN Status: ${vpnStatus}`,
          enabled: false
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          click: () => {
            app.isQuitting = true;
            app.quit();
          }
        }
      ]);
      tray.setContextMenu(contextMenu);
    }

    return { 
      success: true, 
      message: 'VPN disconnected' 
    };
  } catch (error) {
    console.error('VPN disconnection error:', error);
    return { 
      success: false, 
      message: error.message 
    };
  }
});

ipcMain.handle('get-vpn-status', async () => {
  try {
    // TODO: Add real VPN status check here
    
    return { 
      status: vpnStatus,
      server: vpnStatus === 'connected' ? 'US-1' : null,
      speed: vpnStatus === 'connected' ? '45.3 Mbps' : '0 Mbps',
      ipAddress: vpnStatus === 'connected' ? '203.0.113.45' : 'Not connected',
      encryptedTraffic: vpnStatus === 'connected' ? '1.2 GB' : '0 GB'
    };
  } catch (error) {
    console.error('Status check error:', error);
    return { 
      status: 'error',
      message: error.message 
    };
  }
});

ipcMain.handle('get-servers', async () => {
  try {
    // TODO: Fetch from backend or local database
    
    return {
      success: true,
      servers: [
        { id: 'US-1', country: 'United States', city: 'New York', flag: '🇺🇸', ping: '25ms' },
        { id: 'US-2', country: 'United States', city: 'Los Angeles', flag: '🇺🇸', ping: '45ms' },
        { id: 'UK-1', country: 'United Kingdom', city: 'London', flag: '🇬🇧', ping: '95ms' },
        { id: 'EU-1', country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', ping: '120ms' },
        { id: 'JP-1', country: 'Japan', city: 'Tokyo', flag: '🇯🇵', ping: '180ms' },
        { id: 'AU-1', country: 'Australia', city: 'Sydney', flag: '🇦🇺', ping: '220ms' }
      ]
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message 
    };
  }
});

ipcMain.handle('update-vpn-settings', async (event, settings) => {
  try {
    console.log('Updating VPN settings:', settings);
    
    // TODO: Save settings to file or send to backend
    // Example settings: { protocol: 'UDP', encryptionLevel: 'high', killSwitch: true }
    
    return { 
      success: true, 
      message: 'Settings updated',
      settings: settings 
    };
  } catch (error) {
    console.error('Settings update error:', error);
    return { 
      success: false, 
      message: error.message 
    };
  }
});

ipcMain.handle('get-connection-logs', async () => {
  try {
    // TODO: Fetch from backend or local database
    
    return {
      success: true,
      logs: [
        { timestamp: '2024-10-18 14:30', event: 'Connected to US-1', status: 'success' },
        { timestamp: '2024-10-18 12:15', event: 'Disconnected', status: 'normal' },
        { timestamp: '2024-10-18 10:00', event: 'Connected to UK-1', status: 'success' }
      ]
    };
  } catch (error) {
    return { 
      success: false, 
      message: error.message 
    };
  }
});

ipcMain.handle('minimize-to-tray', async () => {
  if (mainWindow) {
    mainWindow.hide();
  }
  return { success: true };
});

ipcMain.handle('show-window', async () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
  return { success: true };
});

// Background task: Check VPN status every 5 seconds
setInterval(async () => {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send('vpn-status-update', {
      status: vpnStatus,
      timestamp: new Date().toISOString()
    });
  }
}, 5000);