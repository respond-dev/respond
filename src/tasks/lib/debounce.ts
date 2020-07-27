export function debounce(
  func: (...args: any[]) => any,
  wait = 300
): (...args: any[]) => void {
  let timeout: NodeJS.Timeout

  return (...args) => {
    const later = () => {
      timeout = null
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default debounce
