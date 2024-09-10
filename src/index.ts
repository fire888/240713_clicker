import { pipelineInit, Root } from "pipelines/pipelineInit"
import { pipelinePlay } from "pipelines/pipelinePlay"
import { pipelinePlayCompleteResult } from './pipelines/pipelinePlayCompleteResult'


window.addEventListener("DOMContentLoaded", async () => {
    const root: Root = await pipelineInit()
    while (true) {
        await pipelinePlay(root)
        await pipelinePlayCompleteResult(root)
    }
})
