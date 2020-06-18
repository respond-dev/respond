import { createWriteStream } from "fs"
import { basename, extname } from "path"
import Busboy from "busboy"
import tmp from "tmp-promise"

export interface BusboyBuilderOutput {
  files: Record<string, any>
  params: Record<string, any>
}

export function busboyBuilder(
  headers: Record<string, any>,
  files: Record<string, any>,
  params: Record<string, any>
): [Busboy, Promise<BusboyBuilderOutput>] {
  const busboy = new Busboy({ headers: headers })

  busboy.on(
    "file",
    async (
      fieldname,
      file,
      filename,
      encoding,
      mimetype
    ) => {
      const ext = extname(filename)
      const { path } = await tmp.file({ postfix: ext })
      const stream = createWriteStream(path)

      file.pipe(stream)

      file.on("data", () => {})
      file.on("end", function () {
        files[fieldname] = {
          path,
          name: basename(filename),
          encoding,
          mimetype,
        }
      })
    }
  )

  busboy.on("field", (fieldname, val) => {
    params[fieldname] = val
  })

  const finished = new Promise((resolve) => {
    busboy.on("finish", function () {
      resolve({ params, files })
    })
  }) as Promise<BusboyBuilderOutput>

  return [busboy, finished]
}
