import { App, Component } from "vue";

export const commonComponent = {
  install: (app: App) => {
    const components = import.meta.glob("./*.vue");
    for (const key in components) {
      components[key]().then((res: any) => {
        const comp = res.default as Component;
        app.component(comp.name!, comp)
      });
    }
  },
};
