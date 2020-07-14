import expect from "../../lib/expect"
import importRunner from "../lib/importRunner"

describe("importRunner", () => {
  it("tests acceptance", async () => {
    const testInitializer = await importRunner(
      ["/dist-cjs/pipeline/initializers/testInitializer"],
      { test: true }
    )
    expect(testInitializer).toEqual([
      [{ testResult: true }],
      [],
    ])
  })
})
