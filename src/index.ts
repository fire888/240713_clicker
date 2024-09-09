import { pipelineInit, Root } from "pipelines/pipelineInit"
import { pipelinePlay } from "pipelines/pipelinePlay"

window.addEventListener("DOMContentLoaded", async () => {
    const root: Root = await pipelineInit()
    await pipelinePlay(root)
})
