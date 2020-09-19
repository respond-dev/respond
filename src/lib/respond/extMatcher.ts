export function extMatcher(path: string): string {
  const extMatch = path?.match(/\.(\w+)$/)

  if (extMatch) {
    return extMatch[1]
  }
}

export default extMatcher
