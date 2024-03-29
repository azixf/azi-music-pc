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
 * debounce the function called times
 * @param fn
 * @param delay
 * @param immidiately
 * @returns
 */
export const debounce = (
  fn: (...args: unknown[]) => void,
  delay = 200,
  immidiately = false
) => {
  let timer: NodeJS.Timeout | null = null;
  return function (this: unknown, ...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
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
 * format number to time like mm:ss
 * @param duration
 * @returns
 */
export const formatTime = (duration: number, up?: boolean): string => {
  const minitues = Math.floor(duration / 60);
  const seconds = up ? Math.ceil(duration % 60) : Math.floor(duration % 60);
  return `${minitues}:${(seconds + "").padStart(2, "0")}`;
};

/**
 * formate date time
 * @param dateLike
 * @param format
 * @returns
 */
export const formatDateTime = (
  dateLike: Date | string | number,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string => {
  if (Object.is(new Date(dateLike).toString(), "Invalid Date")) {
    return dateLike as string;
  }

  if (typeof dateLike === "string") {
    dateLike = dateLike.replace("-", "/");
  }
  const date = new Date(dateLike);
  const YYYY = date.getFullYear() + "";
  const MM = (date.getMonth() + 1 + "").padStart(2, "0");
  const DD = (date.getDate() + "").padStart(2, "0");

  const HH = (date.getHours() + "").padStart(2, "0");
  const mm = (date.getMinutes() + "").padStart(2, "0");
  const ss = (date.getSeconds() + "").padStart(2, "0");

  return format
    .replace("YYYY", YYYY)
    .replace("MM", MM)
    .replace("DD", DD)
    .replace("HH", HH)
    .replace("mm", mm)
    .replace("ss", ss);
};

/**
 * 获取元素样式
 * @param el {HTMLElement}
 * @param property {string}
 * @returns
 */
export function getStyle(el: HTMLElement, property: string) {
  const value = window.getComputedStyle(el, null)[property].replace("px", "");
  return isNaN(Number(value)) ? value : Number(value);
}
