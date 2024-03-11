/*
 * @Description:
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2024-03-07 22:56:26
 * @LastEditors: codercao
 * @LastEditTime: 2024-03-11 23:01:19
 */
import { app, shell, BrowserWindow, ipcMain, Tray, Menu, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

// package.json
import pkg from '../../package.json'

import icon from '../../resources/icon.png?asset'

let mainWindow, loginWindow
const winURL = is.dev ? `http://localhost:5173` : `file://${__dirname}/index.html`

const loginURL = is.dev ? `http://localhost:5173/login` : `file://${__dirname}/index.html/login`

const path = require('path')
const ApplicationName = pkg.name
// 托盘对象
let appTray = null
// 是否可以退出
let trayClose = false
// 系统托盘右键菜单
let trayMenuTemplate
// 系统托盘图标
let iconPath
// 图标的上上下文
let contextMenu
// 图标闪烁定时器
let flashTrayTimer
// 单一实例

/**
 * 设置系统托盘
 */
function createTray() {
  // 创建 Tray 对象并设置图标
  appTray = new Tray(icon)
  // 创建菜单并设置到 Tray 对象中
  trayMenuTemplate = [
    {
      label: 'FT金融终端',
      click: function () {
        // 打开外部链接
        shell.openExternal('https://github.com/HongqingCao/electron-vite-vue-ft')
      }
    },
    {
      label: '退出FT',
      click: function () {
        // 退出
        trayClose = true
        app.quit()
      }
    }
  ]

  appTray.setToolTip('FT金融终端')
  // 图标的上上下文
  contextMenu = Menu.buildFromTemplate(trayMenuTemplate)

  // 设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu)
  // 主窗口显示隐藏切换
  appTray.on('click', () => {
    // 清楚图标闪烁定时器
    clearInterval(flashTrayTimer)
    flashTrayTimer = null
    // 还原图标
    appTray.setImage(icon)
    if (loginWindow) {
      loginWindow.isVisible() ? loginWindow.hide() : loginWindow.show()
    }

    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })
}

/**
 * 创建登录窗口
 */
function createLoginWindow() {
  if (loginWindow) {
    return
  }

  loginWindow = new BrowserWindow({
    show: true,
    width: 768,
    height: 480,
    frame: false, // 无边框
    transparent: true, // 透明
    resizable: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  loginWindow.loadURL(loginURL)

  loginWindow.once('ready-to-show', () => {
    loginWindow.show()
  })

  loginWindow.on('closed', () => {
    loginWindow = null
  })

  ipcMain.on('close', () => {
    loginWindow.destroy()
  })
}

function createMainWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  ipcMain.on('closed', () => {
    loginWindow.destroy()
  })

  ipcMain.on('mainWindowclose', () => {
    mainWindow.destroy()
  })
  ipcMain.on('minimize', () => {
    mainWindow.destroy()
  })

  ipcMain.on('mainWindowMaximize', () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('minimize', () => {
    if (loginWindow) {
      loginWindow.minimize()
    }
    if (mainWindow) {
      mainWindow.minimize()
    }
  })

  // 打开主页
  ipcMain.on('openMainWindow', () => {
    if (!mainWindow) {
      createMainWindow()
    }
    loginWindow.destroy()
  })

  ipcMain.on('openLoginWindow', () => {
    if (!loginWindow) {
      createLoginWindow()
    }
    mainWindow.destroy()
    loginWindow.show()
    loginWindow.focus()
  })

  createLoginWindow()
  createTray()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createLoginWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
