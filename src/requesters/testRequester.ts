export class TestRequester {
  accept({ test }: { test: boolean }) {
    return !!test
  }
}

export const testRequester = new TestRequester()
export default testRequester
