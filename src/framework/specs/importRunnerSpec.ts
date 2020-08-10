import expect from "../../framework/lib/expect"
import importRunner from "../lib/importRunner"

describe("importRunner", () => {
  it("tests acceptance", async () => {
    const testInitializer = await importRunner(
      ["/dist-cjs/framework/initializers/testInitializer"],
      { test: true }
    )
    expect(testInitializer).toEqual([
      [{ testResult: true }],
      [],
    ])
  })
})
