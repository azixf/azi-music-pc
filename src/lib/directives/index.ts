import { App } from "vue";

export const vPreventRepeatClick = {
  install: (app: App) => {
    app.directive('reclick', {
      mounted: (el, { arg, value }) => {
        console.log(value, arg);
        // el.addEventListener('click', (e: MouseEvent) => {
        //   console.log('click');
        //   if (!el._disabled) {
        //     el._disabled = true
        //     setTimeout(() => {
        //       el._disabled = false;
        //     }, 2000)
        //   } else {
        //     e.preventDefault();
        //     e.stopPropagation();
        //   }
        // })
      }
    })
  }
}