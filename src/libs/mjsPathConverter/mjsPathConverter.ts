export function mjsPathConverter(path: string): string {
  return path
    .replace(/\/dist\/cjs\//, "/dist/esm/")
    .replace(/\.js$/, ".mjs")
}

export default mjsPathConverter
