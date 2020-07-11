export async function importRunner(
  paths: string[],
  arg: unknown
): Promise<[string, any][]> {
  const isBrowser = typeof history !== "undefined"

  if (isBrowser) {
    paths = paths.map((path) =>
      path.replace(/\/dist-cjs\//, "/dist-esm/")
    )
  }

  return (
    await Promise.all(
      paths.map(
        async (path): Promise<[string, any]> => {
          const importPath = isBrowser
            ? path
            : __dirname + "/../.." + path

          const { default: fn } = await import(importPath)

          if (typeof fn === "function") {
            return [path, await fn(arg)]
          }
        }
      )
    )
  ).filter((p) => p && p[1])
}

export default importRunner
