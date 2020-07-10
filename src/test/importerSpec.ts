import expect from "../lib/expect"
import importer from "../lib/importer"

describe("importer", () => {
  it("tests acceptance", async () => {
    const testInitializer = await importer(
      ["/dist-cjs/initializers/testInitializer"],
      { test: true }
    )
    expect(testInitializer.length).toBe(1)
    expect(testInitializer[0][0]).toEqual(
      expect.any(String)
    )
    expect(testInitializer[0][1]).toEqual(true)
  })
})
