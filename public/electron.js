const path = require('path');
const { app, BrowserWindow } = require('electron');
const cors = require('cors');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const isDev = process.env.NODE_ENV === 'DEV';

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1060,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: isDev,
      enableRemoteModule: true,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  if (isDev) {
    const {
      default: installExtension,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');
    
    win.webContents.once('dom-ready', async () => {
      try {
        await installExtension([REDUX_DEVTOOLS]);
        win.webContents.openDevTools();
      } catch (err) {
        console.error('Failed to install DevTools extensions:', err);
      }
    });
  }
}

async function createServerAndWindow() {
  try {
    const server = express();
    server.use(cors());
    server.use(
      '/anthropic',
      createProxyMiddleware({
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        pathRewrite: {
          '^/anthropic': '',
        },
      })
    );

    server.listen(8001, () => {
      console.log('Proxy server running on http://localhost:8001');
    });

    createWindow();
  } catch (error) {
    console.error('Error starting server or creating window:', error);
  }
}

app.on('ready', () => {
  app.applicationSupportsSecureRestorableState = true;
  createServerAndWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});