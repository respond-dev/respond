export function testInitializer({
  test,
}: {
  test: boolean
}): { testResult: boolean } {
  return { testResult: !!test }
}

export default testInitializer
