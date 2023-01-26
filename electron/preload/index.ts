console.log("preload loaded ...");

import { contextBridge, ipcRenderer } from "electron";

const ipc = {
  renderer: {
    // 渲染进程发送的消息
    send: ["set-on-top", "window-operation", "check-update", "check-version"],
    // 主进程发送的消息
    receive: [
      "main-process-message",
      "update-message",
      "update-downloaded-progress"
    ],
  },
};

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer,
  ipcRender: {
    send: (channel: string, ...args: any[]) => {
      const invalidaChannels = ipc.renderer.send;
      if (invalidaChannels.includes(channel)) {
        ipcRenderer.send(channel, ...args);
      }
    },
    on: (channel: string, func: (args: any[]) => void) => {
      const invalidChannels = ipc.renderer.receive;
      if (invalidChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(args));
      }
    },
  },
});
