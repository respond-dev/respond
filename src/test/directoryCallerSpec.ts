import expect from "../lib/expect"
import directoryCaller from "../lib/directoryCaller"

describe("directoryCaller", () => {
  it("tests acceptance", async () => {
    const testInitializer = await directoryCaller(
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
