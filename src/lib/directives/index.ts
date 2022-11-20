import { App } from "vue";

export const vPreventRepeatClick = {
  install: (app: App) => {
    app.directive("reclick", {
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
      },
    });
  },
};

export const vLazyLoad = {
  mounted: (el: HTMLElement) => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const img = entry.target as HTMLElement;
        const src = img.dataset.src;
        console.log(img, src);
        img.setAttribute("src", src!);
        observer.unobserve(img);
      });
    });

    const imgList = el.getElementsByTagName("img");
    console.log(el, imgList);
    Array.from(imgList).forEach(img => {
      observer.observe(img);
    });
  },
};
