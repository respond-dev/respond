import expect from "../lib/expect"
import importRunner from "../lib/importRunner"

describe("importRunner", () => {
  it("tests acceptance", async () => {
    const testInitializer = await importRunner(
      ["/dist-cjs/pipeline/initializers/testInitializer"],
      { test: true }
    )
    expect(testInitializer.length).toBe(1)
    expect(testInitializer[0][0]).toEqual(
      expect.any(String)
    )
    expect(testInitializer[0][1]).toEqual(true)
  })
})
