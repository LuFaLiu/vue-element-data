
export function debounce(func, wait, immediate) {
  let timeout
  return function(...args) {
    const self = this
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(self, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(self, args)
      }, wait)
    }
  }
}

