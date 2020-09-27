export async function importLoader(
  paths: string[],
  arg: unknown
): Promise<any[]> {
  const isBrowser = typeof history !== "undefined"
  const objects = []

  await Promise.all(
    paths.map(
      async (path): Promise<void> => {
        const importPath = isBrowser
          ? "/dist/esm" + path
          : path

        const { default: fn } = await import(importPath)

        if (typeof fn === "function") {
          const obj = await fn(arg)

          if (typeof obj === "object" && obj !== null) {
            objects.push(obj)
          }
        }
      }
    )
  )

  return objects
}

export default importLoader
