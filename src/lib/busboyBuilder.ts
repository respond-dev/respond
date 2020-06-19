import { createWriteStream } from "fs"
import { basename, extname } from "path"
import busboy from "busboy"
import tmp from "tmp-promise"

export interface BusboyBuilderOutput {
  files: Record<string, any>
  params: Record<string, any>
}

export function busboyBuilder(
  headers: Record<string, any>,
  files: Record<string, any>,
  params: Record<string, any>
): [busboy.Busboy, Promise<BusboyBuilderOutput>] {
  const busboyInstance = new busboy({
    headers: headers,
  })

  busboyInstance.on(
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
      const writeStream = createWriteStream(path)

      file.pipe(writeStream)

      file.on("data", () => {})
      file.on("end", () => {
        files[fieldname] = {
          path,
          name: basename(filename),
          encoding,
          mimetype,
        }
      })
    }
  )

  busboyInstance.on(
    "field",
    (fieldname: string, val: any) => {
      params[fieldname] = val
    }
  )

  const finished = new Promise((resolve) => {
    busboyInstance.on("finish", function () {
      resolve({ params, files })
    })
  }) as Promise<BusboyBuilderOutput>

  return [busboyInstance, finished]
}
