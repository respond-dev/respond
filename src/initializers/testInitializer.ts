export class TestInitializer {
  accept({ test }: { test: boolean }): boolean {
    return !!test
  }
}

export const testInitializer = new TestInitializer()
export default testInitializer
