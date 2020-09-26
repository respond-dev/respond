export type PromiseOutputType<T> = T extends PromiseLike<
  infer U
>
  ? U
  : T

export type PromiseAllMapType = {
  [prop: string]: Promise<any> | any
}

export type PromiseAllOutputType<
  T extends PromiseAllMapType
> = {
  [K in keyof T]: PromiseOutputType<T[K]>
}

export async function promiseAll<
  T extends PromiseAllMapType
>(map: T): Promise<PromiseAllOutputType<T>> {
  const keys = Object.keys(map)
  const values = Object.values(map)
  const out = await Promise.all(values)
  const obj: any = {}

  for (const key of keys) {
    const lib = out.shift()
    obj[key] = lib
  }

  return obj
}

export default promiseAll
