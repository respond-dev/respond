import { join } from "path"
import expect from "lib/specs/expect"
import importRunner from "pipelines/respond/lib/importRunner"

describe("importRunner", () => {
  it("tests acceptance", async () => {
    const testInitializer = await importRunner(
      [
        join(
          __dirname,
          "pipelines/respond/initializers/testInitializer"
        ),
      ],
      { test: true }
    )
    expect(testInitializer).toEqual([
      [{ testResult: true }],
      [],
    ])
  })
})
