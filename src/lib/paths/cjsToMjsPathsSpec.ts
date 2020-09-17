import expect from "lib/specs/expect"
import cjsToMjsPaths from "./cjsToMjsPaths"

describe("cjsToMjsPaths", () => {
  it("converts cjs paths to ejs (mjs)", async () => {
    const paths = { initializers: ["/dist/cjs/test.js"] }
    const clientPaths = cjsToMjsPaths(paths)

    expect(clientPaths).toEqual({
      initializers: ["/dist/esm/test.mjs"],
    })
  })
})
