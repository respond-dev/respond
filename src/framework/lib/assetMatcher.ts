export const assetRegex = /(.+)(\.(css|js|map|mjs|ts|ttf))$/

export const cache: Record<string, RegExpMatchArray> = {}

export function assetMatcher(
  path: string
): RegExpMatchArray {
  if (cache[path]) {
    return cache[path]
  }

  return (cache[path] = path.match(assetRegex))
}

export default assetMatcher
