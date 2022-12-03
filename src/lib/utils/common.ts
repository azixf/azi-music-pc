export const throttle = (
  fn: (...args: unknown[]) => void,
  delay = 200,
  immidiately = false
) => {
  let timer: NodeJS.Timeout | null = null;
  return function (this: unknown, ...args: unknown[]) {
    if (timer) return;
    if (immidiately) {
      immidiately = false;
      fn.apply(this, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        clearTimeout(timer!);
        timer = null;
      }, delay);
    }
  };
};
