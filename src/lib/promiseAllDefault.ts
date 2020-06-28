import {
  promiseAll,
  PromiseAllMapType,
  PromiseOutputType,
} from "./promiseAll"

export type PromiseAllDefaultOutputType<
  T extends PromiseAllMapType
> = {
  [K in keyof T]: PromiseOutputType<T[K]>["default"]
}

export async function promiseAllDefault<
  T extends PromiseAllMapType
>(map: T): Promise<PromiseAllDefaultOutputType<T>> {
  const libs = await promiseAll(map)
  const obj: any = {}

  for (const key in libs) {
    obj[key] = libs[key]?.default
  }

  return obj
}

export default promiseAllDefault
