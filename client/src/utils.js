



export function getThrottleFn (fn, wait) {
  let previous = 0
  return function () {
    const now = Date.now()
    if (now - previous > wait) {
      fn.apply(this, arguments)
      previous = now
    }
  }
}