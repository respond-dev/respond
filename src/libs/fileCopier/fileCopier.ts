import { readFile, writeFile } from "fs"
import { ensureDir } from "fs-extra"
import { dirname } from "path"

export type ReplacementConditionType = (
  body: string
) => boolean

export interface ReplacementInputType {
  name: string
  upperName: string
  generators: string[]
  modelName: string
  upperModelName: string
  replacements: ReplacementOutputType
  routePath: string
}

export type ReplacementOutputElementType = [
  string | RegExp,
  string | ((substring: string, ...args: any[]) => string),
  ReplacementConditionType?
]

export type ReplacementOutputType = ReplacementOutputElementType[]

export async function fileCopier(
  src: string,
  dest: string,
  replacements?: ReplacementOutputType
): Promise<void> {
  await new Promise<string[]>((resolve, reject) => {
    readFile(src, "utf8", async (err, data) => {
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
            if (typeof replace === "string") {
              data = data.replace(search, replace)
            } else {
              data = data.replace(search, replace)
            }
          }
        }
      }

      await ensureDir(dirname(dest))

      writeFile(dest, data, "utf8", (err) => {
        if (err) {
          reject(err)
        }

        resolve()
      })
    })
  })
}

export default fileCopier
