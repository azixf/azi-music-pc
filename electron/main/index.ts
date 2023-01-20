import { app, BrowserWindow, shell, ipcMain, nativeImage } from "electron";
import { release } from "os";
import { join } from "path";
import { initTray } from "./tray";
import { initWindow } from "./window";

if (release().startsWith("6.1")) app.disableHardwareAcceleration();

if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

export const ROOT_PATH = {
  dist: join(__dirname, "../.."),
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let win: BrowserWindow | null = null;

const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL as string;
const indexHTML = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    icon: join(ROOT_PATH.public, "./logo.png"),
    width: 1080,
    height: 720,
    frame: false,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      spellcheck: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(indexHTML);
  } else {
    win.loadURL(url);
    win.webContents.openDevTools();
  }

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return {
      action: "deny",
    };
  });
}

app.whenReady().then(() => {
  createWindow();
  initWindow(win);
  const icon = nativeImage.createFromPath(join(ROOT_PATH.public, "./logo.png"));
  initTray(icon, win);
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allwindows = BrowserWindow.getAllWindows();
  if (!!allwindows.length) {
    allwindows[0].focus();
  } else {
    createWindow();
  }
});

ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(indexHTML, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
  }
});
