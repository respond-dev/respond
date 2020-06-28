export type PromiseOutputType<T> = T extends PromiseLike<
  infer U
>
  ? U
  : T

export type PromiseMapType = {
  [prop: string]: Promise<any> | any
}

export type PromiseMapperOutputType<
  T extends PromiseMapType
> = {
  [K in keyof T]: PromiseOutputType<T[K]>
}

export async function promiseMapper<
  T extends PromiseMapType
>(map: T): Promise<PromiseMapperOutputType<T>> {
  const keys = Object.keys(map)
  const out = await Promise.all(Object.values(map))
  const obj: any = {}

  for (const key of keys) {
    const lib = out.shift()
    obj[key] = lib
  }

  return obj
}

export default promiseMapper
