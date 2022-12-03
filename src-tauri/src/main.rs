#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri_plugin_store::{PluginBuilder, StoreBuilder};

use tauri::{
    generate_handler, AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent,
    SystemTrayMenu, SystemTrayMenuItem,
};

fn main() {
    let settings = StoreBuilder::new(".settings".parse().unwrap())
        .default("foryou".to_string(), "app".into())
        .build();

    tauri::Builder::default()
        .plugin(PluginBuilder::default().stores([settings]).freeze().build())
        .plugin(tauri_plugin_single_instance::init(|app, _argv, _cwd| {
            let window = app.get_window("main").unwrap();
            window.set_focus().unwrap();
            window.show().unwrap();
        }))
        .system_tray(create_system_tray())
        .on_system_tray_event(tray_event)
        .invoke_handler(generate_handler![close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// 创建托盘
fn create_system_tray() -> SystemTray {
    let quit = CustomMenuItem::new("quit", "退出");
    let hide_or_show = CustomMenuItem::new("hide", "隐藏/显示");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide_or_show);
    SystemTray::new().with_menu(tray_menu)
}

// 处理托盘事件
fn tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                std::process::exit(0);
            }
            "hide" => {
                let window = app.get_window("main").unwrap();
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
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
            window.unminimize().unwrap();
            window.set_focus().unwrap();
        }
        SystemTrayEvent::RightClick { .. } => {}
        SystemTrayEvent::DoubleClick { .. } => {}
        _ => todo!(),
    }
}

//用于启动时 loading加载等待 主窗口加载完成 关闭 loading窗口
#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    if let Some(splashscreen) = window.get_window("splashscreen") {
        //关闭loading窗口
        splashscreen.close().unwrap();
    }
    //显示主窗口
    window.get_window("main").unwrap().show().unwrap();
}
