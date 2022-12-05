#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{ generate_handler, Manager };
mod command;
mod download;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _argv, _cwd| {
            let window = app.get_window("main").unwrap();
            window.set_focus().unwrap();
            window.show().unwrap();
        }))
        .system_tray(command::create_system_tray())
        .on_system_tray_event(command::tray_event)
        .invoke_handler(generate_handler![
            command::close_splashscreen,
            download::download_file
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
