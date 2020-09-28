export const caches = {}
export const pending = {}

export type PromiseResult<T> = T extends PromiseLike<
  infer U
>
  ? U
  : T

export function clearRemoteCache(): void {
  for (const key in caches) {
    caches[key] = undefined
  }
}

export async function remoteModelRequester<
  T extends (...args: any[]) => any
>(
  path: string,
  ...input: Parameters<T>
): Promise<PromiseResult<ReturnType<T>>> {
  const id = path.match(/[^/]+$/)[0]

  if (typeof history === "undefined") {
    return
  }
  const url = `/remote/${id}.json`
  const body = input.length
    ? JSON.stringify(input)
    : undefined

  const cacheKey = url + (body || "")

  if (pending[cacheKey]) {
    await pending[cacheKey]
  }

  if (caches[cacheKey]) {
    return caches[cacheKey]
  }

  pending[cacheKey] = fetch(url, {
    method: input.length ? "POST" : "GET",
    headers: { "Content-Type": "application/json" },
    body,
  })

  const response = (await pending[cacheKey]).json()
  pending[cacheKey] = undefined

  caches[cacheKey] = response

  return response as PromiseResult<ReturnType<T>>
}

export default remoteModelRequester
