import expect from "../../lib/respond/expect"
import importRunner from "../../lib/respond/importRunner"

describe("importRunner", () => {
  it("tests acceptance", async () => {
    const testInitializer = await importRunner(
      ["/initializers/respond/testInitializer"],
      { test: true }
    )
    expect(testInitializer).toEqual([
      [{ testResult: true }],
      [],
    ])
  })
})
