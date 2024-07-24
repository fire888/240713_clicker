import { Studio } from "./entities/Studio"
import { Ticker } from "./helpers/Ticker"
import { BoxTest } from "./entities/BoxTest"
import { pipelineInit } from "./pipelines/pipelineInit"
import { pipelinePlay } from "./pipelines/pipelinePlay"
import {documentClickOnce} from "./helpers/clickHelpers";
import { SystemCircles } from "./systems/SystemCircles"
import { LoaderAssets } from './helpers/Loader'

import { Root } from './types'



window.addEventListener("DOMContentLoaded", async () => {
    const root: Root = {
        assets: {},
        ticker: new Ticker(),
        studio: new Studio(),
        boxTest: new BoxTest(),
        systemCircles: new SystemCircles(),
        loaderAssets: new LoaderAssets(),
    }

    await pipelineInit(root)
    await pipelinePlay(root)
})
