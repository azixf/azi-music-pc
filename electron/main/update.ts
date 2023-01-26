import { autoUpdater } from "electron-updater";
import { app, BrowserWindow } from "electron";
import { join } from "path";
import { ipcMain } from "electron";

enum UpdateMessage {
  error = "updateError",
  checking = "updateChecking",
  updateAva = "updateAvailable",
  updateNotAva = "updateNotAvailable",
  updateCanclled = "updateCanclled",
  completed = "updateCompleted"
}

let win: BrowserWindow | null = null;

export function init(window: BrowserWindow) {
  win = window;
}

if (!app.isPackaged) {
  autoUpdater.updateConfigPath = join(__dirname, "dev-app-update.yml");
}

const sendMsgToRender = (msg: string) => {
  win.webContents.send("update-message", msg);
};

// 禁用自动更新
autoUpdater.autoDownload = false;

// 检查更新出错
autoUpdater.on("error", err => {
  sendMsgToRender(`${UpdateMessage.error}:${err}`);
});

// 有可用更新
autoUpdater.on('update-available', () => {
  sendMsgToRender(UpdateMessage.updateAva);
})

// 没有可用更新
autoUpdater.on('update-not-available', () => {
  sendMsgToRender(UpdateMessage.updateNotAva)
})

// 取消更新
autoUpdater.on('update-cancelled', () => {
  sendMsgToRender(UpdateMessage.updateCanclled)
})

// 更新进度
autoUpdater.on('download-progress', (progress) => {
  win.webContents.send('update-downloaded-progress', progress)
})

// 更新完成
autoUpdater.on('update-downloaded', () => {
  sendMsgToRender(UpdateMessage.completed)
})

// 检测更新
ipcMain.on('check-update', () => {
  autoUpdater.checkForUpdates()
})

// 检测版本
ipcMain.handle('check-version', () => {
  return app.getVersion();
})