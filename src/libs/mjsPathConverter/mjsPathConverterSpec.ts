import expect from "libs/expect/expect"
import mjsPathConverter from "./mjsPathConverter"

describe("mjsPathConverter", () => {
  it("converts cjs path to ejs (mjs)", async () => {
    expect(mjsPathConverter("/dist/cjs/test.js")).toBe(
      "/dist/esm/test.mjs"
    )
  })
})
