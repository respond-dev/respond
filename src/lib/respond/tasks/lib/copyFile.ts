import { readFile, writeFile } from "fs"
import { ReplacementOutputType } from "../types/replacementTypes"

export async function copyFile(
  src: string,
  dest: string,
  replacements?: ReplacementOutputType
): Promise<void> {
  await new Promise<string[]>((resolve, reject) => {
    readFile(src, "utf8", (err, data) => {
      if (err) {
        return reject(err)
      }

      if (replacements) {
        for (const [
          search,
          replace,
          condition,
        ] of replacements) {
          if (!condition || condition(data)) {
            data = data.replace(search, replace)
          }
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
