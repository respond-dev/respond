import expect from "libs/expect/expect"
import { pipelinePhases } from "libs/pipeline/pipeline"
import pipelinePaths from "./pipelinePaths"

describe("pipelinePaths", () => {
  it("reads pipeline module paths by phase", async () => {
    const paths = await pipelinePaths("respond")

    expect(pipelinePhases.length).toBeGreaterThan(0)

    for (const phase of pipelinePhases) {
      expect(paths[phase].length).toBeGreaterThan(0)
    }
  })
})
