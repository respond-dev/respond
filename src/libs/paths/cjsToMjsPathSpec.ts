import expect from "libs/specs/expect"
import cjsToMjsPath from "./cjsToMjsPath"

describe("cjsToMjsPath", () => {
  it("converts cjs path to ejs (mjs)", async () => {
    expect(cjsToMjsPath("/dist/cjs/test.js")).toBe(
      "/dist/esm/test.mjs"
    )
  })
})
