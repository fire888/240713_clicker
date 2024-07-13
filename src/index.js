import { Studio } from "./entities/Studio"
import { Ticker } from "./helpers/Ticker"
import { BoxTest } from "./entities/BoxTest"
import { pipelineInit } from "./pipelines/pipelineInit"
import { pipelinePlay } from "./pipelines/pipelinePlay"
import {documentClickOnce} from "./helpers/clickHelpers";

window.addEventListener("DOMContentLoaded", async () => {
    const root = {
        ticker: new Ticker(),
        studio: new Studio(),
        boxTest: new BoxTest(),
    }

    await pipelineInit(root)
    // await documentClickOnce()
    await pipelinePlay(root)
})
