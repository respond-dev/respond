import {
  promiseMapper,
  PromiseMapType,
  PromiseOutputType,
} from "./promiseMapper"

export type DefaultImporterOutputType<
  T extends PromiseMapType
> = {
  [K in keyof T]: PromiseOutputType<T[K]>["default"]
}

export async function defaultImporter<
  T extends PromiseMapType
>(map: T): Promise<DefaultImporterOutputType<T>> {
  const libs = await promiseMapper(map)
  const obj: any = {}

  for (const key in libs) {
    obj[key] = libs[key]?.default
  }

  return obj
}

export default defaultImporter
