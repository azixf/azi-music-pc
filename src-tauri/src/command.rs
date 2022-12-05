use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

//用于启动时 loading加载等待 主窗口加载完成 关闭 loading窗口
#[tauri::command]
pub async fn close_splashscreen(window: tauri::Window) {
    if let Some(splashscreen) = window.get_window("splashscreen") {
        //关闭loading窗口
        splashscreen.close().unwrap();
    }
    //显示主窗口
    window.get_window("main").unwrap().show().unwrap();
}

// 创建托盘
#[tauri::command]
pub fn create_system_tray() -> SystemTray {
    let restart = CustomMenuItem::new("restart", "重启应用");
    let quit = CustomMenuItem::new("quit", "退出");
    let hide_or_show = CustomMenuItem::new("hide", "隐藏/显示");
    let open_devtools = CustomMenuItem::new("devtools", "打开devtools");
    let tray_menu = SystemTrayMenu::new()
        .add_item(open_devtools)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide_or_show)
        .add_item(restart)
        .add_item(quit);
    SystemTray::new().with_menu(tray_menu)
}

// 处理托盘事件
#[tauri::command]
pub fn tray_event(app: &AppHandle, event: SystemTrayEvent) {
    let window = app.get_window("main").unwrap();
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "restart" => {
                window.app_handle().restart();
            }
            "devtools" => {
                if !window.is_devtools_open() {
                    window.open_devtools();
                }
            }
            "quit" => {
                window.app_handle().exit(0);
            }
            "hide" => {
                let visible = window.is_visible().unwrap();
                if visible {
                    window.hide().unwrap();
                } else {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            }
            _ => {}
        },
        SystemTrayEvent::LeftClick { .. } => {
            window.show().unwrap();
            window.unminimize().unwrap();
            window.set_focus().unwrap();
        }
        SystemTrayEvent::RightClick { .. } => {}
        SystemTrayEvent::DoubleClick { .. } => {}
        _ => todo!(),
    }
}
