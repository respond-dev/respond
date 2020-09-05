export function functionDebouncer(
  func: (...args: any[]) => any,
  wait = 300
): (...args: any[]) => Promise<void> {
  let timeout: NodeJS.Timeout

  return async (...args) => {
    const later = async () => {
      timeout = null
      await func(...args)
    }

    clearTimeout(timeout)

    return new Promise(
      (resolve) =>
        (timeout = setTimeout(async () => {
          await later()
          resolve()
        }, wait))
    )
  }
}

export default functionDebouncer
