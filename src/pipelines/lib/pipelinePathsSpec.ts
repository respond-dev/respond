import expect from "lib/specs/expect"
import pipelinePaths from "./pipelinePaths"
import { pipelinePhases } from "./pipelinePaths"

describe("pipelinePaths", () => {
  it("reads phase module paths", async () => {
    const paths = await pipelinePaths("respond")

    expect(pipelinePhases.length).toBeGreaterThan(0)

    for (const phase of pipelinePhases) {
      expect(paths[phase].length).toBeGreaterThan(0)
    }
  })
})
