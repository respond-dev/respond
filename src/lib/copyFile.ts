import { readFile, writeFile } from "fs"

export async function copyFile(
  src: string,
  dest: string,
  replacements?: [string | RegExp, string][]
): Promise<void> {
  await new Promise<string[]>((resolve, reject) => {
    readFile(src, "utf8", (err, data) => {
      if (err) {
        return reject(err)
      }

      if (replacements) {
        for (const [search, replace] of replacements) {
          data = data.replace(search, replace)
        }
      }

      writeFile(dest, data, "utf8", (err) => {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
  })
}

export default copyFile
