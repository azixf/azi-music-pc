import { BrowserWindow, ipcMain } from "electron";
let win: BrowserWindow | null = null;
export const initWindow = (wind: BrowserWindow) => {
  win = wind;
};

// 窗口操作相关
ipcMain.on("window-operation", (event, ...args) => {
  const type = args[0];
  if (type === "minify") {
    // 最小化
    win.minimize();
  } else if (type === "toggleMaxize") {
    // 全屏
    if (!win.isFullScreen()) {
      win.setFullScreen(true);
    } else {
      win.setFullScreen(false);
    }
  } else if (type === "close") {
    // 关闭窗口
    win.destroy();
  } else if (type === "hide") {
    win.hide();
  }
});

ipcMain.on("set-on-top", (event, ...args) => {
  const isAlwaysOnTop = args[0];
  win.setAlwaysOnTop(isAlwaysOnTop);
});
