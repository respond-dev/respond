import expect from "pipelines/respond/lib/expect"
import importRunner from "pipelines/respond/lib/importRunner"

describe("importRunner", () => {
  it("tests acceptance", async () => {
    const testInitializer = await importRunner(
      ["/pipelines/respond/initializers/testInitializer"],
      { test: true }
    )
    expect(testInitializer).toEqual([
      [{ testResult: true }],
      [],
    ])
  })
})
