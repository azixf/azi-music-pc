export const throttle = (fn: (...args: unknown[]) => void, delay = 200) => {
  let timer: NodeJS.Timeout | null = null
  return function(this: unknown, ...args: unknown[]){
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer!)
      timer = null
    }, delay)
  }
}