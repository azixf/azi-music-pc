/**
 * throttle the function called times
 * @param fn 
 * @param delay 
 * @param immidiately 
 * @returns 
 */
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

/**
 * get keys of object data
 * @param obj 
 * @returns 
 */
export function getKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * format time
 * @param duration 
 * @returns 
 */
export const formatTime = (duration: number): string => {
  const minitues = Math.floor(duration / 60);
  const seconds = Math.ceil(duration % 60);
  return `${minitues}:${(seconds + "").padStart(2, "0")}`;
};