import expect from "./expect"
import directoryLister from "../dist-cjs/lib/directoryLister"

describe("directoryLister", () => {
  it("lists a directory", async () => {
    const { files } = await directoryLister(__dirname)
    expect(files).toContain(__filename)
  })
})
