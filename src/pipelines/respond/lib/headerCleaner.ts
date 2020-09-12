export function headerCleaner(
  headers: Record<string, any>
): Record<string, any> {
  const clean = {}

  for (const key of Object.keys(headers)) {
    clean[key.toLowerCase()] = headers[key]
  }

  return clean
}
