import { Tray, Menu, BrowserWindow, app, MenuItem } from 'electron'

export const initTray = (icon: Electron.NativeImage, win: BrowserWindow) => {
  const tray = new Tray(icon)
  tray.on('click', () => {
    win.show()
  })
  const contextMenu = Menu.buildFromTemplate([
    ...(app.isPackaged
      ? []
      : [
          {
            label: '打开调试',
            type: 'normal' as MenuItem['type'],
            click: () => {
              win.webContents.openDevTools()
            },
          },
        ]),
    {
      label: '显示窗口',
      type: 'normal',
      click: () => {
        win.show()
      },
    },
    {
      label: '退出应用',
      type: 'normal',
      click: () => {
        win.destroy()
      },
    },
  ])

  tray.setContextMenu(contextMenu)
  tray.setToolTip('4U Music')
}