export function createAttributeFilter(
  ns: string,
  name: string
) {
  return (o: { ns: string; name: string }): boolean =>
    o.ns === ns && toLower(o.name) === toLower(name)
}

export function findWhere(
  arr: any[],
  fn: any | ((arg: any) => any),
  returnIndex: boolean,
  byValue: boolean
): any {
  let i = arr.length

  while (i--) {
    if (byValue ? arr[i] === fn : fn(arr[i])) {
      break
    }
  }

  return returnIndex ? i : arr[i]
}

export function splice(
  arr: any[],
  item: any | ((arg: any) => any),
  add: unknown,
  byValue: boolean
): number {
  const i = arr ? findWhere(arr, item, true, byValue) : -1

  if (~i) {
    add ? arr.splice(i, 0, add) : arr.splice(i, 1)
  }

  return i
}

export function toLower(str: string): string {
  return String(str).toLowerCase()
}
