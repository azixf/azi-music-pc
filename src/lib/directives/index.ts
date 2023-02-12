import { DirectiveBinding } from "vue";
import { throttle } from "../utils/common";

// 防重复点击
export const vClick = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    const { arg, value } = binding;
    const func = !value || typeof value === "function" ? value : () => {};
    const duration = !arg || isNaN(Number(arg)) ? 2000 : Number(arg);
    watchEffect(destrory => {
      el.addEventListener("click", throttle(func, duration, true));
      destrory(() => {
        el.removeEventListener("click", throttle(func, duration, true));
      });
    });
  },
};

// 图片懒加载
export const vLazyLoad = {
  mounted: (el: HTMLElement, bingding: DirectiveBinding) => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLElement;
          const src = bingding.value || '/default.png';
          img.setAttribute("src", src!);
          observer.unobserve(img);
        }
      });
    });

    observer.observe(el)
  },
};

// 检测点击外侧
export const vClickOutside = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    const func =
      binding.value && typeof binding.value === "function"
        ? binding.value
        : () => {};
    const handleFunc = (event: MouseEvent) => {
      if (!el.contains(event.target as HTMLElement)) {
        func();
      }
    };
    watchEffect(destrory => {
      document.addEventListener("click", handleFunc);
      destrory(() => {
        document.removeEventListener("click", handleFunc);
      });
    });
  },
};
