export async function clientCookieConstructor(): Promise<
  void
> {
  await import(
    "../../../node_modules/js-cookie/src/js.cookie"
  )
}

export default clientCookieConstructor
