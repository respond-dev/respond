export function logger(msg: unknown): void {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(msg))
}

export default logger
