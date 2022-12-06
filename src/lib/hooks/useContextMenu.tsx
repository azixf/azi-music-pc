export const useContextMenu = () => {
  const emitContext = inject("emitContext") as (
    event: Event,
    dataId: Record<string, unknown>
  ) => void;

  const contextmenuComponent = {
    name: "ContextmenuComp",
    setup() {
      return () => {
        return (
          <context-menu name="context-menu">
            <context-menu-submenu label="查看">
              <context-menu-item disabled>图标</context-menu-item>
              <context-menu-item>列表</context-menu-item>
            </context-menu-submenu>
          </context-menu>
        )
      };
    },
  };

  const instance = createApp(contextmenuComponent);
  const vm = instance.mount(document.createElement('div'))

  const openContextmenu = (e: any) => {
    emitContext(e, { name: "context-menu", id: [1, 2, 3] });
  };
  return {
    openContextmenu,
    vm,
    get $el(): HTMLElement {
      return vm.$el; 
    }
  };
};
