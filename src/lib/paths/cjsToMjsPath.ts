export function cjsToMjsPath(path: string): string {
  return path
    .replace(/\/dist\/cjs\//, "/dist/esm/")
    .replace(/\.js$/, ".mjs")
}

export default cjsToMjsPath
